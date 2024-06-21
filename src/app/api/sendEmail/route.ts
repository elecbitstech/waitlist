import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";

function clientEmailTitle(name: string) {
  return `
  Congratulations <strong>${name}!</strong> Your Priority Access Confirmed`
}

function emailTitle() {
  return `
  We've a new signup on the waitlist!`
}

function clientBody() {
  return `
  <div style="font-size: 12px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;"><span style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span>
      <span
        style="color: #ffffff; line-height: 16.8px;">This email confirms your spot on the waitlist. As a valued member, you'll get early access to the platform as soon as we go live.
        </span>
    </p>
    <p style="line-height: 140%;"><br><span style="color: #ffffff; line-height: 16.8px;">Be on top of all the updates regarding the launch date and other exciting news.</span><br><span style="color: #ffffff; line-height: 16.8px;">In the meantime, if you have any queries, please reach out to us.</span></p>
  </div>`
}

function adminBody(name:string, email: string, phone: number, organizationName: string, designation: string) {
  return `
  <div style="font-size: 12px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;"><span style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span>
      <span
        style="color: #ffffff; line-height: 16.8px;">Here are the details for the new signup:
        </span>
    </p>
    <p style="line-height: 140%;"><br><span style="color: #ffffff; line-height: 16.8px;">
    Name: ${name}<br>
    Email: ${email}<br>
    Phone: ${phone}<br>
    Organization: ${organizationName}<br>
    Designation: ${designation}
    </span><br></p>
  </div>`
}

