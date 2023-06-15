package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
)

func SearchUsers(c echo.Context) error {
	search := c.QueryParam("search")
	results, status := db.SearchUsers(search)
	if !status {
		return c.JSON(400, "error searching users")
	}
	return c.JSON(200, results)
}
