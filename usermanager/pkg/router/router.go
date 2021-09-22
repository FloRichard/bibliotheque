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
	config.AddAllowHeaders("authorization")

	r := gin.New()
	r.Use(cors.New(config))
	r.Use(gin.Logger())

	r.DELETE("/user/:id", controller.DeleteUser)
	r.POST("/user", controller.AddUser)

	r.GET("/identity/verify", controller.VerifyIdentity)
	return r

}
