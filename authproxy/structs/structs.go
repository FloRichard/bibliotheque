package structs

import "go.uber.org/zap"

var logger *zap.Logger

func Init() error {
	var err error
	logger, err = zap.NewProduction()
	if err != nil {
		return err
	}
	defer logger.Sync()
	return nil
}
