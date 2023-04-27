package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func HigherRelationRoute(router *echo.Echo) {
	router.POST("/higher_Relation", middlewares.DbCheck(middlewares.ValidateJWT(controllers.HigherRelation)))
}
