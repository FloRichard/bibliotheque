package main

import (
	"github.com/FloRichard/bibliotheque/usermanager/pkg/controller"
	"github.com/FloRichard/bibliotheque/usermanager/pkg/router"
	"github.com/FloRichard/bibliotheque/usermanager/pkg/storage"
)

func main() {

	if err := storage.Init(); err != nil {
		panic(err)
	}

	if err := controller.Init(); err != nil {
		panic(err)
	}

	r := router.Init()

	r.Run(":8082")
}
