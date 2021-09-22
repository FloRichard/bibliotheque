package storage

import (
	"context"

	"github.com/FloRichard/bibliotheque/usermanager/pkg/structs"
	"go.mongodb.org/mongo-driver/bson"
	"go.uber.org/zap"
)

func AddUser(u structs.User) error {
	_, err := collection.InsertOne(context.Background(), u)
	if err != nil {
		logger.Error("Can't insert user", zap.Error(err))
		return err
	}
	return nil
}

func DeleteUser(uuid string) error {
	filter := bson.D{{Key: "login", Value: uuid}}
	_, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		logger.Error("Can't delete user", zap.Error(err))
		return err
	}
	return nil
}

func VerifyIdentity(login, password string) {
	filter := bson.D{
		{Key: "login", Value: login},
		{Key: "pwd", Value: password},
	}
	res := collection.FindOne(context.Background(), filter)
	if res.Err() != nil {
		logger.Error("Can't find user", zap.Error(res.Err()))
	}
}
