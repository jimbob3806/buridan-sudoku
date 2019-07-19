# Notes on ./public usage

## manifest.json
The **theme_color**  value dictates the color of the toolbar in a PWA, and the 
color of the url bar (or whatever you want to call it!) in an appropriate
browser.

The **background_color** value actually dictates the color of the splashscreen
or loading screen in a PWA. Hence why it can be non-white without looking 
stupid!

## robots.txt
Parts of site disallowed (in order they appear in the robots.txt file):
* Authenticated users pages (except blog, which conditionally renders
premium and free content depending on subscription status)
* Callback page(s)
* Error pages, such as 400 /badRequest etc.

#### robot.txt guide of available values:
* User-agent: The specific web crawler to which you’re giving crawl 
instructions (usually a search engine). A list of most user agents can be 
found here.
* Disallow: The command used to tell a user-agent not to crawl particular 
URL. Only one "Disallow:" line is allowed for each URL.
* Allow (Only applicable for Googlebot): The command to tell Googlebot it 
can access a page or subfolder even though its parent page or subfolder may 
be disallowed.
* Crawl-delay: How many seconds a crawler should wait before loading and 
crawling page content. Note that Googlebot does not acknowledge this 
command, but crawl rate can be set in Google Search Console (just google
"google search console", and navigate to your account to find out more).
* Sitemap: Used to call out the location of any XML sitemap(s) associated 
with this URL. Note this command is only supported by Google, Ask, Bing, 
and Yahoo.

#### robots.txt pattern matching
 * \* character is a wildcard that represents any sequence of characters
 * $ character matches the end of the URL
* Find out more here (https://support.google.com/webmasters/answer/6062596?hl=en) 
and here (https://moz.com/learn/seo/robotstxt)

## sitemap.xml

* Find out more here (https://www.sitemaps.org/protocol.html)