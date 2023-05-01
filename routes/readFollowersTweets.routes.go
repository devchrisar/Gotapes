package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func ReadFollowersTweetsRoute(router *echo.Echo) {
	router.GET("/read_followers_tweets", middlewares.DbCheck(middlewares.ValidateJWT(controllers.ReadFollowersTweets)))
}
