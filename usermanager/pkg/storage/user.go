package storage

import (
	"context"

	"github.com/FloRichard/bibliotheque/usermanager/pkg/structs"
	"go.mongodb.org/mongo-driver/bson"
	"go.uber.org/zap"
)

func AddUser(u structs.User) error {
	_, err := collection.InsertOne(context.TODO(), u)
	if err != nil {
		logger.Error("Can't insert user", zap.Error(err))
		return err
	}
	return nil
}

func DeleteUser(uuid string) error {
	filter := bson.D{{Key: "id", Value: uuid}}
	_, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		logger.Error("Can't delete user", zap.Error(err))
		return err
	}
	return nil
}

func Login(login, password string) (structs.User, error) {
	filter := bson.D{
		{Key: "login", Value: login},
		{Key: "pwd", Value: password},
	}

	u := structs.User{}
	if err := collection.FindOne(context.TODO(), filter).Decode(&u); err != nil {
		logger.Error("Can't find user", zap.Error(err))
		return structs.User{}, err
	}

	return u, nil
}

func AddToken(token, id string) error {
	searchFilter := bson.D{{Key: "id", Value: id}}
	updateFilter := bson.D{{Key: "$set", Value: bson.D{{Key: "token", Value: token}}}}
	_, err := collection.UpdateOne(context.TODO(), searchFilter, updateFilter)
	if err != nil {
		logger.Error("Can't update user", zap.Error(err))
		return err
	}
	return nil
}

func GetRolesWithToken(token string) ([]string, error) {
	filter := bson.D{
		{Key: "token", Value: token},
	}

	u := structs.User{}
	if err := collection.FindOne(context.TODO(), filter).Decode(&u); err != nil {
		logger.Error("Can't find user", zap.Error(err))
		return nil, err
	}

	return u.Roles, nil

}
