package proxy

import (
	"io/ioutil"

	"go.uber.org/zap"
	"gopkg.in/yaml.v2"
)

var (
	logger        *zap.Logger
	loginEndpoint = "http://localhost:8080/auth/login"
)
var (
	ProxyConfig Config
)

type Authorization struct {
	//Path       string   `yaml:"path"`
	Method     string   `yaml:"method"`
	RemoteHost string   `yaml:"remote_host"`
	Roles      []string `yaml:"roles"`
}

type Config struct {
	Authorization map[string]Authorization `yaml:"authorization"`
}

func Init() error {
	var err error
	logger, err = zap.NewProduction()
	if err != nil {
		return err
	}
	defer logger.Sync()

	yamlFile, err := ioutil.ReadFile("/home/frichard/go/src/github.com/FloRichard/bibliotheque/authproxy/conf.yaml")
	if err != nil {
		logger.Error("Can't read file", zap.Error(err))
		return err
	}
	ProxyConfig = Config{}

	err = yaml.Unmarshal(yamlFile, &ProxyConfig)
	if err != nil {
		logger.Error("Can't map yaml file", zap.Error(err))
		return err
	}

	logger.Info("Proxy Config", zap.Any("", ProxyConfig))
	return nil
}
