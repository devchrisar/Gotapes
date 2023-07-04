package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/labstack/echo/v4"
)

func NewPasswordRoute(router *echo.Echo) {
	router.PUT("/reset-password", controllers.NewPasswordHandler)
}
