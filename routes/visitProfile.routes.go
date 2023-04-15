package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func ProfileRoute(router *echo.Echo) {
	router.GET("/visit-profile", middlewares.DbCheck(middlewares.ValidateJWT(controllers.ProfileHandler)))
}
