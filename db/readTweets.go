package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

func ReadTweetsHandler(ID string, page int64) ([]*models.ReturnTweet, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	collection := MongoC.Database("Gotapes").Collection("tweets")
	var result []*models.ReturnTweet
	condition := bson.M{
		"userid": ID,
	}
	opt := options.Find()
	opt.SetLimit(20)
	opt.SetSort(bson.D{{Key: "date", Value: -1}})
	opt.SetSkip((page - 1) * 20)
	cursor, err := collection.Find(ctx, condition, opt)
	if err != nil {
		return result, false
	}
	for cursor.Next(context.TODO()) {
		var register models.ReturnTweet
		err := cursor.Decode(&register)
		if err != nil {
			return result, false
		}
		result = append(result, &register)
	}
	return result, true
}
