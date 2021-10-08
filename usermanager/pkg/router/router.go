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
	config.AllowMethods = []string{
		"POST", "GET", "OPTIONS", "DELETE",
	}

	r := gin.New()
	//r.Use(cors.New(config))

	r.Use(gin.Logger())

	r.Group("/auth").
		POST("/user/", controller.AddUser).
		PUT("/user/", controller.UpdateUser).
		GET("/users", controller.GetUsers).
		DELETE("/user/:id", controller.DeleteUser).
		GET("/token/verify", controller.VerifyIdentity).
		GET("/logout", controller.Logout)
		
	r.POST("/auth/login", controller.Login).Use(cors.New(config))
	return r
}
