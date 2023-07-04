package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"net/http"
)

func NewPasswordHandler(c echo.Context) error {
	token := c.QueryParam("token")
	if token == "" {
		return c.JSON(http.StatusBadRequest, "Token is required")
	}

	email, err := db.VerifyResetPasswordToken(token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid or expired token")
	}

	newPassword := c.FormValue("password")
	if newPassword == "" {
		return c.JSON(http.StatusBadRequest, "Password is required")
	}

	user, found, err := db.FindUserByEmail(email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "An error occurred while trying to find the user: "+err.Error())
	}
	if !found {
		return c.JSON(http.StatusBadRequest, "User not found")
	}

	success, err := db.UpdateUserPassword(user, newPassword)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "An error occurred while trying to change the password: "+err.Error())
	}
	if !success {
		return c.JSON(http.StatusBadRequest, "Password could not be changed")
	}

	return c.JSON(http.StatusOK, "Password successfully changed")
}
