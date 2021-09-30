package main

import (
	"github.com/FloRichard/bibliotheque/librarygateway/handler"
	"github.com/FloRichard/bibliotheque/librarygateway/middleware"
	"github.com/gin-gonic/gin"
)

func main() {
	middleware.Init()
	r := gin.Default()
	r.LoadHTMLGlob("./templates/**/*")
	r.Static("/assets", "./assets")
	r.Static("/static", "./templates/static")

	r.Group("/auth").
		GET("/admin", handler.GetAdminView).
		GET("/login", handler.GetLoginPage)

	r.Group("/library").
		GET("/", handler.GetHomePage)

	r.Run(":8080")
}
