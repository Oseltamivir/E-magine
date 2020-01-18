# Text Detection via AWS Rekognise
Test image detection by running the command,
```
./textdetector.sh <FILENAME>
```
## e.g.
```
~# cd E-magine/textdetector
~/E-magine/textdetector# ./textdetector.sh ~/chem_homework.png
Why does W2Br10 conduct electricity in the liquid state?
~/E-magine/textdetector#
```
### How does this work
`textdetector.sh` is a wrapper to call (and output the result of) an Amazon API Gateway running on an AWS Student account.
Internally, the API activates a lambda function (`lambda_handler.py`) before returning its output to the API caller.
