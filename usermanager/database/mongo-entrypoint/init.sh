#! /bin/bash
echo "creating user..."
mongo admin --host localhost -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --eval "db.createUser(
    {
        user: '$MONGO_USERNAME',
        pwd: '$MONGO_PASSWORD',
        roles: [
            {
                role: 'readWrite',
                db: 'authDB',
            }
        ]
    });"
echo "user created !"
echo "importing data"
#mongoimport  --authenticationDatabase admin --db authDB --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_USERNAME --collection users --file $(pwd)/users.json --jsonArray
   # use authDB;
    #db.createCollection(users);
   # db.users.insert(
   # {
  #      \"first_name\":\"Julien\",
  #      \"last_name\":\"Monteil\",
  #      \"login\":\"ju\",
   #     \"pwd\":\"ju\",
    #    \"roles\": [
 #           \"administrator\",\"contributor\",\"borrow\",\"consult\"
   #     ]
  #  })