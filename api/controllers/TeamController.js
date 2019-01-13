exports.PostToTeams = function (req, res) {
    // {
    //     "Title" : "Title goes here",
    //     "Text" : "Summary text",
    //     "Facts" : {
    //         "Server Down": "terminate!"
    //     }
    // }

    console.log(req.client.remoteAddress + ' ' + req.url);
    var ep = require('../../endPoints.js');
    if (!ep.endPoints.hasOwnProperty(req.params.EndPoint)) {
        console.log('Endpoint ' + req.params.EndPoint + ' not found');
        res.sendStatus(404);
        return;
    }

    var wintelTemplate = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "Summary": "nodebot",
        "themeColor": "D778D7",
        "Title": "",
        "sections": [{
            "Facts": [],
            "Text": ""
        }]
    }
    wintelTemplate.Title = req.body.Title;
    wintelTemplate.sections[0].Text = req.body.Text;
    for (var key in req.body.Facts) {
        wintelTemplate.sections[0].Facts.push({
            "name": key,
            "value": req.body.Facts[key]
        });
    }

    var HttpsProxyAgent = require('https-proxy-agent');
    var request = require('request');
    var proxy = 'http://proxy:8080';
    var agent = new HttpsProxyAgent(proxy);
    request({
            uri: ep.endPoints[req.params.EndPoint],
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            agent: agent,
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10,
            body: JSON.stringify(wintelTemplate)
        },
        function (error, response, body) {
            //console.log("Error" + error);
            //console.log("Response: " + response);
            //console.log("Body: " + body);
        });
    res.end('OK');

}


exports.PostToTeamsPassThru = function (req, res) {

    console.log(req.client.remoteAddress + ' ' + req.url);
    console.log(req.body);
    var ep = require('../../endPoints.js');
    if (!ep.endPoints.hasOwnProperty(req.params.EndPoint)) {
        console.log('Endpoint ' + req.params.EndPoint + ' not found');
        res.sendStatus(404);
        return;
    }

    var passThru = req.body;
    var HttpsProxyAgent = require('https-proxy-agent');
    var request = require('request');
    var proxy = 'http://proxy:8080';
    var agent = new HttpsProxyAgent(proxy);
    request({
            uri: ep.endPoints[req.params.EndPoint],
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            agent: agent,
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10,
            body: JSON.stringify(passThru)
            //body: passThru
        },
        function (error, response, body) {
            //console.log("Error" + error);
            //console.log("Response: " + response);
            //console.log("Body: " + body);
        });
    res.end('OK');

}