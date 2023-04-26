package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/labstack/echo/v4"
	"io"
	"os"
	"path/filepath"
)

func UploadBanner(c echo.Context) error {
	file, handlr, err := c.Request().FormFile("banner")
	if err != nil {
		return c.JSON(400, "you must send a banner "+err.Error())
	}
	var extension = filepath.Ext(handlr.Filename)
	var filename = "uploads/banners/" + Userid + extension
	f, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		return c.JSON(400, "error uploading banner "+err.Error())
	}
	_, err = io.Copy(f, file)
	if err != nil {
		return c.JSON(400, "error copying banner "+err.Error())
	}
	var user models.User
	var status bool
	user.Banner = Userid + extension
	status, err = db.AlterRegister(user, Userid)
	if err != nil || !status {
		return c.JSON(400, "error inserting banner in db "+err.Error())
	}
	c.Response().Header().Set("Content-Type", "application/json")
	return c.JSON(201, "banner uploaded")
}
