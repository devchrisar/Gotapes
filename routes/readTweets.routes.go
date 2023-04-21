package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func ReadTweetsRoute(router *echo.Echo) {
	router.GET("/read-tweets", middlewares.DbCheck(middlewares.ValidateJWT(controllers.ReadTweets)))
}
