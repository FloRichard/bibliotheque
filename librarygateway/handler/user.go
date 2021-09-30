package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetLoginPage(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", gin.H{})
	return
}

func GetUserForm(c *gin.Context) {
	c.HTML(http.StatusOK, "users.html", gin.H{})
	return
}
