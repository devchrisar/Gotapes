package middlewares

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
)

func DbCheck(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if db.CheckConnection() == 0 {
			return c.String(500, "No connection to the database")
		}
		return next(c)
	}
}
