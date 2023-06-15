package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

func SearchUsers(search string) ([]*models.User, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	collection := MongoC.Database("Gotapes").Collection("users")
	var results []*models.User
	findOptions := options.Find()
	findOptions.SetProjection(bson.M{
		"email":    0,
		"password": 0,
		"banner":   0,
		"bio":      0,
		"location": 0,
		"webSite":  0,
	})
	condition := bson.M{
		"$or": []bson.M{
			{"name": bson.M{"$regex": `(?i)` + search}},
			{"username": bson.M{"$regex": `(?i)` + search}},
		},
	}
	cur, err := collection.Find(ctx, condition, findOptions)
	if err != nil {
		return results, false
	}
	for cur.Next(ctx) {
		var user models.User
		err := cur.Decode(&user)
		if err != nil {
			return nil, false
		}
		results = append(results, &user)
	}
	err = cur.Err()
	if err != nil {
		return results, false
	}
	cur.Close(ctx)
	return results, true
}
