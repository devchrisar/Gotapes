package controllers

import (
	"github.com/badoux/checkmail"
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"net/http"
	"os"
	"time"
)

func ForgotPassword(c echo.Context) error {
	identifier := c.FormValue("identifier")
	var user models.User
	var found bool
	var err error
	isEmail := checkmail.ValidateFormat(identifier) == nil

	if isEmail {
		user, found, err = db.FindUserByEmail(identifier)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"message": "internal server error",
			})
		}
		if !found {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"message": "user not found",
			})
		}
	} else {
		user, found, err = db.FindUserByUsername(identifier)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"message": "internal server error",
			})
		}
		if !found {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"message": "user not found",
			})
		}
	}

	resetToken, err := generateResetPasswordToken(user.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "error generating reset password token",
		})
	}

	err = db.SendResetPasswordEmail(user.Email, resetToken)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "error sending email" + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Email sent",
	})
}

func generateResetPasswordToken(email string) (string, error) {
	expiration := time.Now().Add(30 * time.Minute)

	claims := jwt.MapClaims{
		"email": email,
		"exp":   expiration.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	secretKey := []byte(os.Getenv("SECRET_KEY"))

	tokenStr, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenStr, nil
}
