#! /bin/bash
mongoimport  --authenticationDatabase admin --db authDB --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_USERNAME --collection users --file users.json --jsonArray