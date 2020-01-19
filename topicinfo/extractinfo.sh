#!/bin/bash
errpt(){ echo -en '\033[1;31m';echo -n "$1";echo -e '\033[0;0m'; }
success(){ echo -en '\033[1;32m';echo -n "$1";echo -e '\033[0;0m'; }
assert(){
    local code="$?"
    echo -n "$1 "
    if [ "$code" -ne 0 ]
    then    errpt "$2"
            exit 1
    fi
    success "$3"
}
findpy(){
    py="$(which python3.8)"
    if [ -z "$py" ]
    then
        py="$(which python3)"
        if [ -z "$py" ] || ! grep '3.8' <("$py" --version 2>&1)
        then
            py="$(which python)"
            if [ -z "$py" ] || ! grep '3.8' <("$py" --version 2>&1)
            then    return 1
            fi
        fi
    fi
    echo "$py"
}
if [ $# -lt 1 ]
then
    cat<<EOF
$0 - detect the topics of text from FILE[S]
$0 FILE [FILE...]
API response will be written to /tmp/SCSE/resp.txt
EOF
    exit 0
fi
curl -s https://cs9h6xl157.execute-api.us-east-1.amazonaws.com/session > ~/.aws/credentials
assert 'getting temp authorization...' 'unknown API error' 'written to ~/.aws/credentials'
py="$(findpy)"
assert 'checking python version...' 'cannot find python>=3.8' "$py"
"$py" -m pip show boto3 > /dev/null
assert 'checking pip...' 'module "boto3" not found.' 'boto3 installed'
assert 'checking other dependencies...' '`jq` not found. Try apt installing it.' "$(which jq)"
"$py" sentiment.py "$@"
if [ -f /tmp/SCSE/resp.txt ]
then
    echo 'WARNING: "/tmp/SCSE/resp.txt" already exists! deleting'
    rm /tmp/SCSE/resp.txt
fi
tar -Ozxf /tmp/SCSE/output.tar.gz | while read -r
do  jq '(.File+": "+(.Classes|max_by(.Score).Name))' <<< "$REPLY" >> /tmp/SCSE/resp.txt
done
echo 'wrote output to /tmp/SCSE/resp.txt'
