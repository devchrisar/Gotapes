package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

func FindUserByUsername(username string) (models.User, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	db := MongoC.Database("Gotapes")
	col := db.Collection("users")
	condition := bson.M{"username": username}
	opts := options.FindOne()
	user := models.User{}
	err := col.FindOne(ctx, condition, opts).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return user, false, nil
		}
		return user, false, err
	}
	return user, true, nil
}
