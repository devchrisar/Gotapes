package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	jwt2 "github.com/devchrisar/Gotapes/jwt"
	"github.com/devchrisar/Gotapes/models"
	"github.com/labstack/echo/v4"
	"net/http"
	"time"
)

func LoginHandler(c echo.Context) error {
	c.Response().Header().Add("Content-Type", "application/json")
	var user models.User
	err := json.NewDecoder(c.Request().Body).Decode(&user)
	if err != nil {
		return c.String(400, "user or password is incorrect"+err.Error())
	}
	if len(user.Email) == 0 {
		return c.String(400, "email is required")
	}
	doc, exists := db.LoginAttempt(user.Email, user.Password)
	if !exists {
		return c.String(400, "user or password is incorrect")
	}
	jwt, err := jwt2.GenerateJWT(doc)
	if err != nil {
		return c.String(400, "An error occurred while trying to generate the token"+err.Error())
	}
	res := models.ResponseLogin{
		Token: jwt,
	}
	c.Response().Header().Set("Content-Type", "application/json")
	c.Response().WriteHeader(http.StatusCreated)
	json.NewEncoder(c.Response().Writer).Encode(res)
	expirationTime := time.Now().Add(24 * time.Hour)
	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = jwt
	cookie.Expires = expirationTime
	http.SetCookie(c.Response().Writer, cookie)
	return c.String(http.StatusOK, "")
}
