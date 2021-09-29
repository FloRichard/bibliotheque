package proxy

import (
	"go.uber.org/zap"
)

var (
	logger        *zap.Logger
	loginEndpoint = "http://localhost:8080/auth/login"
)

func Init() error {
	var err error
	logger, err = zap.NewProduction()
	if err != nil {
		return err
	}
	defer logger.Sync()
	return nil
}
