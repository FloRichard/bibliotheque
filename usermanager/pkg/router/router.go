package router

import (
	"github.com/FloRichard/bibliotheque/usermanager/pkg/controller"
	"github.com/gin-gonic/gin"
)

func Init() *gin.Engine {
	/*config := cors.DefaultConfig()
		config.AllowAllOrigins = true
	   	config.AllowCredentials = true
	   	config.AddAllowHeaders("Authorization")
	   	config.AllowMethods = []string{
	   		"POST", "GET", "OPTIONS", "DELETE",
	   	} */

	r := gin.New()
	//r.Use(cors.New(config))

	r.Use(gin.Logger())

	r.Group("/auth").
		POST("/user/", controller.AddUser).
		GET("/user/", controller.GetUsers).
		DELETE("/user/:id", controller.DeleteUser).
		POST("/login", controller.Login).
		GET("/token/verify", controller.VerifyIdentity)
	return r
}
