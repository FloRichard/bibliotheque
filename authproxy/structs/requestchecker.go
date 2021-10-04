package structs

import (
	"encoding/json"
	"io"
	"net/http"
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

func (reqChecker *RequestChecker) Validate(method, path, token string) (Authorization, error) {
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

	if len(authorization.Roles) != 0 {
		authRoles, err := getRolesFromAuth(token)
		if err != nil {
			logger.Error("Can't get roles", zap.Error(err))
			return Authorization{}, err
		}

		if !validateRoles(authorization.Roles, authRoles) {
			logger.Error("Roles not found")
			return Authorization{}, err
		}
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

func getRolesFromAuth(token string) ([]string, error) {
	url := "http://localhost:8082/auth/token/verify"
	queryParam := "?token=" + token
	res, err := http.Get(url + queryParam)
	if err != nil {
		logger.Error("Can't proccess verify request", zap.Error(err))
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		logger.Error("Wring status ok", zap.String(http.StatusText(http.StatusOK), res.Status))
		return nil, err
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		logger.Error("Can't read body", zap.Error(err))
		return nil, err
	}

	roles := struct {
		Roles []string `json:"roles"`
	}{}
	if err := json.Unmarshal(body, &roles); err != nil {
		logger.Error("Can't bind body", zap.Error(err))
		return nil, err
	}

	return roles.Roles, nil
}

func validateRoles(registeredRoles, authRoles []string) bool {
	for _, rr := range registeredRoles {
		for _, ar := range authRoles {
			if strings.EqualFold(rr, ar) {
				return true
			}
		}
	}
	return false
}
