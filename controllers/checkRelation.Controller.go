package controllers

import (
	"encoding/json"
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/labstack/echo/v4"
)

func CheckRelation(c echo.Context) error {
	id := c.QueryParam("id")
	var t models.Relation
	t.UserID = Userid
	t.UserRelationID = id
	var resp models.CheckResponseRelation
	status, err := db.CheckRelation(t)
	if err != nil || !status {
		resp.Status = false
	} else {
		resp.Status = true
	}
	c.Response().Header().Set("Content-Type", "application/json")
	c.Response().WriteHeader(200)
	return json.NewEncoder(c.Response()).Encode(resp)
}
