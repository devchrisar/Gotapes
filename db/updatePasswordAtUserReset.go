package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

func UpdateUserPassword(user models.User, newPassword string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoC.Database("Gotapes")
	col := db.Collection("users")

	filter := bson.M{"email": user.Email}

	update := bson.M{"$set": bson.M{"password": EncryptPassword(newPassword)}}

	result, err := col.UpdateOne(ctx, filter, update)
	if err != nil {
		return false, err
	}

	if result.ModifiedCount == 1 {
		return true, nil
	}

	return false, nil
}
