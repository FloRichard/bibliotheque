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

func GetAllUser() ([]structs.User, error) {
	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		logger.Error("Can't retrieved users", zap.Error(err))
		return nil, err
	}

	users := []structs.User{}
	if err = cursor.All(context.TODO(), &users); err != nil {
		logger.Error("Can't decode user", zap.Error(err))
		return nil, err
	}

	return users, nil
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

func Logout(token string) error {
	searchFilter := bson.D{
		{Key: "token", Value: token},
	}

	update := bson.D{
		{"$set", bson.D{{Key: "token", Value: "token"}}},
	}
	_, err := collection.UpdateOne(context.TODO(), searchFilter, update)
	if err != nil {
		logger.Error("Can't empty token value", zap.Error(err))
		return err
	}
	return nil

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
