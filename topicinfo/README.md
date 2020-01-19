# Topic Detection
Basic topic detection mechanism for plaintext. The only detectable topics are Mathematics, Chemistry, and Biology (Physics was added, but AWS erased it)

**For basic usage**, just run `./extractinfo.sh ~/path/to/textfile.txt`, and a colon-separated response file will be written to /tmp/SCSE/resp.txt.

For more complex usage, try modifying `extractinfo.sh` for your purposes.
## Dependencies
Python 3.8 (!) is needed for this to work. Most package managers will only provide older versions of python.
`extractinfo.sh` requires `jq`.
Also, run `pip3.8 install -r requirements.txt` if necessary.
### Example
```
~# cat chemtext.txt
Thiamethoxam contains a guanidine-like of three atoms joined to a central carbon atom.
~# cd E-magine/topicinfo
~/E-magine/topicinfo# ./extractinfo.sh ~/chemtext.txt
getting temp authorization... written to ~/.aws/credentials
checking python version... /usr/local/bin/python3.8
checking other dependencies... /usr/bin/jq
created buckets 556fdf05-3d83-475f-a5c8-899f0250b618 and 9d5a2e8c-fc99-43fb-98a4-6fc53b8c090f
starting job 8acd774e-cffb-405c-a0e0-5a217e251c2b
job succeeded!
wrote output to /tmp/SCSE/resp.txt
~/E-magine/topicinfo# cat /tmp/SCSE/resp.txt
"chemtext.txt: Chemistry"
~/E-magine/topicinfo# tar Ozxf /tmp/SCSE/output.tar.gz  #run this if you want more info
{ "File": "chemtext.txt", "Line": "0", "Classes": [ { "Name": "Chemistry", "Score": 0.4429 }, { "Name": "Mathematics", "Score": 0.2321 }, { "Name": "Biology", "Score": 0.228 } ] }
```
## Bugs
The scripts will crash with absolute certainty iff
1. Windows is involved
2. The dependencies above were ignored

## How these scripts work
extracttext.sh does 4 things:
1. handle sanity checks for dependencies
2. extract a temporary authorization key-pair from an API url
3. call `python sentiment.py` on all the input file arguments
4. parses the output and writes it to /tmp/SCSE/resp.txt

sentiment.py handles the AWS magic, gluing together a request to process all its input files with AWS Comprehend's custom classification API. On the backend, there exists a custom NLP model pretrained on Wikipedia pages relevant to PCMB.
