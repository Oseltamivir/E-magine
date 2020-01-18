import json
import base64 as b64
import uuid
BUCKET='textbucket1377'
def lambda_handler(event, context):
    image = b64.b64decode(event['content'])
    path = str(uuid.uuid4())
    s3 = boto3.client('s3', region_name='us-east-1')
    try: resp = s3.put_object(Bucket=BUCKET,Key=path,Body=image)
    except Exception as e: raise IOError(e)
    s = main(path)
    s = s['log'] + 'Text detected: %d\n' % s['len']
    return {
        'statusCode': 200,
        'body': s#'Hello from Lambda!')
    }
import boto3
def detect_text(photo, bucket):
    client=boto3.client('rekognition', region_name='us-east-1')
    response=client.detect_text(Image={'S3Object':{'Bucket':bucket,'Name':photo}})
    textDetections=response['TextDetections']
    s = 'Detected text\n----------\n'
    for text in textDetections:
        s += 'Detected text:' + text['DetectedText'] + '\n'
        s += 'Confidence: ' + "{:.2f}".format(text['Confidence']) + "%" + '\n'
        s += 'Id: {}'.format(text['Id']) + '\n'
        if 'ParentId' in text:
            s += 'Parent Id: {}'.format(text['ParentId']) + '\n'
        s += 'Type:' + text['Type'] + '\n'
        s += '\n'
    return { 'log': s,
             'len': len(textDetections) }

def main(photo):
    return detect_text(photo,BUCKET)
