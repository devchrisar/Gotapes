package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func RegisterHandler(c echo.Context) error {
	var t models.User
	err := json.NewDecoder(c.Request().Body).Decode(&t)
	if err != nil {
		return c.String(400, "Error in the request"+err.Error())
	}
	if len(t.Email) == 0 {
		return c.String(400, "Email is required")
	}
	if len(t.Password) < 6 && !t.GoogleSignUp {
		return c.String(400, "Password is required")
	}
	_, found, _ := db.UserExists(t.Email)
	if found {
		return c.String(400, "User already exists")
	}
	_, status, err := db.InsertUser(t)
	if err != nil {
		return c.String(400, "An error occurred while trying to register the user"+err.Error())
	}
	if !status {
		return c.String(400, "User could not be registered")
	}
	return c.String(http.StatusCreated, "")
}
