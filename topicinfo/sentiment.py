#!/usr/bin/python3
import boto3
from uuid import uuid4
from s3 import *
from time import sleep
from itertools import cycle
from sys import argv
from os import access, R_OK
from os.path import basename

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

#constants
CLASSIFIER = 'arn:aws:comprehend:us-east-1:553816289748:document-classifier/nlp'
role_ARN = "arn:aws:iam::553816289748:role/service-role/AmazonComprehendServiceRoleS3FullAccess-nlp"

def analyse(to_upload: list) -> None: 
    #init buckets
    s3r = boto3.resource('s3', region_name=LOCATE)
    IN_BUCKET = mkbucket(s3r)
    OUT_BUCKET = mkbucket(s3r)
    print('created buckets %s and %s' % (IN_BUCKET,OUT_BUCKET))
    in_B = s3r.Bucket(name=IN_BUCKET)
    out_B = s3r.Bucket(name=OUT_BUCKET)

    #upload text files to analyse
    for s in to_upload: upload(s, in_B, basename(s))

    #start the comprehend job
    jobname = str(uuid4())
    nlp = boto3.client('comprehend', region_name=LOCATE)
    print(bcolors.OKGREEN + 'starting job ' + bcolors.ENDC + jobname)
    job = nlp.start_document_classification_job(
            JobName=jobname,
            DocumentClassifierArn=CLASSIFIER,
            InputDataConfig={'S3Uri': 's3://%s' % IN_BUCKET, 'InputFormat': 'ONE_DOC_PER_FILE'},
            OutputDataConfig={'S3Uri': 's3://%s' % OUT_BUCKET}, #might crash because of missing unrequired var?
            DataAccessRoleArn=role_ARN)

    #let the job process
    info = lambda: nlp.describe_document_classification_job(JobId=job['JobId'])['DocumentClassificationJobProperties']
    spin = cycle(['-','/','|','\\'])
    while info()['JobStatus'] in {'SUBMITTED', 'IN_PROGRESS'}:
        sleep(1)
        print('job in progress... '+next(spin), end='\r')

    #check that the job worked
    if (resp := info())['JobStatus'] != 'COMPLETED':
        print("PANIC: JOB %s FAILED; dumping info" % job['JobId'])
        print(job)
        print(resp)
        exit(1)
    print(bcolors.OKGREEN + 'job succeeded!' + bcolors.ENDC)
    for obj in out_B.objects.all():
        if obj.key[0] != '.': #if file is not hidden file
            download_and_delete(obj.key, out_B, '/tmp/SCSE/%s' % basename(obj.key))

    #get rid of the buckets
    for f in (delete_all_objects, lambda b: b.delete()):
        map(f, (in_B, out_B))

analyse([f for f in argv[1:] if access(f, R_OK)])