function getEmailTemplate(title: string, body: string) {
  return `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
      <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title></title>

      <style type="text/css">
        @media only screen and (min-width: 520px) {
          .u-row {
            width: 500px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
          .u-row .u-col-50 {
            width: 250px !important;
          }
          .u-row .u-col-100 {
            width: 500px !important;
          }
        
            .box1 {
            border-left:20px solid #222222;
          }
          .box2 {
            border-right:20px solid #222222;
          }
          .lcontainer {
          padding: 0px 0px 0px 120px;
          }
        }
        
        @media (max-width: 520px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col>div {
            margin: 0 auto;
          }
          .box1 {
            border-left:0px;
          }
          .box2 {
            border-right:0px;
          }
          .lcontainer {
            padding: 0px;
          }
          .bgsection {
            background-size:cover;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table,
        td {
          color: #000000;
        }
        
        #u_body a {
          color: #0000ee;
          text-decoration: underline;
        }
      </style>



    </head>

    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->



              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #222222;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                      <div style="background-color: #222222;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>





              <!--[if gte mso 9]>
          <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 500px;">
            <tr>
              <td background="https://assets.unlayer.com/projects/236357/1718341502262-backgraound%20-%20launch.png" valign="top" width="100%">
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 500px;">
            <v:fill type="frame" src="https://assets.unlayer.com/projects/236357/1718341502262-backgraound%20-%20launch.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
          <![endif]-->

              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('https://assets.unlayer.com/projects/236357/1718341502262-backgraound%20-%20launch.png');background-repeat: repeat;background-position: center center;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-image: url('https://assets.unlayer.com/projects/236357/1718341502262-backgraound%20-%20launch.png');background-repeat: no-repeat;background-position: center center;background-color: #ffffff;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="460" style="width: 460px;padding: 0px;border-top: 0px solid transparent;border-left: 20px solid #222222;border-right: 20px solid #222222;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 20px solid #222222;border-right: 20px solid #222222;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:42px 10px 141px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><strong><span style="color: #ffffff; line-height: 16.8px;">LAUNCHING SOON</span></strong></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 9px 40px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">

                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/236357/1718720559929-Elecbits%20XOR.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 75%;max-width: 369px;"
                                          width="369" />

                                      </td>
                                    </tr>
                                  </table>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>

              <!--[if gte mso 9]>
          </v:textbox></v:rect>
        </td>
        </tr>
        </table>
        <![endif]-->





              <!--[if gte mso 9]>
          <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 500px;">
            <tr>
              <td background="https://assets.unlayer.com/projects/236357/1718344334747-TEXT%20BG.png" valign="top" width="100%">
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 500px;">
            <v:fill type="frame" src="https://assets.unlayer.com/projects/236357/1718344334747-TEXT%20BG.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
          <![endif]-->

              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('https://assets.unlayer.com/projects/236357/1718344334747-TEXT%20BG.png');background-repeat: no-repeat;background-position: center center;background-color: transparent;background-size:cover">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-image: url('https://assets.unlayer.com/projects/236357/1718344334747-TEXT%20BG.png');background-repeat: no-repeat;background-position: center center;background-color: transparent;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="460" style="width: 460px;padding: 0px;border-top: 20px solid #222222;border-left: 20px solid #222222;border-right: 20px solid #222222;border-bottom: 20px solid #222222;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 20px solid #222222;border-left: 20px solid #222222;border-right: 20px solid #222222;border-bottom: 20px solid #222222;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:9px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 19.6px;"></span><span style="line-height: 19.6px;"></span><span style="line-height: 19.6px; color: #ffffff;">${title}</span></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>

              <!--[if gte mso 9]>
          </v:textbox></v:rect>
        </td>
        </tr>
        </table>
        <![endif]-->





              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #222222;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                      <div style="background-color: #222222;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 22px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  ${body}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:16px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #434343;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <span>&#160;</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>





              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #222222;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                      <div style="background-color: #222222;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 16px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 22.4px;"></span><span style="line-height: 22.4px;"></span><strong><span style="line-height: 22.4px; color: #ffffff;">Stay tuned for further updates.</span></strong></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:16px 10px 15px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #434343;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <span>&#160;</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>





              <!--[if gte mso 9]>
          <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 500px;">
            <tr>
              <td background="https://assets.unlayer.com/projects/236357/1718345936208-Screenshot%202024-06-14%20at%2011.41.46%201.png" valign="top" width="100%">
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 500px;">
            <v:fill type="frame" src="https://assets.unlayer.com/projects/236357/1718345936208-Screenshot%202024-06-14%20at%2011.41.46%201.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
          <![endif]-->

              <div class="u-row-container bgsection" style="padding: 0px;background-image: url('https://assets.unlayer.com/projects/236357/1718345936208-Screenshot%202024-06-14%20at%2011.41.46%201.png');background-repeat: no-repeat;background-position: center center;background-color: transparent"  >
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('https://assets.unlayer.com/projects/236357/1718345936208-Screenshot%202024-06-14%20at%2011.41.46%201.png');background-repeat: no-repeat;background-position: center center;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="230" style="width: 230px;padding: 0px;border-top: 0px solid transparent;border-left: 20px solid #222222;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" class="box1" >
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:26px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span>
                                      <span
                                        style="color: #ffffff; line-height: 16.8px;"><strong><span style="line-height: 16.8px;">Real-Time Sourcing</span></strong></span>
                                    </p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:1px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span>
                                      <span
                                        style="color: #ffffff; line-height: 16.8px;">Get instant quotes from 4000+ </span>
                                    </p>
                                    <p style="line-height: 140%;"><span style="color: #ffffff; line-height: 16.8px;">vendors &amp; slash procurement time.</span></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span  style="line-height: 16.8px; background-color: #000000;"></span>
                                      <span
                                        style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span>
                                        <span
                                          style="color: #ffffff; line-height: 16.8px;"><strong><span style="line-height: 16.8px;">One-Stop Shop</span></strong></span>
                                    </p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 26px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 16.8px;" ></span><span style="line-height: 16.8px;"
                                        ></span><span style="line-height: 16.8px;"></span>
                                      <span
                                        style="color: #ffffff; line-height: 16.8px;">Simplify everything. Manage </span>
                                    </p>
                                    <p style="line-height: 140%;"><span style="color: #ffffff; line-height: 16.8px;">components, quotes, &amp; delivery </span></p>
                                    <p style="line-height: 140%;"><span style="color: #ffffff; line-height: 16.8px;">from a single platform.</span></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="230" style="width: 230px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 20px solid #222222;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" class="box2" >

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:26px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span><span 
                                        style="line-height: 16.8px;"></span><strong><span style="color: #ffffff; line-height: 16.8px;">Quality Assurance</span></strong></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:1px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span ></span><span
                                        style="line-height: 16.8px;"></span><span 
                                        style="line-height: 16.8px;"></span><span style="color: #ffffff; line-height: 16.8px;">Get authentic products with ‘zero defects’ following top-tier standards.</span></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 16.8px; background-color: #000000;"></span>
                                      <span
                                        style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span><strong><span style="color: #ffffff; line-height: 16.8px;">Effortless Delivery</span></strong></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 26px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 12px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span><span style="line-height: 16.8px;"></span><span style="color: #ffffff; line-height: 16.8px;">Focus on your business, </span><br><span style="color: #ffffff; line-height: 16.8px;">EB XOR handles the rest.</span></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>

              <!--[if gte mso 9]>
          </v:textbox></v:rect>
        </td>
        </tr>
        </table>
        <![endif]-->





              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #222222;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                      <div style="background-color: #222222;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:18px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #434343;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <span>&#160;</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>





              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #222222;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #222222;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <a href="https://www.elecbits.in" target="_blank">
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/236357/1718346472202-Logo.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 76%;max-width: 174.8px;"
                                          width="174.8" />
                                      </a>
                                      </td>
                                    </tr>
                                  </table>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px 0px 0px 120px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" class="lcontainer" >
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                        <a href="https://www.linkedin.com/company/elecbits/" target="_blank">
                                          <img align="center" border="0" src="https://assets.unlayer.com/projects/236357/1718346715345-LinkedIn.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 41px;"
                                            width="41" />
                                        </a>
                                      </td>
                                    </tr>
                                  </table>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:2px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 10px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="color: #ffffff; line-height: 14px;">Get Connected</span></p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>





              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #222222;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                      <div style="background-color: #222222;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:18px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #434343;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <span>&#160;</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>





              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #222222;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #222222;"><![endif]-->

                    <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->

                          <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 15px;font-family:arial,helvetica,sans-serif;" align="left">

                                  <div style="font-size: 9px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;"><span style="line-height: 12.6px;"></span><span style="line-height: 12.6px;"></span>
                                      <span
                                        style="color: #ffffff; line-height: 12.6px;">©️ 2024 Elecbits, Elecbits and the Elecbits logo are registered trademarks of Elecbits Technologies Private Limited.</span>
                                    </p>
                                    <p style="line-height: 140%;"><span style="color: #ffffff; line-height: 12.6px;"><span style="line-height: 12.6px;"></span>
                                      <span style="line-height: 12.6px;"></span>Address: NASSCOM CoE loT &amp; Al Hartron Innovation Hub, Plot 1, Udyog Vihar Phase 1, Gurugram, Haryana 122016.</span>
                                    </p>
                                  </div>

                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>



              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    </html>
  `
}

