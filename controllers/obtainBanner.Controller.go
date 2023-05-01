package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"net/http"
)

func ObtainBanner(c echo.Context) error {
	ID := c.QueryParam("id")
	if len(ID) < 1 {
		return c.JSON(400, "id not found")
	}
	profile, err := db.SeekProfile(ID)
	if err != nil {
		return c.JSON(400, "user not found "+err.Error())
	}
	url := profile.Banner
	if len(url) < 1 {
		return c.JSON(400, "image not found")
	}

	resp, err := http.Get(url)
	if err != nil {
		return c.JSON(400, "error fetching image "+err.Error())
	}
	return c.Stream(200, "image/png", resp.Body)
}
