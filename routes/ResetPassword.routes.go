package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func ForgotPasswordRoute(router *echo.Echo) {
	router.POST("/forgot-password", middlewares.RateLimitMiddleware(controllers.ForgotPassword))
}
