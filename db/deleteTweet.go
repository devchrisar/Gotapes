package db

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

func DeleteTweet(ID string, UserID string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	collection := MongoC.Database("Gotapes").Collection("tweets")
	objID, _ := primitive.ObjectIDFromHex(ID)
	condition := bson.M{
		"_id":    objID,
		"userid": UserID,
	}
	_, err := collection.DeleteOne(ctx, condition)
	return err
}
