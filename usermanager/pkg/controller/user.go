package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/FloRichard/bibliotheque/usermanager/pkg/storage"
	"github.com/FloRichard/bibliotheque/usermanager/pkg/structs"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

func AddUser(c *gin.Context) {
	b, err := io.ReadAll(c.Request.Body)
	if err != nil {
		logger.Error("Can't read request body", zap.Error(err))
		c.JSON(http.StatusBadRequest, "Invalid request")
		return
	}

	u := structs.User{}
	if err := json.Unmarshal(b, &u); err != nil {
		logger.Error("Can't bind body", zap.Error(err))
		c.JSON(http.StatusBadRequest, "Invalid request")
		return
	}

	uid, _ := uuid.NewRandom()

	u.UUID = uid.String()

	if err := storage.AddUser(u); err != nil {
		logger.Error("Can't add user", zap.Error(err))
		c.JSON(http.StatusBadRequest, "Invalid user")
		return
	}

	responseBody := struct {
		Id    string
		Token string
	}{
		Id:    u.UUID,
		Token: "",
	}

	c.JSON(http.StatusOK, responseBody)

}

func DeleteUser(c *gin.Context) {
	rawID := c.Param("id")
	uid, err := uuid.Parse(rawID)
	if err != nil {
		logger.Error("Can't process request", zap.Error(err))
		c.JSON(http.StatusBadRequest, "Missing id path param")
		return
	}

	if err := storage.DeleteUser(uid.String()); err != nil {
		logger.Error("Can't delete user", zap.Error(err))
		c.JSON(http.StatusBadRequest, "invalid ID")
	}

	c.JSON(http.StatusNoContent, "")
}
