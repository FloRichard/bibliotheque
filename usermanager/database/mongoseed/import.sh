#! /bin/bash

mongoimport --host auth_db --authenticationDatabase admin --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD -db authDB  --jsonArray --collection users --file '/mongoseed/users.json'