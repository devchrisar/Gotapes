package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

func ReadFollowersTweets(ID string, page int64) ([]*models.FollowersTweets, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	collection := MongoC.Database("Gotapes").Collection("association")
	skip := (page - 1) * 20
	condition := make([]bson.M, 0)
	condition = append(condition, bson.M{"$match": bson.M{"userid": ID}})
	condition = append(condition, bson.M{
		"$lookup": bson.M{
			"from":         "tweets",
			"localField":   "userrelationid",
			"foreignField": "userid",
			"as":           "tweet",
		}})
	condition = append(condition, bson.M{"$unwind": "$tweet"})
	condition = append(condition, bson.M{"$sort": bson.M{"date": -1}})
	condition = append(condition, bson.M{"$skip": skip})
	condition = append(condition, bson.M{"$limit": 20})
	cur, err := collection.Aggregate(ctx, condition)
	var result []*models.FollowersTweets
	err = cur.All(ctx, &result)
	if err != nil {
		return result, false
	}
	return result, true
}
