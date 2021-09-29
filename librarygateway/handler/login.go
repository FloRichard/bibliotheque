package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetLoginPage(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", gin.H{})
	return
}
