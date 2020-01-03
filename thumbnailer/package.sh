#/bin/bash
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
[ "$(basename "$PWD")" = 'thumbnailer' ]
assert 'checking directory...' 'please run this script in the thumbnailer directory' "$PWD"
python --version 2>&1 | grep -q 'Python 2.7'
assert 'checking python version...' 'python 2.7 is required for this package' 'Python 2.7.*'

echo -n 'creating package without error checking... '
virtualenv -q new
. new/bin/activate
pip -qq install Pillow boto3
pylibdir='new/lib/python2.7/site-packages'
cp lambda_function.py "$pylibdir"
cd "$pylibdir"
zip -qr9 ../../../../package.zip .
echo 'probably worked (?)'

deactivate
cd ../../../..
rm -r new
assert 'performing cleanup...' 'something happened' 'done'
