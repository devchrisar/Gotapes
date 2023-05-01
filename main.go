package main

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/handlers"
	_ "github.com/joho/godotenv/autoload"
	"log"
)

func main() {
	client, err := db.DBconn()
	if err != nil {
		log.Fatal(err.Error())
	}
	db.MongoC = client
	if db.CheckConnection() == 0 {
		log.Fatal("No connection to the database")
		return
	}
	handlers.Handlers()
}
