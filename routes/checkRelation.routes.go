package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func CheckRelationRoute(router *echo.Echo) {
	router.GET("/check_Relation", middlewares.DbCheck(middlewares.ValidateJWT(controllers.CheckRelation)))
}
