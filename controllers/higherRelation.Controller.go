package controllers

import (
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	"github.com/labstack/echo/v4"
)

func HigherRelation(c echo.Context) error {
	id := c.QueryParam("id")
	if len(id) < 1 {
		return c.String(400, "id is required")
	}
	var t models.Relation
	t.UserID = Userid
	t.UserRelationID = id
	status, err := db.InsertRelation(t)
	if err != nil {
		return c.String(400, "Error inserting relation"+err.Error())
	}
	if !status {
		return c.String(400, "Error inserting relation"+err.Error())
	}
	return c.NoContent(201)
}
