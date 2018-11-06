This is a simple microservice for fonts used on minted websites.
You can get the .otf font file at
```
/<font-name>/<modifier?>/<weight>.woff
ex:
/brandon-grotesque/700.woff
/brandon-grotesque/italic/700.woff
```

the font service is cached on the cdn at https://minted-fonts.mintedcdn.net

you can hit the service directly at fonts-service.minted.com (don't do this in production)

### Deploy

https://jenkins-k8.mntd.net/job/main/job/minted-kubernetes/job/jobs/job/prod-dfw/job/fonts-deploy/


### License
```
/*!
 * @license
 * MyFonts Webfont Build ID 2863306, 2014-08-14T14:49:27-0400
 *
 * The fonts listed in this notice are subject to the End User License
 * Agreement(s) entered into by the website owner. All other parties are
 * explicitly restricted from using the Licensed Webfonts(s).
 *
 * You may obtain a valid license at the URLs below.
 *
 * Webfont: Brandon Grotesque Regular by HVD Fonts
 * URL: http://www.myfonts.com/fonts/hvdfonts/brandon-grotesque/regular/
 *
 * Webfont: Brandon Grotesque Light by HVD Fonts
 * URL: http://www.myfonts.com/fonts/hvdfonts/brandon-grotesque/light/
 *
 * Webfont: Brandon Grotesque Bold by HVD Fonts
 * URL: http://www.myfonts.com/fonts/hvdfonts/brandon-grotesque/bold/
 *
 *
 * License: http://www.myfonts.com/viewlicense?type=web&buildid=2863306
 * Licensed pageviews: 50,000,000
 * Webfonts copyright: Copyright (c) 2009 by Hannes von Doehren. All rights reserved.
 *
 *  2014 MyFonts Inc
 */
```
