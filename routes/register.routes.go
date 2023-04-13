package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func RegisterRoute(router *echo.Echo) {
	router.POST("/register", middlewares.DbCheck(controllers.RegisterHandler))
}
