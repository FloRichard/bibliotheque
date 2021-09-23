package controller

import (
	"crypto/rand"
	"encoding/base64"
	"math"
	"net/http"

	"github.com/FloRichard/bibliotheque/usermanager/pkg/storage"
	"github.com/FloRichard/bibliotheque/usermanager/pkg/structs"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func Login(c *gin.Context) {
	creds := structs.Credential{}
	if err := c.ShouldBindJSON(&creds); err != nil {
		logger.Error("Can't bind request body", zap.Error(err))
		c.JSON(http.StatusBadRequest, "Wrong body")
		return
	}

	user, err := storage.Login(creds.Login, creds.Password)
	if err != nil {
		logger.Error("Can't authenticate user", zap.Error(err))
		c.JSON(http.StatusUnauthorized, "Wrong credentials")
		return
	}

	token := generateToken(32)

	if err := storage.AddToken(token, user.UUID); err != nil {
		logger.Error("Can't add token", zap.Error(err))
		c.JSON(http.StatusUnauthorized, "Wrong credentials")
		return
	}
	user.Token = token

	responseBody := struct {
		Id    string
		Token string
	}{
		Id:    user.UUID,
		Token: user.Token,
	}

	c.JSON(http.StatusOK, responseBody)
}

func generateToken(l int) string {
	buff := make([]byte, int(math.Ceil(float64(l)/float64(1.33333333333))))
	rand.Read(buff)
	str := base64.RawURLEncoding.EncodeToString(buff)
	return str[:l] // strip 1 extra character we get from odd length results
}
