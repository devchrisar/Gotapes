package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func DeleteTweetsRoute(router *echo.Echo) {
	router.DELETE("/delete-tweet", middlewares.DbCheck(middlewares.ValidateJWT(controllers.DeleteTweetHandler)))
}
