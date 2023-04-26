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
	update := bson.M{}
	addField := func(fieldName string, fieldValue interface{}) {
		if len(fieldValue.(string)) > 0 {
			update[fieldName] = fieldValue
		} else if !user.BirthDate.IsZero() {
			update["birthDate"] = user.BirthDate
		}
	}
	addField("name", user.Name)
	addField("lastName", user.LastName)
	addField("avatar", user.Avatar)
	addField("banner", user.Banner)
	addField("bio", user.Bio)
	addField("location", user.Location)
	addField("webSite", user.WebSite)
	updateString := bson.M{
		"$set": update,
	}
	objID, _ := primitive.ObjectIDFromHex(ID)
	filter := bson.M{"_id": bson.M{"$eq": objID}}
	_, err := col.UpdateOne(ctx, filter, updateString)
	if err != nil {
		return false, err
	}
	return true, nil
}
