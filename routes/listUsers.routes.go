package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func ListUsersRoute(router *echo.Echo) {
	router.GET("/list_users", middlewares.DbCheck(middlewares.ValidateJWT(controllers.ListUsers)))
}
