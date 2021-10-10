package main

import (
	"github.com/FloRichard/bibliotheque/librarygateway/handler"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("./templates/html/**/*")
	r.Static("/static/auth", "./templates/static/auth")
	r.Static("/static/lib", "./templates/static/lib")
	r.Static("/static/css", "./templates/static/css")

	r.Group("/auth").
		GET("/admin", handler.GetAdminView).
		GET("/login", handler.GetLoginPage)

	r.Group("/library").
		GET("/", handler.GetHomePage).
		GET("/author/", handler.GetAuthor).
		GET("/publisher/", handler.GetPublisher).
		GET("/book/", handler.GetBook).
		GET("/borrowing/", handler.GetBorrowing)

	r.Run(":8080")
}
