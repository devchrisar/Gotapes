package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"time"
)

func DeleteRelation(t models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	collection := MongoC.Database("Gotapes").Collection("association")
	_, err := collection.DeleteOne(ctx, t)
	if err != nil {
		return false, err
	}
	return true, nil
}
