package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

var (
	logger        *zap.Logger
	loginEndpoint = "http://localhost:8080/auth/login"
)

func Init() {
	var err error
	logger, err = zap.NewProduction()
	if err != nil {
		panic(err)
	}
	defer logger.Sync()
}

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			logger.Error("Missing authorization header")
			c.Redirect(http.StatusTemporaryRedirect, loginEndpoint)
			return
		}
		c.Next()
	}
}
