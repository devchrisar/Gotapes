package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func UploadBannerRoute(router *echo.Echo) {
	router.POST("/upload_Banner", middlewares.DbCheck(middlewares.ValidateJWT(controllers.UploadBanner)))
}

func ObtainBannerRoute(router *echo.Echo) {
	router.GET("/obtain_Banner", middlewares.DbCheck(controllers.ObtainBanner))
}
