package controller

import "go.uber.org/zap"

var (
	logger zap.Logger
)

func Init() {
	logger, _ := zap.NewProduction()
	defer logger.Sync()
}
