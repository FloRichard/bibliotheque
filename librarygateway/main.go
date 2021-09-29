package main

import (
	"github.com/FloRichard/bibliotheque/librarygateway/handler"
	"github.com/FloRichard/bibliotheque/librarygateway/proxy"
	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()
	r.LoadHTMLFiles("./templates/login.html")

	// Auth group of endpoint
	r.Group("/auth").
		POST("/login", proxy.Basic).
		GET("/login", handler.GetLoginPage).
		Any("/user/*id", proxy.Basic).
		GET("/token/verify", proxy.Auth)

	r.Group("/library")

	r.Run(":8080")
}
