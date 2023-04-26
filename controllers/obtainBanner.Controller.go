package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"io"
	"os"
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
	openFile, err := os.Open("uploads/banners/" + profile.Banner)
	if err != nil {
		return c.JSON(400, "image not found "+err.Error())
	}
	_, err = io.Copy(c.Response().Writer, openFile)
	if err != nil {
		return c.JSON(400, "error copying image "+err.Error())
	}
	return nil
}
