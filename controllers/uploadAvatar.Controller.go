package controllers

import (
	"context"
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/devchrisar/Gotapes/db"
	"github.com/devchrisar/Gotapes/models"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo/v4"
	"os"
)

func UploadAvatar(c echo.Context) error {
	cld, _ := cloudinary.NewFromParams(os.Getenv("CLOUD_NAME"), os.Getenv("CLOUD_KEY"), os.Getenv("CLOUD_SECRET_KEY"))
	file, _, err := c.Request().FormFile("avatar")
	if err != nil {
		return c.JSON(400, "you must send an avatar "+err.Error())
	}
	var fileWithExt = Userid
	resp, err := cld.Upload.Upload(context.Background(), file, uploader.UploadParams{
		PublicID:       fileWithExt,
		Folder:         "Apex/Gotapes/uploads/avatars/",
		Tags:           []string{"avatar", "profile"},
		Transformation: "c_fill,g_face",
	})
	if err != nil {
		return c.JSON(400, "error uploading avatar to cloudinary "+err.Error())
	}
	var user models.User
	var status bool
	user.Avatar = resp.SecureURL
	status, err = db.AlterRegister(user, Userid)
	if err != nil || !status {
		return c.JSON(400, "error inserting avatar in db "+err.Error())
	}
	c.Response().Header().Set("Content-Type", "application/json")
	return c.JSON(201, "avatar uploaded")
}
