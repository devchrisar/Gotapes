package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CheckUsernameExists(username string) (bool, error) {
	db := MongoC.Database("Gotapes")
	col := db.Collection("users")
	condition := bson.M{"username": primitive.Regex{Pattern: "^" + username + "$", Options: "i"}}
	var user models.User
	err := col.FindOne(context.Background(), condition).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}
		return false, err
	}
	return true, nil
}
