package proxy

import (
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			logger.Warn("Missing authorization header", zap.String("value", authHeader))
			c.Redirect(http.StatusTemporaryRedirect, loginEndpoint)
			return
		}

		authorization, ok := ProxyConfig.Authorization[c.Request.URL.Path]
		if !ok {
			c.Next()
			logger.Error("unknown path")
			return
		}

		remote, err := url.Parse(authorization.RemoteHost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "cant parse host : "+authorization.RemoteHost)
		}

		//remote.Scheme = authorization.Method

		proxy := httputil.NewSingleHostReverseProxy(remote)

		proxy.Director = func(req *http.Request) {
			req.Header = c.Request.Header
			req.Host = remote.Host
			req.URL.Scheme = remote.Scheme
			req.URL.Host = remote.Host
			req.Body = c.Request.Body
			req.URL.Path = c.Request.URL.Path
		}

		proxy.ServeHTTP(c.Writer, c.Request)
	}
}
