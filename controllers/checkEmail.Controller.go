package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"net/http"
)

func CheckEmail(c echo.Context) error {
	email := c.QueryParam("email")
	isRegistered, err := db.CheckEmailExists(email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"error": "Internal server error",
		})
	}

	return c.JSON(http.StatusOK, map[string]bool{
		"exists": isRegistered,
	})
}
