package proxy

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/FloRichard/bibliotheque/authproxy/structs"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if c.Request.URL.Path != "/auth/login" && authHeader == "" {
			if c.Request.Method == "OPTIONS" {
				setCORSHeader(c)
				c.JSON(http.StatusOK, "")
				return
			}
			logger.Warn("Missing authorization header", zap.String("value", authHeader))
			c.Redirect(http.StatusTemporaryRedirect, loginEndpoint)
			return
		}

		authorization, err := RequestChecker.Validate(c.Request.Method, c.Request.URL.Path, authHeader)
		if err != nil {
			setCORSHeader(c)
			c.AbortWithStatusJSON(http.StatusUnauthorized, "Malformed path or method")
			return
		}

		proxy, err := newProxy(c, authorization)
		if err != nil {
			logger.Error("Can't create proxy", zap.Error(err))
			c.AbortWithStatusJSON(http.StatusInternalServerError, "")
			return
		}

		proxy.ServeHTTP(c.Writer, c.Request)
	}
}

func setCORSHeader(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,DELETE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
}

func newProxy(c *gin.Context, auth structs.Authorization) (*httputil.ReverseProxy, error) {
	remote, err := url.Parse(auth.RemoteHost)
	if err != nil {
		logger.Error("Can't par host", zap.Error(err))
		return nil, err
	}

	proxy := httputil.NewSingleHostReverseProxy(remote)

	proxy.Director = func(req *http.Request) {
		req.Header = c.Request.Header
		req.Host = remote.Host
		req.URL.Scheme = remote.Scheme
		req.URL.Host = remote.Host
		req.Body = c.Request.Body
		req.URL.Path = c.Request.URL.Path
		req.Method = c.Request.Method

		for key, value := range c.Request.URL.Query() {
			req.URL.Query().Set(key, strings.Join(value, ""))
		}
	}

	proxy.ModifyResponse = func(res *http.Response) error {
		res.Header.Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,DELETE")
		res.Header.Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		res.Header.Set("Access-Control-Allow-Origin", "*")
		return nil
	}

	return proxy, nil
}
