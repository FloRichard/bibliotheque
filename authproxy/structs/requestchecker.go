package structs

import (
	"strings"

	"github.com/google/uuid"
	"go.uber.org/zap"
)

type RequestChecker struct {
	Authorization map[string]Authorization `yaml:"authorization"`
}

type Authorization struct {
	Method     string   `yaml:"method"`
	RemoteHost string   `yaml:"remote_host"`
	Roles      []string `yaml:"roles"`
}

func (reqChecker *RequestChecker) Validate(method, path string) (Authorization, error) {
	path, err := handlePath(path)
	if err != nil {
		logger.Error("Malformed path", zap.String("Path", path))
		return Authorization{}, err
	}

	authorization, ok := reqChecker.Authorization[path]
	if !ok {
		logger.Error("unknown path", zap.String("Path", path))
		return Authorization{}, err
	}

	if method != authorization.Method {
		logger.Error("unknown method",
			zap.String("received", method),
			zap.String("registered", authorization.Method),
		)
		return Authorization{}, err
	}

	return authorization, nil
}

func handlePath(url string) (string, error) {
	fragments := strings.Split(url, "/")
	path := []string{}
	for _, frag := range fragments {
		_, err := uuid.Parse(frag)
		if err == nil {
			path = append(path, ":id")
		} else {
			path = append(path, frag)
		}
	}

	finalPath := strings.Join(path, "/")
	logger.Info("joined", zap.Any("v", finalPath))
	return finalPath, nil
}
