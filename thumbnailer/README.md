# Instructions for installation on AWS Lambda
AWS Lambda has no 'pip install', so packges have to be attached to Lambda manually.
0. Ensure that you have python2.7 installed on a bash shell.
1. ./package.sh
2. On your AWS Console, create a new Lambda Function and upload the generated package.zip as the python code
3. Attach whatever Lambda i/o needed
