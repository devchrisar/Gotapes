package handlers

import (
	"github.com/devchrisar/Gotapes/routes"
	"github.com/labstack/echo/v4"
	"github.com/rs/cors"
	"os"
)

func Handlers() {
	Port := os.Getenv("PORT")
	if Port == "" {
		Port = "8080"
	}

	router := echo.New()
	handlerCrs := cors.AllowAll().Handler(router)
	routes.RegisterRoute(router)
	routes.LoginRoute(router)
	routes.ProfileRoute(router)
	routes.AlterprofileRoute(router)
	routes.TweetRoute(router)

	router.Logger.Fatal(router.Start(":"+Port), handlerCrs)
}
