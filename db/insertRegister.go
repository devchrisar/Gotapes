package db

import (
	"context"
	"crypto/rand"
	"encoding/binary"
	"github.com/devchrisar/Gotapes/models"
	"strconv"
	"strings"
	"time"
)

func InsertUser(user models.User) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	db := MongoC.Database("Gotapes")
	col := db.Collection("users")
	user.Password = EncryptPassword(user.Password)
	username, err := generateUniqueUsername(user.Name)
	if err != nil {
		return "", false, err
	}
	user.Username = username
	user.CreatedAt = time.Now()
	result, err := col.InsertOne(ctx, user)
	if err != nil {
		return "", false, err
	}
	objID, _ := result.InsertedID.(string)
	return objID, true, nil
}

func generateUniqueUsername(name string) (string, error) {
	randomBytes := make([]byte, 4)
	_, err := rand.Read(randomBytes)
	if err != nil {
		return "", err
	}
	randomNumbers := strconv.Itoa(int(binary.BigEndian.Uint32(randomBytes)%9000 + 1000))
	stringArray := []string{"@", strings.ToLower(name[:5]), randomNumbers}
	username := strings.Join(stringArray, "")
	return username, nil
}
