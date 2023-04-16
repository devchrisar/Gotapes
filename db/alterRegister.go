package db

import (
	"context"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

func AlterRegister(user models.User, ID string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	db := MongoC.Database("Gotapes")
	col := db.Collection("users")
	register := make(map[string]interface{})
	if len(user.Name) > 0 {
		register["name"] = user.Name
	}
	if len(user.LastName) > 0 {

		register["lastName"] = user.LastName
	}
	register["birthDate"] = user.BirthDate
	if len(user.Avatar) > 0 {
		register["avatar"] = user.Avatar
	}
	if len(user.Banner) > 0 {
		register["banner"] = user.Banner
	}
	if len(user.Bio) > 0 {
		register["bio"] = user.Bio
	}
	if len(user.Location) > 0 {
		register["location"] = user.Location
	}
	if len(user.WebSite) > 0 {
		register["webSite"] = user.WebSite
	}
	updateString := bson.M{
		"$set": register,
	}
	objID, _ := primitive.ObjectIDFromHex(ID)
	filter := bson.M{"_id": bson.M{"$eq": objID}}
	_, err := col.UpdateOne(ctx, filter, updateString)
	if err != nil {
		return false, err
	}
	return true, nil
}
