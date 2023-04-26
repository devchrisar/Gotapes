package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func UploadAvatarRoute(router *echo.Echo) {
	router.POST("/upload_Avatar", middlewares.DbCheck(middlewares.ValidateJWT(controllers.UploadAvatar)))
}

func ObtainAvatarRoute(router *echo.Echo) {
	router.GET("/obtain_Avatar", middlewares.DbCheck(controllers.ObtainAvatar))
}
