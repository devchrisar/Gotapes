package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func LoginRoute(router *echo.Echo) {
	router.POST("/login", middlewares.DbCheck(controllers.LoginHandler))
}
