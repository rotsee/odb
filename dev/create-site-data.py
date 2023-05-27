#!/usr/bin/env python3
"""
Script för att skapa sajtdata.
Förberett för att köras från AWS lambda.
"""
import os
import re
import pandas as pd
import requests
from bs4 import BeautifulSoup
from argparse import ArgumentParser, FileType
from googleapiclient.discovery import build
from sfs import fetch_and_read_sfs, get_prop_url
import logging
from dotenv import load_dotenv
load_dotenv()


def main(df, sfs_dir=None):
    """
    Main entry point for the actual work done

    df: pd.DataFrame
    """
    # Hämta metadata från https://rkrattsbaser.gov.se/sfsr?fritext=2009%3A400&upph=true&post_id=1
    url = "https://rkrattsbaser.gov.se/sfsr?fritext=2009%3A400&upph=true&post_id=1"
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    hits = soup.find_all("div", {"class": "result-inner-sub-box-container"})
    res = {}
    for hit in hits:
        # hit representerar en SFS
        id_ = hit.find(
            "div",
            {"class": "result-inner-sub-box-header"}
        ).text.split(", ")[1]
        assert id_.startswith("SFS ")
        id_ = id_.replace("SFS ", "")
        if id_ not in df["sfs"].values:
            logging.debug(id_ + " not in df")
            continue
        sdate = None
        sdate_span = hit.find("span", string="Ikraft:")
        if sdate_span:
            sdate = sdate_span.next_sibling.text
        pre_span = hit.find("span", string="Förarbeten:")
        pre = None
        if pre_span:
            pre = pre_span.next_sibling.text
        pre = pre.strip() if pre else ""
        pre_list = re.split(r", | och ", pre)
        res[id_] = {
            'sfs': id_.strip(),
            'sdate': sdate.strip() if sdate else "9",
            'pre': pre,
            'pre_list': pre_list,
            'prop': [
                x.lower().replace("prop. ", "") for x in pre_list
                if x.lower().startswith("prop. ")
            ],
        }

    df["sdate"] = df["sfs"].apply(lambda x: res[x]["sdate"])
    df["pre"] = df["sfs"].apply(lambda x: res[x]["pre"])
    df["prop"] = df["sfs"].apply(lambda x: res[x]["prop"])

    # Kategorisera som EU / ej EU
    df["eu"] = df["pre"].str.contains("EU") | df["pre"].str.contains("EG")

    # Hämta länk till alla proppar
    # FIXME: gör per sfs, inte per ändring
    df["prop_link"] = df["prop"].apply(lambda l: [get_prop_url(x) for x in l])

    # Hämta PDF:er
    sfss = df.sfs.unique()
    meta = {}
    for s in sfss:
        meta[s] = fetch_and_read_sfs(s, sfs_dir)
    df["text_length"] = df["sfs"].apply(lambda x: meta[x]["characters"])
    df["pages"] = df["sfs"].apply(lambda x: meta[x]["pages"])
    df["sfs_url"] = df["sfs"].apply(lambda x: meta[x]["url"])
    df.to_json("data.json", orient="records")
    df.to_csv("data.csv")


def fetch_google_sheets(sheet):
    key = os.environ.get("GOOGLE_SHEETS_KEY")
    with build("sheets", 'v4', developerKey=key) as service:
        sheets = service.spreadsheets()
        result = sheets.values().get(
            spreadsheetId=sheet,
            range="data!A:G"
        ).execute()
        rows = result.get("values")
        headers = rows.pop(0)
        data = [{headers[i]: x for i, x in enumerate(r)} for r in rows]

        assert len(data) == len(rows)
        return pd.DataFrame(data)


def handler(config, context):
    """Entry point for AWS Lambda function.
    """
    df = fetch_google_sheets(config.sheet)
    # TODO: Lagra på S3(?)
    return main(df, None)


def cli(args):
    """Entry point from command line."""
    df = None
    if args.input:
        df = pd.read_csv(args.input)
        args.input.close()
    else:
        df = fetch_google_sheets(args.sheet)
    result = main(df, args.dir)
    print(result)


if __name__ == "__main__":
    parser = ArgumentParser(description="Collect SFS from the internet")
    parser.add_argument(
        "-d", "--dir",
        help="""
A directory for storing downloaded pdf's between sessions.
Significantly reduces runtime on second run.
    """
    )
    input_group = parser.add_mutually_exclusive_group(required=True)
    input_group.add_argument(
        "-s", "--sheet",
        help="A Google sheets id to fetch data from",
    )
    input_group.add_argument(
        "-i", "--input",
        type=FileType("r"),
        help="A local csv file to fetch data from",
    )
    parser.add_argument(
        "-l", "--loglevel",
        type=int,
        choices=[10, 20, 30, 40, 50],
        help="Numerical log level ",
    )
    args = parser.parse_args()
    if args.loglevel:
        logging.basicConfig(level=args.loglevel)
    cli(args)
