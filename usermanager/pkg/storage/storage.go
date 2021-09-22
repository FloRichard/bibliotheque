package storage

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
)

var (
	collection *mongo.Collection
	logger     zap.Logger
)

func Init() {
	logger, _ := zap.NewProduction()
	defer logger.Sync()

	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017/")
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	collection = client.Database("auth").Collection("user")
}
