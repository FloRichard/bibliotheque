package storage

import (
	"context"
	"os"

	"github.com/FloRichard/bibliotheque/usermanager/pkg/structs"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
)

var (
	collection  *mongo.Collection
	logger      *zap.Logger
	defaultUser = structs.User{
		FirstName: "Florian",
		LastName:  "Richard",
		Login:     "admin",
		Pwd:       "admin",
		Roles: []string{
			"administrator",
			"contributor",
			"borrow",
			"consult",
		},
	}
)

func Init() error {
	logger, _ = zap.NewProduction()
	defer logger.Sync()

	authDBCredential := options.Credential{
		Username: "user",
		Password: "secret",
	}

	clientOptions := options.Client().ApplyURI("mongodb://auth_db:27017/").SetAuth(authDBCredential)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		logger.Error("Can't connect to mongoDB", zap.Error(err))
		return err
	}

	if err := client.Ping(context.TODO(), nil); err != nil {
		logger.Error("Can't ping mongoDB", zap.Error(err))
		return err
	}

	collection = client.Database("authDB").Collection("users")
	if err := AddUser(defaultUser); err != nil {
		logger.Error("Can't create default user", zap.Error(err))
		return err
	}
	logger.Info("env var", zap.String("", os.Getenv("DEFAULT_LIB_USER")))
	return nil
}
