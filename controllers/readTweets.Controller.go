package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"strconv"
)

func ReadTweets(c echo.Context) error {
	ID := c.QueryParam("id")
	if len(ID) < 1 {
		return c.JSON(400, "ID is required")
	}
	if len(c.QueryParam("page")) < 1 {
		return c.JSON(400, "page is required")
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil {
		return c.JSON(400, "page must be a number")
	}
	pageTo64 := int64(page)
	res, status := db.ReadTweetsHandler(ID, pageTo64)
	if !status {
		return c.JSON(400, "error reading tweets")
	}
	c.Response().Header().Set("Content-Type", "application/json")
	c.Response().WriteHeader(200)
	return json.NewEncoder(c.Response()).Encode(res)
}
