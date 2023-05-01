package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
)

func DeleteTweetHandler(c echo.Context) error {
	ID := c.QueryParam("id")
	if len(ID) < 1 {
		return c.JSON(400, "ID is required")
	}
	err := db.DeleteTweet(ID, Userid)
	if err != nil {
		return c.JSON(400, "error deleting tweet"+err.Error())
	}
	c.Response().Header().Set("Content-Type", "application/json")
	c.Response().WriteHeader(201)
	return c.JSON(201, "tweet deleted")
}
