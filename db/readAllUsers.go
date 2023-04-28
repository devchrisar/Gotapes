package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

var foundU, includeU bool

func ReadAllUsers(id string, page int64, search string, Type string) ([]*models.User, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	collection := MongoC.Database("Gotapes").Collection("users")
	var results []*models.User
	findOptions := options.Find()
	findOptions.SetSkip((page - 1) * 20)
	findOptions.SetLimit(20)
	findOptions.SetProjection(bson.M{
		"email":    0,
		"password": 0,
		"banner":   0,
		"bio":      0,
		"location": 0,
		"webSite":  0,
	})
	condition := bson.M{
		"name": bson.M{"$regex": `(?i)` + search},
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
		var relation models.Relation
		relation.UserID = id
		relation.UserRelationID = user.ID.Hex()
		includeU = false
		foundU, err := CheckRelation(relation)
		if Type == "new" && !foundU {
			includeU = true
		}
		if Type == "follow" && foundU {
			includeU = true
		}
		if relation.UserRelationID == id {
			includeU = false
		}
		if includeU {
			results = append(results, &user)
		}
	}
	err = cur.Err()
	if err != nil {
		return results, false
	}
	cur.Close(ctx)
	return results, true
}
