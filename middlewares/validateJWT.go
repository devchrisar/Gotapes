package middlewares

import (
	"github.com/devchrisar/Gotapes/controllers"
	"github.com/labstack/echo/v4"
	"net/http"
)

func ValidateJWT(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		_, _, _, err := controllers.ProcessToken(c.Request().Header.Get("Authorization"))
		if err != nil {
			return c.String(http.StatusBadRequest, "Invalid token ! "+err.Error())
		}
		return next(c)
	}
}
