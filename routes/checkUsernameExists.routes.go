package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/labstack/echo/v4"
)

func CheckUsernameRoute(router *echo.Echo) {
	router.GET("/check-username", controllers.CheckUsername)
}
