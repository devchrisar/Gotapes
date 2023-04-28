package routes

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/devchrisar/Gotapes/middlewares"
	"github.com/labstack/echo/v4"
)

func LowerRelationRoute(router *echo.Echo) {
	router.DELETE("/lower_Relation", middlewares.DbCheck(middlewares.ValidateJWT(controllers.LowerRelation)))
}
