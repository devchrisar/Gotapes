package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

func CheckRelation(t models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	collection := MongoC.Database("Gotapes").Collection("association")
	condition := bson.M{
		"userid":         t.UserID,
		"userrelationid": t.UserRelationID,
	}
	var result models.Relation
	err := collection.FindOne(ctx, condition).Decode(&result)
	if err != nil {
		return false, err
	}
	return true, nil
}
