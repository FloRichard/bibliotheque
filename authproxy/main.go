package main

import (
	"github.com/FloRichard/bibliotheque/authproxy/proxy"
	"github.com/FloRichard/bibliotheque/authproxy/structs"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AddAllowHeaders("Authorization")
	config.AllowMethods = []string{
		"POST", "GET", "OPTIONS", "DELETE",
	}

	r := gin.Default()
	//r.Use(setCORSHeader())
	//r.Use(cors.New(config))
	if err := proxy.Init(); err != nil {
		return
	}

	if err := structs.Init(); err != nil {
		return
	}

	r.Use(proxy.Auth()).Any("/")
	r.Run(":8081")
}

func setCORSHeader() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	}
}
