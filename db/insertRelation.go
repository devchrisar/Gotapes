package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"time"
)

func InsertRelation(t models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	collection := MongoC.Database("Gotapes").Collection("association")
	_, err := collection.InsertOne(ctx, t)
	if err != nil {
		return false, err
	}
	return true, nil
}
