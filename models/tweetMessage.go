package models

type TweetMessage struct {
	Message string `bson:"message" json:"message"`
}
