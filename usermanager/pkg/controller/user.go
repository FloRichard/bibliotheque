package controller

import (
	"net/http"

	"github.com/FloRichard/bibliotheque/usermanager/pkg/storage"
	"github.com/FloRichard/bibliotheque/usermanager/pkg/structs"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

func AddUser(c *gin.Context) {
	u := &structs.User{}
	if err := c.ShouldBindHeader(u); err != nil {
		logger.Error("Can't process request", zap.Error(err))
		c.JSON(http.StatusBadRequest, "Invalid user")
		return
	}

	if err := storage.AddUser(*u); err != nil {
		logger.Error("Can't add user", zap.Error(err))
		c.JSON(http.StatusBadRequest, "Invalid user")
		return
	}

	c.JSON(http.StatusCreated, "")

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
