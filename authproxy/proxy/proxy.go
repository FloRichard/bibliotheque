package proxy

import (
	"io/ioutil"
	"os"

	"github.com/FloRichard/bibliotheque/authproxy/structs"
	"go.uber.org/zap"
	"gopkg.in/yaml.v2"
)

var (
	logger        *zap.Logger
	loginEndpoint = "http://localhost:8080/auth/login"
)
var (
	RequestChecker structs.RequestChecker
)

func Init() error {
	var err error
	logger, err = zap.NewProduction()
	if err != nil {
		return err
	}

	defer logger.Sync()
	os.Getenv("GOPATH")

	yamlFile, err := ioutil.ReadFile("./authorization/conf.yaml")
	if err != nil {
		logger.Error("Can't read file", zap.Error(err))
		return err
	}

	RequestChecker = structs.RequestChecker{}
	if err = yaml.Unmarshal(yamlFile, &RequestChecker); err != nil {
		logger.Error("Can't map yaml file", zap.Error(err))
		return err
	}
	return nil
}
