# MSTeamsProxy

A stub to send MS teams notifications via the internal proxy. This is so internal users can push notification cards to Teams in a simple way, a one-liner in Powershell, and not have to wory about proxy authentication, or assembling the whole call.

First thing I've ever written in Node.js, any advice on what's right/wrong is much appreciated.

QUICK START
Unzip the package, change the line in the api/controllers/TeamControllers.js to refer to your particular proxy
const proxy = 'http://proxy:8080';
and start with "node server.js"

But if you want more...
If you want to use https, create a subfolder called "keys" and place them in there. Refer to the server.js file for indications as to what they should contain. If you don't want to use HTTPS, then comment these lines out from server.js

    https = require("https"),
    ....
    server_options = {
        key : fs.readFileSync(keys_dir + 'teamsnodeprivkey.pem'),
        ca  : fs.readFileSync(keys_dir + 'hcroot.pem'),
        cert: fs.readFileSync(keys_dir + 'teamsnodecert.pem')
    };
    ....
    https.createServer(server_options,app).listen(3001);

So, once you've initiated it with "node server.js", you should have it listening on HTTP:3000 and HTTPS:3001

You should then be able to call that service internally, and this service will proxy the request through to Teams API.

___

So, first things first, you'll need to enable an incoming webhook/connector for your Teams channel. You'll have to create the channel first of course. Click the dots on the right of the channel name, and add a webhook. Give it a simple name, upload an image if you feel the need and you'll be given a huge URL in return. Copy that and put it in endPoints.js and give it a decent name. Note that the name is case sensitive, it's a dictionary and values are hashed, so if you get a 404 when you try to call it, check that!

eg

    endPoints["psdev"] = "https://outlook.office.com/webhook/3bed0bd8...12";

Save the file, restart node..
 
You can now do the following in Powershell and notice the psdev should match the entry in endPoints.js EXACTLY.
 
    PS> Invoke-WebRequest -uri "https://yourinternalURL:3000/Teams/psdev" -Headers @{"Content-Type"="application/json"} -body '{"Outage!" : "Server status, 11/01/19","Text" : "The following servers were found to be down this morning @ 8am","Facts" : {"server1": "DOWN!","server2":"DOWN!"}}' -Method POST

If you want to use a module to send messages instead of rolling your own, try https://github.com/mhouston100/PSMicrosoftTeams or https://github.com/EvotecIT/PSTeams
