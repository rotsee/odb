import requests
from bs4 import BeautifulSoup
from utils import download_f
import pypdf
import os
from os.path import exists as file_exists
import logging
import tempfile


def make_sfs_url(sfs):
    """
        gamla stilen: 2009:550 => http://rkrattsdb.gov.se/SFSdoc/09/090550.PDF
        nya stiler: https://svenskforfattningssamling.se/sites/default/files/sfs/2022-04/SFS2022-251.pdf
    """
    _ = sfs.split(":")
    fn = None
    if _[0] <= "2012":
        fn = "http://rkrattsdb.gov.se/SFSdoc/"
        fn += _[0][2:]  # årtal
        fn += "/"
        fn += _[0][2:]  # årtal
        fn += _[1].zfill(4)
        fn += ".PDF"
    else:
        landing = f"https://svenskforfattningssamling.se/doc/{sfs.replace(':', '')}.html"
        r = requests.get(landing)
        soup = BeautifulSoup(r.text, "html.parser")        
        url = soup.find("li", {"class": "field--item"}).find("a")
        fn = url["href"].replace("../", "https://svenskforfattningssamling.se/")
    return fn


def parse_f(local_fn):
    char_count = 0
    text = ""
    with open(local_fn, "rb") as pdf_file:
        pdf_reader = pypdf.PdfReader(pdf_file)
        num_pages = 0
        for page in pdf_reader.pages:
            num_pages += 1
            _ = page.extract_text().lower().replace("\n", "").replace("-", "")
            char_count += len(_)
            text += _
    return {
        'characters': char_count,
        'pages': num_pages,
        'text': text,
    }


def fetch_and_read_sfs(sfs, tmp_dir):
    """ Hämtar dokument och läser in pdf:er """
    url = make_sfs_url(sfs)
    fn = url.split("/")[-1]
    if tmp_dir:
        local_fn = os.path.join(tmp_dir, fn)
        if not file_exists(local_fn):
            logging.info("Downloading " + fn)
            download_f(url, local_fn)
        data = parse_f(local_fn)
    else:
        with tempfile.TemporaryDirectory() as tmp_dir:
            local_fn = os.path.join(tmp_dir, fn)
            logging.info("Downloading " + fn)
            download_f(url, local_fn)
            data = parse_f(local_fn)
    data["url"] = url
    return data


def get_prop_url(prop):
    [rm, nr] = prop.split(":")
    url = f"https://data.riksdagen.se/dokumentlista/?sok=&doktyp=prop&rm={rm.replace('/', '%2F')}&nr={nr}&utformat=json"
    logging.info("Fetching " + url)
    r = requests.get(url)
    data = r.json()
    # assert len(data["dokumentlista"]["dokument"]) == 1
    # Det finns några enstaka exempel på propositioner i två delar.
    # Vi lämnar dem därhän; del ett är alltid huvudinnehållet
    assert len(data["dokumentlista"]["dokument"][0]["filbilaga"]["fil"]) == 1
    return data["dokumentlista"]["dokument"][0]["filbilaga"]["fil"][0]["url"]
