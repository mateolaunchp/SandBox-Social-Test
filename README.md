# Sandbox-Homepage

##AWS S3 CloudFront 

* ".html" has been removed from most files for prettier URLs, index.html and error.html are the exceptions. 

* After pushing changes, headers need to be added in "storage" --> "S3"

* Select the check box next to each html file with and without ".html" tag

* Select "Actions" --> "change metadata"

* Add "Content-Type": "text/html"

* Add "Content-Disposition": "inline"

* Save.

* Do this every push!


##SSLs for blog.sandboxcommerce.com & resources.sandboxcommerce.com

###Blog

* The blog is now a WordPress site hosted by AWS Lightsail.

* In Google Domains, "blog" is set as an alias (A) of the lightsail instance IP address.

* the SSL was secured with Let's Encrypt using these steps (without the wildcard since blog is s subdomain)
https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-using-lets-encrypt-certificates-with-wordpress

* Let's Encrypt will have to be updated regularly.
This script was used to auto-renew at 3:01 AM on the first of every month: 

```sudo crontab -e

1 3 * 1 * /home/bitnami/letsencrypt/letsencrypt-auto renew | sudo /opt/bitnami/ctlscript.sh restart```

###Resources

* Resources is hosted by intercom. 

* "resources.sandboxcommerce.com" is set as the domain here: https://app.intercom.io/a/apps/t7yys8wo/articles/site/settings

* The SSL was set up cloudfare using these instructions "How to configure SSL with AWS" and the attached video. 
Instructions under the video were especially crucial: "Foward Cookies": "ALL", and "Query String Forwarding and Caching": "Forward aLL, Cache Based on All" https://developers.intercom.com/installing-intercom/docs/set-up-your-custom-domain?showHidden=f2cb6

* Before using the cloudfare instructions, a cerificate was set up with the AWS Certificate manager for the subdomain. That certificate number is in Google Domains.

* After setting up Cloudfare, in Google Domains "resources" was set to the CNAME created by cloudfare. 