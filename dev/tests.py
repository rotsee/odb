from .sfs import make_sfs_url, fetch_and_read_sfs, get_prop_url


assert get_prop_url("2022/23:45") == "http://data.riksdagen.se/fil/587051EC-B45E-41F1-9AFF-B3DC3322F4AB"

_ = fetch_and_read_sfs("2020:908")
assert _["pages"] == 2
assert "svensk författningssamling" in _["text"]

assert make_sfs_url("2009:550") == "http://rkrattsdb.gov.se/SFSdoc/09/090550.PDF"
assert make_sfs_url("2020:908") == "https://svenskforfattningssamling.se/sites/default/files/sfs/2020-11/SFS2020-908.pdf"
