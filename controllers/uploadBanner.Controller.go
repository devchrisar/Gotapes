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

func UploadBanner(c echo.Context) error {
	cld, _ := cloudinary.NewFromParams(os.Getenv("CLOUD_NAME"), os.Getenv("CLOUD_KEY"), os.Getenv("CLOUD_SECRET_KEY"))
	file, _, err := c.Request().FormFile("banner")
	if err != nil {
		return c.JSON(400, "you must send a banner "+err.Error())
	}
	var fileWithExt = Userid
	resp, err := cld.Upload.Upload(context.Background(), file, uploader.UploadParams{
		PublicID: fileWithExt,
		Folder:   "Apex/Gotapes/uploads/banners/",
		Tags:     []string{"banner", "profile"},
	})
	if err != nil {
		return c.JSON(400, "error uploading avatar to cloudinary "+err.Error())
	}
	var user models.User
	var status bool
	user.Banner = resp.SecureURL
	status, err = db.AlterRegister(user, Userid)
	if err != nil || !status {
		return c.JSON(400, "error inserting banner in db "+err.Error())
	}
	c.Response().Header().Set("Content-Type", "application/json")
	return c.JSON(201, "banner uploaded")
}
