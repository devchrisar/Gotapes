package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"time"
)

func InsertUser(user models.User) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	db := MongoC.Database("Gotapes")
	col := db.Collection("users")
	user.Password = EncryptPassword(user.Password)
	user.CreatedAt = time.Now()
	result, err := col.InsertOne(ctx, user)
	if err != nil {
		return "", false, err
	}
	objID, _ := result.InsertedID.(string)
	return objID, true, nil
}
