#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "No url argument supplied"
    exit 1
fi
  
# localhost /classify endpoint
test_endpoint_url="http://localhost:3001/classify?url=${1}&model=mobilenet&version=69"
curl_test_cmd="curl -s ${test_endpoint_url}"
echo $curl_test_cmd
eval $curl_test_cmd
