from PIL import Image
from io import BytesIO
#more sizes should be added for edge cases (e.g. tall/wide images)
SIZES = {'small': (128,128),
         'medium':(300,300),
         'large': (800, 600)} #small, medium, large
FORMATS = ['PNG', 'JPEG', 'GIF'] #note that gifs/apngs will behave unpredictably

def typeWrapper(data):
    # type: (??????) -> (PIL.Image.Image)
    info = type(data).__name__
    if 'PIL.' in info: return data
    if 'str' == info or 'bytearray' == info: return Image.open(BytesIO(data))
    if 'file' == info: return Image.open(data) #semi-dangerous; could leave a file handle open
    raise TypeError

def validFormat(im):
    # type: (PIL.Image.Image) -> bool
    '''verifies that image `im` is supported'''
    return im.format in FORMATS

def generateResized(im):
    # type: (PIL.Image.Image) -> list((PIL.Image.Image, str))
    '''generates resized versions of `im` for use in thumbnailing
    raises ValueError if `im` is invalid'''
    if not validFormat(im): raise ValueError
    #note: next line of code is unclean
    return [((lambda cpy: (cpy, t) if not cpy.thumbnail(SIZES[t]) else 0/0)(im.copy())) for t in SIZES]

def thumbnail_file(name):
    # type: (str) -> list(str)
    '''generates & writes thumbnails from local file NAME
    returns a list of the files that were written'''
    written = []
    with open(name) as f:
        imgs = generateResized(typeWrapper(f))
        for im, label in imgs:
            written.append(name + '-' + label + '.jpg')
            im.save(written[-1], 'JPEG') #thumbnails are saved as jpgs
    return written

#AWS magic starts here
import boto3, re
s3_client = boto3.client('s3')
def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key'] 
        download_path = '/tmp/%s' % key #NOT concerned with duplicate image uploading
        s3_client.download_file(bucket, key, download_path)
        for filepath in thumbnail_file(download_path):
            size = re.findall('-[a-z]*.jpg$', filepath)[0]
            s3_client.upload_file(filepath, bucket+'-resized', key+size)

    return {
        'statusCode': 200,
        'body': 'no idea if this suceeded'
    }
