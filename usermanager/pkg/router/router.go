package router

import (
	"github.com/FloRichard/bibliotheque/usermanager/pkg/controller"
	"github.com/gin-gonic/gin"
)

var (
	Router *gin.Engine
)

func Init() {
	Router = gin.Default()

	Router.DELETE("/user/:id", controller.DeleteUser)
	Router.POST("/user", controller.AddUser)

	Router.GET("/identity/verify", controller.VerifyIdentity)

}
