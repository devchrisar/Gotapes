package jwt

import (
	"github.com/devchrisar/Gotapes/models"
	"github.com/golang-jwt/jwt/v5"
	_ "github.com/joho/godotenv/autoload"
	"os"
	"time"
)

func GenerateJWT(user models.User) (string, error) {
	secretKey := []byte(os.Getenv("SECRET_KEY"))
	payload := jwt.MapClaims{
		"email":     user.Email,
		"name":      user.Name,
		"lastName":  user.LastName,
		"BirthDate": user.BirthDate,
		"Bio":       user.Bio,
		"location":  user.Location,
		"website":   user.WebSite,
		"avatar":    user.Avatar,
		"_id":       user.ID.Hex(),
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenStr, err := token.SignedString(secretKey)
	if err != nil {
		return tokenStr, err
	}
	return tokenStr, nil
}
