package main

import (
	"github.com/FloRichard/bibliotheque/librarygateway/handler"
	"github.com/FloRichard/bibliotheque/librarygateway/proxy"
	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()
	r.LoadHTMLGlob("./templates/**/*")
	r.Static("/assets", "./assets")
	r.Static("/static", "./templates/static")

	// Auth group of endpoint
	r.Group("/auth").
		POST("/login", proxy.Basic).
		GET("/login", handler.GetLoginPage).
		Any("/user/*id", proxy.Basic).
		GET("/token/verify", proxy.Auth).
		GET("/userform", handler.GetUserForm)

	r.Group("/library").
		GET("/", handler.GetHomePage)

	r.Run(":8080")
}
