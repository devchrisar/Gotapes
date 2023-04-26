package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/labstack/echo/v4"
	"io"
	"os"
	"strings"
)

func UploadAvatar(c echo.Context) error {
	file, handlr, err := c.Request().FormFile("avatar")
	if err != nil {
		return c.JSON(400, "you must send an avatar "+err.Error())
	}
	var extension = strings.Split(handlr.Filename, ".")[1]
	var filename = "uploads/avatars/" + Userid + "." + extension
	f, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		return c.JSON(400, "error uploading avatar "+err.Error())
	}
	_, err = io.Copy(f, file)
	if err != nil {
		return c.JSON(400, "error copying avatar "+err.Error())
	}
	var user models.User
	var status bool
	user.Avatar = Userid + "." + extension
	status, err = db.AlterRegister(user, Userid)
	if err != nil || !status {
		return c.JSON(400, "error inserting avatar in db "+err.Error())
	}
	c.Response().Header().Set("Content-Type", "application/json")
	return c.JSON(201, "avatar uploaded")
}
