#!/bin/bash
#helper functions
errpt(){ echo -en '\033[1;31m';echo -n "$1";echo -e '\033[0;0m'; }
c_or_d(){ #confirm-or-die
    local code="$?"
    if [ "$code" -ne 0 ]
    then    errpt "$1"
            exit 1
    fi
}
#print help menu if needed
if ! [ -f "$1" ]
then
    cat<<EOF
$0 - detect text in an IMAGE
usage: $0 IMAGE
EOF
    exit 0
fi
#check the file given as argument
file="$1"
ct="$(file "$file"|grep -oE 'JPEG|PNG|GIF'|tr '[A-Z]' '[a-z]')"
c_or_d 'error: image format not identified/supported' `[ "$ct" != '' ]`
c_or_d 'error: `jq` not installed. Try apt-getting jq' `which jq > /dev/null`
#send the request, and print out response
API='https://662uaw6eqb.execute-api.us-east-1.amazonaws.com/v1/upload'
resp="$(curl -sX POST -H "Content-Type: image/$ct" --data-binary @"$file" "$API")"
c_or_d "error: API curl returned non-zero error code of $?"
echo -e $(echo "$resp"|jq .body) #lack of outer quotes is intentional
