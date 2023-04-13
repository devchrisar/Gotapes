package db

import "golang.org/x/crypto/bcrypt"

func EncryptPassword(password string) string {
	cost := 8
	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), cost)
	return string(bytes)
}
