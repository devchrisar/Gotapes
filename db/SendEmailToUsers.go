package db

import (
	"encoding/base64"
	"github.com/go-gomail/gomail"
	"os"
)

func SendResetPasswordEmail(email, token string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := 465
	smtpUsername := os.Getenv("EMAIL_USER")
	smtpPassword := os.Getenv("EMAIL_PASS")
	appUrl := os.Getenv("APP_URL")
	encodedToken := base64.URLEncoding.EncodeToString([]byte(token))

	m := gomail.NewMessage()
	m.SetHeader("From", os.Getenv("EMAIL_USER"))
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Reset Password")
	m.SetBody("text/html", `
<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
	<title> Welcome to gotapes </title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<style type="text/css">
	  #outlook a {
		padding: 0;
	  }
  
	  body {
		margin: 0;
		padding: 0;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
	  }
  
	  table,
	  td {
		border-collapse: collapse;
		mso-table-lspace: 0pt;
		mso-table-rspace: 0pt;
	  }
  
	  img {
		border: 0;
		height: auto;
		line-height: 100%;
		outline: none;
		text-decoration: none;
		-ms-interpolation-mode: bicubic;
	  }
  
	  p {
		display: block;
		margin: 13px 0;
	  }
	</style>
	<link href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;500;600&amp;display=swap" rel="stylesheet" type="text/css" />
	<link href="https://fonts.googleapis.com/css2?family=Montserrat&amp;display=swap" rel="stylesheet" type="text/css" />
	<style type="text/css">
	  @import url(https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;500;600&amp;display=swap);
	  @import url(https://fonts.googleapis.com/css2?family=Montserrat&amp;display=swap);
	</style>
	<!--<![endif]-->
	<style type="text/css">
	  @media only screen and (min-width:480px) {
		.mj-column-per-100 {
		  width: 100% !important;
		  max-width: 100%;
		}
	  }
	</style>
	<style type="text/css">
	  @media only screen and (max-width:480px) {
		table.mj-full-width-mobile {
		  width: 100% !important;
		}
  
		td.mj-full-width-mobile {
		  width: auto !important;
		}
	  }
	</style>
	<style type="text/css">
	  a,
	  span,
	  td,
	  th {
		-webkit-font-smoothing: antialiased !important;
		-moz-osx-font-smoothing: grayscale !important;
	  }
	</style>
<style type="text/css">
	#outlook a {
	  padding: 0;
	}
  
	body {
	  margin: 0;
	  padding: 0;
	  -webkit-text-size-adjust: 100%;
	  -ms-text-size-adjust: 100%;
	}
  
	table,
	td {
	  border-collapse: collapse;
	  mso-table-lspace: 0pt;
	  mso-table-rspace: 0pt;
	}
  
	img {
	  border: 0;
	  height: auto;
	  line-height: 100%;
	  outline: none;
	  text-decoration: none;
	  -ms-interpolation-mode: bicubic;
	}
  
	p {
	  display: block;
	  margin: 13px 0;
	}
  
	/* Additional Styles */
	@media only screen and (max-width: 480px) {
	  td[class="lottie-responsive"] {
		max-width: 100% !important;
		width: auto !important;
	  }
  
	  td[class="lottie-padding"] {
		padding: 0px !important;
	  }
  
	  td[class="lottie-container"] {
		padding: 0px !important;
	  }
  
	  h1 {
		font-size: 30px !important;
		line-height: 40px !important;
	  }
	}
  </style>
  </head>
  
  <body style="background-color:#171919;">
	<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> Preview - Welcome to Coded Mails </div>
	<div style="background-color:#171919;">
	  <div style="margin:0px auto;max-width:600px;">
		<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
		  <tbody>
			<tr>
			  <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">
				<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
				  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
					<tbody><tr>
					  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
						<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
						  <tbody>
							<tr>
							  <td style="width:150px;">
								<img alt="Logo" height="auto" src="https://i.ibb.co/XCHP1W6/logo-Gotapes-Wt-png.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px;" width="150" />
							  </td>
							</tr>
						  </tbody>
						</table>
					  </td>
					</tr>
				  </tbody></table>
				</div>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
	  <div style="margin:0px auto;max-width:600px;">
		<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
		  <tbody>
			<tr>
			  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
				<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
				  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
					<tbody><tr>
					  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
						<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
						  <tbody>
							<tr>
								<td valign="top" class="pc-w520-padding-27-30-27-30 pc-w620-padding-32-35-32-35">
									<lottie-player class="lottie-responsive" src="https://assets1.lottiefiles.com/private_files/lf30_8shcjzzm.json" background="#171919" speed="1" style="background-size: cover; background-position: center; background-repeat: no-repeat; border-radius: 0px;" loop autoplay></lottie-player>
								</td>
							</tr>
						  </tbody>
						</table>
					  </td>
					</tr>
					<tr>
					  <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">
						<div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;line-height:24px;text-align:right;color:#dddddd;">
						  <p style="margin: 0;">Illustration by <a target="_blank" href="https://lottiefiles.com/96360-forgot-password-send-to-mail" style="color: #ffffff; text-decoration: none; font-weight: bold;">lottie</a></p>
						</div>
					  </td>
					</tr>
					<tr>
					  <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
						<div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#dddddd;">
						  <h1 style="margin: 0; font-size: 46px; line-height: 60px; font-weight: 600; font-family: 'Inknut Antiqua', Helvetica, Arial, sans-serif;">Reset Password</h1>
						</div>
					  </td>
					</tr>
					<tr>
					  <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
						<div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#dddddd;">
						  <p style="margin: 0;">We have received a request to reset your password for your Gotapes account. Please follow the instructions below to regain access to your account.</p>
						</div>
					  </td>
					</tr>
					<tr>
						<td valign="top">
							<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
								<tr>
									<td style="padding: 0px 0px 0px 0px">
										<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
											<tr>
												<td
													valign="top"
													class="pc-w520-padding-30-40-30-40 pc-w620-padding-35-50-35-50"
													style=" padding: 40px 60px 40px 60px; border-radius: 0px; background-color: #ffffff; "
													bgcolor="#ffffff"
												>
													<table class="pc-txt-block-wrapper" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td style="padding: 0px 0px 10px 0px" valign="top" align="center">
																<table class="pc-txt-block" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style=" margin-right: auto; margin-left: auto; ">
																	<tr>
																		<td
																			valign="top"
																			class="pc-font-alt"
																			style=" mso-line-height: exactly; line-height: 46px; letter-spacing: -0.6px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; color: #151515; text-align: center; text-align-last: center; "
																			align="center"
																		>
																		you have 30 minutes!
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
													<table class="pc-txt-block-wrapper" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td style="padding: 0px 0px 20px 0px" valign="top" align="center">
																<table class="pc-txt-block" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style=" margin-right: auto; margin-left: auto; ">
																	<tr>
																		<td
																			valign="top"
																			class="pc-font-alt"
																			style=" mso-line-height: exactly; line-height: 28px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; color: #1b1b1b; text-align: center; text-align-last: center; "
																			align="center"
																		>
																			<div><span>Visit the Gotapes password reset page by clicking on the following link:</span></div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
					</table>
					</td>
					</tr>
									<td valign="top" align="center">
										<table border="0" cellpadding="0" cellspacing="0" role="presentation" class="pc-hlist pc-w620-view-vertical">
											<tr>
												<th align="center" valign="top" style="font-weight: normal;">
													<a
													style=" border-radius: 8px; background-color: #1595e7; padding: 14px 18px 14px 18px; height: 24px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: -0.2px; color: #ffffff; display: inline-block; text-align: center; text-decoration: none; white-space: nowrap; -webkit-text-size-adjust: none;
														cursor: pointer; margin: 25px 25px;"
														href="`+appUrl+`/forgot-password/`+encodedToken+`">
														<span><span style=" white-space: pre-wrap; ">reset my password</span></span>
													</a>
												</th>
											</tr>
										</table>
									</td>
					</tr>
					<tr>
					  <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
						<div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#999999;">
						  <p style="margin: 0;">Please note that for security purposes, the password reset <b>link will expire after 30 minutes</b>. If you do not complete the process within the specified time, you will need to request a new password reset. <b>If you did not initiate this password reset request, please disregard this
							email and ensure the security of your Gotapes account</b>. For any further assistance or if you encounter any issues during the password reset
							process, please contact our support team at <b>christopherarias@hotmail.es</b>. We are available 24h to help you. Thank you for using Gotapes!
							Sincerely, The Gotapes Team.</p>
						</div>
					  </td>
					</tr>
				  </tbody></table>
				</div>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
	  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;">
		<tbody>
		  <tr>
			<td>
			  <div style="margin:0px auto;max-width:600px;">
				<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
				  <tbody>
					<tr>
					  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
						<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
						  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
							<tbody>
							<tr>
							  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
								<div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#999999;">Medellin, CO 055420</div>
							  </td>
							</tr>
							<tr>
							  <td style="font-size:0px;word-break:break-word;">
								<div style="height:20px;">   </div>
							  </td>
							</tr>
							<tr>
							  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
								<div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#999999;">Serve with ❤️ by our engineering team APEX Innovators (Ape-based Professional Engineering eXperts).</div>
							  </td>
							</tr>
						  </tbody></table>
						</div>
					  </td>
					</tr>
				  </tbody>
				</table>
			  </div>
			</td>
		  </tr>
		</tbody>
	  </table>
	</div>
	<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
  </body></html>
`)

	d := gomail.NewDialer(smtpHost, smtpPort, smtpUsername, smtpPassword)

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
