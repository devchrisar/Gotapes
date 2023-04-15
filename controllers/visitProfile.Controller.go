package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"net/http"
)

func ProfileHandler(c echo.Context) error {
	ID := c.QueryParam("id")
	if len(ID) == 0 {
		return c.String(http.StatusBadRequest, "ID is required")
	}
	profile, err := db.SeekProfile(ID)
	if err != nil {
		return c.String(http.StatusBadRequest, "User not found"+err.Error())
	}
	c.Response().Header().Set("Content-Type", "application/json")
	c.Response().WriteHeader(http.StatusCreated)
	return json.NewEncoder(c.Response().Writer).Encode(profile)
}
