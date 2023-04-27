package models

type Relation struct {
	UserID         string `bson:"userid" json:"userid"`
	UserRelationID string `bson:"userrelationid" json:"userRelationID"`
}
