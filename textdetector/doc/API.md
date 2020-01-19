# Internal text recognition API documentation
#### Main URL: https://662uaw6eqb.execute-api.us-east-1.amazonaws.com
`POST /v1/upload`
Run text recognition on an input image.

*Header required: Content-Type*

`Content-Type: image/<insert_image_type_here>`

###### Example request:

` PNG)*!#&%*(!...  `

The POST request has no parameters; send the raw binary representation of the image.

###### Expected response:
```
{
    "body": "Detected text\n----------\nDetected text:37 71\nConfidence: 74.00%\nId: 0\nType:LINE\n\nDetected text:37\nConfidence: 74.82%\nId: 1\nParent Id: 0\nType:WORD\n\nDetected text:71\nConfidence: 73.19%\nId: 2\nParent Id: 0\nType:WORD\n\nText detected: 3\n",
    "statusCode": 200
}
```
Note that the json returned will have escaped '\n's instead of actual raw newlines.

On failure, the API will respond with an unpredictable python stack trace.

