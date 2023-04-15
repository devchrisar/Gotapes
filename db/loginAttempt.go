package db

import (
	"github.com/devchrisar/Gotapes/models"
	"golang.org/x/crypto/bcrypt"
)

func LoginAttempt(email string, password string) (models.User, bool) {
	user, exists, _ := UserExists(email)
	if !exists {
		return user, false
	}
	passwordBytes := []byte(password)
	passwordDB := []byte(user.Password)
	err := bcrypt.CompareHashAndPassword(passwordDB, passwordBytes)
	if err != nil {
		return user, false
	}
	return user, true
}
