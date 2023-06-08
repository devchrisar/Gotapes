package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type ReturnTweet struct {
	ID      primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	UserID  string             `bson:"userid" json:"userId,omitempty"`
	Message string             `bson:"message" json:"message,omitempty"`
	GIFurl  string             `bson:"gifUrl,omitempty" json:"gifUrl,omitempty"`
	Date    time.Time          `bson:"date" json:"date,omitempty"`
}
