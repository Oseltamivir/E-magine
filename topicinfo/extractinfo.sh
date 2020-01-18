#!/bin/bash
tar -Ozxf /tmp/SCSE/output.tar.gz | while read -r
do  jq '(.File+": "+(.Classes|max_by(.Score).Name))' <<< "$REPLY"
done
