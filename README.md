## Get Reddit Posts

A simple web page that consumes API exposed by Reddit to retrieve the newest posts about **Business** topic.

The page will show the posts found on following link, in batches of a fixed numeber of posts at a time.
http://www.reddit.com/r/business (non API version)

This is acheived by hitting the following API:
http://www.reddit.com/r/business.json
We send the 'limit' parameter to acheive batches of fixed size.

As documents can be added at any time in Reddit, pagination is not provided by Reddit. Instead, Reddit sends 'after', 'dist', 'before'
properties with each response.

While requesting the next batch of posts, parameters like 'after', 'before', 'limit' and 'count' are sent along with the request, 
to retrieve the appropriate posts.

