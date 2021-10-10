package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetHomePage(c *gin.Context) {
	c.HTML(http.StatusOK, "accueil.html", gin.H{})
	return
}

func GetAuthor(c *gin.Context) {
	c.HTML(http.StatusOK, "author.html", gin.H{})
	return
}

func GetPublisher(c *gin.Context) {
	c.HTML(http.StatusOK, "publisher.html", gin.H{})
	return
}

func GetBook(c *gin.Context) {
	c.HTML(http.StatusOK, "book.html", gin.H{})
	return
}

func GetBorrowing(c *gin.Context) {
	c.HTML(http.StatusOK, "borrowing.html", gin.H{})
	return
}
