package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func SearchUsersRoutes(router *echo.Echo) {
	router.GET("/search", middlewares.DbCheck(middlewares.ValidateJWT(controllers.SearchUsers)))
}
