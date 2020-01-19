LOCATE='us-east-1' #N. Virginia
def mkbucket(s3r, name: str=None) -> str:
    #returns name of bucket
    if name is None:
        from uuid import uuid4
        name = str(uuid4())
    s3r.create_bucket(Bucket=name) #, CreateBucketConfiguration={'LocationConstraint': LOCATE})
    return name

def upload(f: str, b, k: str=None) -> None:
    #b should be a Bucket object
    if k is None: k = f
    obj = b.Object(k)
    resp = obj.upload_file(f) #k and f may be swapped

def download_and_delete(k: str, b, f: str=None) -> None:
    if f is None: f = '/tmp/%s' % k
    obj = b.Object(k)
    from pathlib import Path
    from os.path import dirname
    Path(dirname(f)).mkdir(parents=True, exist_ok=True)
    resp = obj.download_file(f) #py 3.6
    #print('wrote output to %s' % f)
    obj.delete()

def display(b) -> None:
    for obj in b.objects.all():
        print(obj.key)

def delete_all_objects(bucket) -> None:
    res = []
    for obj_version in bucket.object_versions.all():
        res.append({'Key': obj_version.object_key,
                    'VersionId': obj_version.id})
    #print(res)
    bucket.delete_objects(Delete={'Objects': res})

def purge(bucket) -> None:
    delete_all_objects(bucket)
    bucket.delete()

if __name__ == '__main__':
    #this function is here to document the usage of this lib
    #boto3.resource() explicitly assumes that ~/.aws/credentials exists
    import boto3
    s = boto3.Session(profile_name='devel')
    s3r = s.resource('s3', region_name=LOCATE)
    TRASH='scsething'
    bucket = s3r.Bucket(name=TRASH)
    display(bucket)
    upload('requirements.txt', bucket)
    display(bucket)
