package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func AlterprofileRoute(router *echo.Echo) {
	router.PUT("/alter-profile", middlewares.DbCheck(middlewares.ValidateJWT(controllers.AlterProfile)))
}
