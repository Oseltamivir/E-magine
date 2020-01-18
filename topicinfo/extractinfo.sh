#!/bin/bash
tar -Ozxf /tmp/SCSE/output.tar.gz|jq '(.File+": "+(.Classes|max_by(.Score).Name))'
