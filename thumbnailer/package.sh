#/bin/bash
errpt(){ echo -en '\033[1;31m';echo -n "$1";echo -e '\033[0;0m'; }
success(){ echo -en '\033[1;32m';echo -n "$1";echo -e '\033[0;0m'; }

echo -n 'directory... '
if [ "$(basename "$PWD")" != 'thumbnailer' ]
then    errpt 'please run this script in the thumbnailer directory'
        exit
fi
success "$PWD"

echo -n 'checking python version ... '
if python --version 2>&1 | grep -q 'Python 3.'
then    errpt 'python 2.7 is required for this package'
        exit
fi
success 'python 2.7'

echo -n 'creating package without error checking... '
virtualenv -q new
. new/bin/activate
pip -qq install Pillow boto3
pylibdir='new/lib/python2.7/site-packages'
cp lambda_function.py "$pylibdir"
cd "$pylibdir"
zip -qr9 ../../../../package.zip .
echo 'probably worked (?)'

echo -n 'performing cleanup... '
deactivate
cd ../../../..
rm -r new
success 'done'
