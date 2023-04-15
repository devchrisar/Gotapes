package db

import (
	"context"
	"fmt"
	"github.com/devchrisar/Gotapes/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

func SeekProfile(ID string) (models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	db := MongoC.Database("Gotapes")
	col := db.Collection("users")
	var user models.User
	objID, _ := primitive.ObjectIDFromHex(ID)
	condition := bson.M{"_id": objID}
	err := col.FindOne(ctx, condition).Decode(&user)
	user.Password = ""
	if err != nil {
		fmt.Println("User not found" + err.Error())
		return user, err
	}
	return user, nil
}
