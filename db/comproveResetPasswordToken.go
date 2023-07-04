package db

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"time"
)

func VerifyResetPasswordToken(token string) (string, error) {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Invalid signing algorithm")
		}
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil {
		return "", err
	}

	if !parsedToken.Valid {
		return "", errors.New("Invalid token")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("Invalid token claims")
	}

	email, ok := claims["email"].(string)
	if !ok {
		return "", errors.New("Invalid email in token claims")
	}

	expirationTime := time.Unix(int64(claims["exp"].(float64)), 0)
	if time.Now().After(expirationTime) {
		return "", errors.New("Expired token")
	}

	return email, nil
}
