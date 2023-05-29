package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/labstack/echo/v4"
)

func CheckEmailRoute(router *echo.Echo) {
	router.GET("/check-email", controllers.CheckEmail)
}
