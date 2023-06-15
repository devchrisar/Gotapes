package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"math/rand"
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
	username := generateUniqueUsername(user.Name)
	user.Username = username
	user.CreatedAt = time.Now()
	result, err := col.InsertOne(ctx, user)
	if err != nil {
		return "", false, err
	}
	objID, _ := result.InsertedID.(string)
	return objID, true, nil
}

func generateUniqueUsername(name string) string {
	rand.Seed(time.Now().UnixNano())
	randomNumbers := strconv.Itoa(rand.Intn(9000) + 1000)
	stringArray := []string{"@", strings.ToLower(name[:5]), randomNumbers}
	username := strings.Join(stringArray, "")
	return username
}
