package db

import (
	"context"
	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
)

var MongoC, _ = DBconn()
var clientOptions = options.Client().ApplyURI(os.Getenv("MONGO_URI"))

func DBconn() (*mongo.Client, error) {
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, err
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}
	log.Println("Connected to MongoDB")
	return client, nil
}

func CheckConnection() int {
	err := MongoC.Ping(context.TODO(), nil)
	if err != nil {
		return 0
	}
	return 1
}
