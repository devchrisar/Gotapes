package controllers

import (
	"errors"
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/golang-jwt/jwt"
	_ "github.com/joho/godotenv/autoload"
	"os"
	"strings"
)

var Email string
var Userid string

func ProcessToken(token string) (*models.Claim, bool, string, error) {
	secretKey := []byte(os.Getenv("SECRET_KEY"))
	claims := &models.Claim{}
	splitToken := strings.Split(token, "Bearer")
	if len(splitToken) != 2 {
		return claims, false, "", errors.New("invalid token")
	}
	token = strings.TrimSpace(splitToken[1])
	tokn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err == nil {
		_, found, _ := db.UserExists(claims.Email)
		if found {
			Email = claims.Email
			Userid = claims.ID.Hex()
		}
		return claims, found, Userid, nil
	}
	if !tokn.Valid {
		return claims, false, "", errors.New("invalid token")
	}
	return claims, false, "", err
}
