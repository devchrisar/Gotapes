package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func TweetRoute(router *echo.Echo) {
	router.POST("/tweet", middlewares.DbCheck(middlewares.ValidateJWT(controllers.Tweet)))
}
