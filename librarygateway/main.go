package main

import (
	"github.com/FloRichard/bibliotheque/librarygateway/handler"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("./templates/html/**/*")
	r.Static("/static/auth", "./templates/static/auth")

	r.Group("/auth").
		GET("/admin", handler.GetAdminView).
		GET("/login", handler.GetLoginPage)

	r.Group("/library").
		GET("/", handler.GetHomePage)

	r.Run(":8080")
}
