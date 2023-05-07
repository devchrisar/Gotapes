package handlers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"os"
)

func Handlers() {
	Port := os.Getenv("PORT")
	if Port == "" {
		Port = "8080"
	}

	router := echo.New()
	router.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"}, // Replace * with your frontend's URL in production
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
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
	routes.ListUsersRoute(router)
	routes.ReadFollowersTweetsRoute(router)

	go db.ConsumeFromQueue()

	router.Logger.Fatal(router.Start(":" + Port))
}
