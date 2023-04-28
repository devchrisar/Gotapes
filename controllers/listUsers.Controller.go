package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	"github.com/labstack/echo/v4"
	"strconv"
)

func ListUsers(c echo.Context) error {
	typeUser := c.QueryParam("type")
	page := c.QueryParam("page")
	search := c.QueryParam("search")
	pagTemp, err := strconv.Atoi(page)
	if err != nil {
		return c.JSON(400, "you must send the page parameter as an integer greater than 0"+err.Error())
	}
	pag := int64(pagTemp)
	result, status := db.ReadAllUsers(Userid, pag, search, typeUser)
	if !status {
		return c.JSON(400, "error reading users"+err.Error())
	}
	c.Response().Header().Set("Content-Type", "application/json")
	c.Response().WriteHeader(200)
	return json.NewEncoder(c.Response()).Encode(result)
}
