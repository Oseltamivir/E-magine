# Topic Detection
Basic topic detection mechanism for plaintext. The only detectable topics are Mathematics, Chemistry, and Biology (Physics was added, but AWS erased it)
By default, the output is written to `/tmp/SCSE/output.tar.gz`, containing a single json file, `predictions.jsonl`. The output can be pretty-printed by running `extractinfo.sh`
## Dependencies
Python 3.8 (!) is needed for this to work. Most package managers will only provide older versions of python.
`extractinfo.sh` requires `jq`.
Also, run `pip3.8 install -r requirements.txt` if necessary.
### Example
```
~# cat chemtext.txt
Thiamethoxam contains a guanidine-like of three atoms joined to a central carbon atom.
~# cd E-magine/topicinfo
~/E-magine/topicinfo# python3.8 sentiment.py ~/chemtext.txt
created buckets 556fdf05-3d83-475f-a5c8-899f0250b618 and 9d5a2e8c-fc99-43fb-98a4-6fc53b8c090f
starting job 8acd774e-cffb-405c-a0e0-5a217e251c2b
wrote output to /tmp/SCSE/output.tar.gz
~/E-magine/topicinfo# ./extractinfo.sh
{
  "File": "chemtext.txt",
  "Line": "0",
  "Classes": [
    {
      "Name": "Chemistry",
      "Score": 0.4429
    },
    {
      "Name": "Mathematics",
      "Score": 0.2321
    },
    {
      "Name": "Biology",
      "Score": 0.228
    }
  ]
}
```
## Bugs
The python script will crash with absolute certainty iff
1. Windows is involved
2. The dependencies above were ignored
3. ~/.aws/credentials is not valid/present
4. Any credentials other than mine (152334H) are used, because the variables CLASSIFIER and role_ARN are hardcoded

