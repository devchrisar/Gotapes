package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/labstack/echo/v4"
)

func AlterProfile(c echo.Context) error {
	var user models.User
	err := json.NewDecoder(c.Request().Body).Decode(&user)
	if err != nil {
		return c.JSON(400, "incorrect data "+err.Error())
	}
	var status bool
	status, err = db.AlterRegister(user, Userid)
	if err != nil {
		return c.JSON(400, "error updating user "+err.Error())
	}
	if !status {
		return c.JSON(400, "could not update user")
	}
	return c.JSON(201, "user updated")
}
