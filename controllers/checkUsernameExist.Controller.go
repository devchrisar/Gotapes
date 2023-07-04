package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"net/http"
)

func CheckUsername(c echo.Context) error {
	username := c.QueryParam("username")
	isRegistered, err := db.CheckUsernameExists(username)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"error": "Internal server error",
		})
	}
	return c.JSON(http.StatusOK, map[string]bool{
		"exists": isRegistered,
	})
}
