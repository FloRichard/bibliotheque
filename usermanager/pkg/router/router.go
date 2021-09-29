package router

import (
	"github.com/FloRichard/bibliotheque/usermanager/pkg/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Init() *gin.Engine {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AddAllowHeaders("Authorization")

	r := gin.New()
	r.Use(cors.New(config))
	r.Use(gin.Logger())

	r.Group("/auth").
		POST("/user/", controller.AddUser).
		DELETE("/user/:id", controller.DeleteUser).
		POST("/login", controller.Login).
		GET("/token/verify", controller.VerifyIdentity)
	return r
}
