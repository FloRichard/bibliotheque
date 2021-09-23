package controller

import (
	"errors"
	"net/http"

	"github.com/FloRichard/bibliotheque/usermanager/pkg/storage"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func VerifyIdentity(c *gin.Context) {
	token, ok := c.GetQuery("token")
	if !ok {
		logger.Error("Can't retrieve query param", zap.Error(errors.New("missing token param")))
		c.JSON(http.StatusBadRequest, "Wrong query")
		return
	}
	roles, err := storage.GetRolesWithToken(token)
	if err != nil {
		logger.Error("Can't retrieve roles", zap.Error(err))
		c.JSON(http.StatusUnauthorized, "wrong token")
		return
	}

	response := struct {
		Roles []string `json:"roles"`
	}{
		Roles: roles,
	}

	c.JSON(http.StatusOK, response)
}
