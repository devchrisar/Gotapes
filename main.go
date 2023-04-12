package main

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/handlers"
	_ "github.com/joho/godotenv/autoload"
	"log"
)

func main() {
	if db.CheckConnection() == 0 {
		log.Fatal("No connection to the database")
		return
	}
	handlers.Handlers()
}
