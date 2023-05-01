package models

import "time"

type FollowersTweets struct {
	ID             string `bson:"_id" json:"_id,omitempty"`
	UserRelationID string `bson:"userrelationid" json:"userrelationid,omitempty"`
	UserID         string `bson:"userid" json:"userid,omitempty"`
	Tweet          struct {
		Message string    `bson:"message" json:"message,omitempty"`
		Date    time.Time `bson:"date" json:"date,omitempty"`
		ID      string    `bson:"_id" json:"_id,omitempty"`
	}
}