async function sendEmail(transporter:nodemailer.Transporter, recipientEmail:string, emailContent:string) {
  let mailOptions = {
    from: {
      name: "Elecbits Platform",
      address: "platform@elecbits.in",
    },
    to: recipientEmail,
    subject: "Signup Confirmation",
    html: emailContent,
  };

  await transporter.sendMail(mailOptions);
}


export async function POST(req: NextRequest) {
  try {
    const { email, name, phoneNumber, organizationName, designation } =
      await req.json();

    const admins = [
      "manmeet.singh@elecbits.in",
      "harsh.saini@elecbits.in",
      "vaishnavi@elecbits.in"
    ];

    let emailList: string[]  = ["elecbits16@gmail.com"];

    let transporter = nodemailer.createTransport({
      host: "smtp.zeptomail.com",
      port: 465,
      auth: {
        user: "emailapikey",
        pass: process.env.MAIL_PASS,
      },
    });

    const client = {
      title: clientEmailTitle(name),
      body: clientBody()
    }

    const clientEmailContent = getEmailTemplate(client.title, client.body);

    await sendEmail(transporter, email, clientEmailContent);

    const admin = {
      title: emailTitle(),
      body: adminBody(name,email,phoneNumber,organizationName,designation)
    }

    const emailContent = getEmailTemplate(admin.title, admin.body);


    setImmediate(async () => {
      for (const recipientEmail of emailList) {
        if (recipientEmail === "elecbits16@gmail.com") {
          for (const admin of admins) {
            await sendEmail(transporter, admin, emailContent);
          }
        }
        if (recipientEmail !== email) {
          await sendEmail(transporter, recipientEmail, emailContent);
        }
      }
    });

    // for (const recipientEmail of emailList) {
    //   if (recipientEmail === "elecbits16@gmail.com") {
    //     for (const admin of admins) {
    //       console.log(`recipient: ${admin}`)
    //       await sendEmail(transporter, admin, emailContent);
    //     }
    //   }
    //   console.log(`recipient: ${recipientEmail}`)
    //   await sendEmail(transporter, recipientEmail, emailContent);
    // }

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error sending email" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
