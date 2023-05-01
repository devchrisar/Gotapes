package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"strconv"
)

func ReadFollowersTweets(c echo.Context) error {
	if len(c.QueryParam("page")) < 1 {
		return c.JSON(400, "you must send the page parameter")
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil {
		return c.JSON(400, "you must send the page parameter as an integer greater than 0"+err.Error())
	}
	result, status := db.ReadFollowersTweets(Userid, int64(page))
	if !status {
		return c.JSON(400, "error reading tweets"+err.Error())
	}
	c.Response().Header().Set("Content-Type", "application/json")
	c.Response().WriteHeader(200)
	return json.NewEncoder(c.Response()).Encode(result)
}
