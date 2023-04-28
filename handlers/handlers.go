package handlers

import (
	"github.com/devchrisar/Gotapes/db"
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
	routes.ReadTweetsRoute(router)
	routes.DeleteTweetsRoute(router)
	routes.UploadAvatarRoute(router)
	routes.UploadBannerRoute(router)
	routes.ObtainAvatarRoute(router)
	routes.ObtainBannerRoute(router)
	routes.HigherRelationRoute(router)
	routes.LowerRelationRoute(router)
	routes.CheckRelationRoute(router)

	go db.ConsumeFromQueue()

	router.Logger.Fatal(router.Start(":"+Port), handlerCrs)
}
