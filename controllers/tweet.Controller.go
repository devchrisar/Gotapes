package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/labstack/echo/v4"
	"net/http"
	"time"
)

func Tweet(c echo.Context) error {

	var msg models.TweetMessage
	err := json.NewDecoder(c.Request().Body).Decode(&msg)
	if err != nil {
		return c.JSON(400, "error decoding tweet message "+err.Error())
	}
	register := models.Tweet{
		UserID:  Userid,
		Message: msg.Message,
		Date:    time.Now(),
	}
	err = db.PublishToQueue(register)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to publish tweet")
	}
	_, status, err := db.TweetInsertion(register)
	if err != nil {
		return c.JSON(400, "error inserting tweet "+err.Error())
	}
	if !status {
		return c.JSON(400, "could not insert tweet")
	}
	return c.JSON(201, "tweet inserted")
}
