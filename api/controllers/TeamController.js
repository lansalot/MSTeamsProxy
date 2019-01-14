'use strict';

const HttpsProxyAgent = require('https-proxy-agent');
const request = require('request');
const proxy = 'http://proxy:8080';
const agent = new HttpsProxyAgent(proxy);
const ep = require('../../endPoints.js');

exports.PostToTeams = function (req, res) {
    /*
    {
        "Title" : "Title goes here",
        "Text" : "Summary text",
        "Facts" : {
            "Server Down": "terminate!"
        }
    }
    */

    console.log(req.client.remoteAddress + ' ' + req.url);
    if (!ep.endPoints.hasOwnProperty(req.params.EndPoint)) {
        console.log('Endpoint ' + req.params.EndPoint + ' not found');
        res.sendStatus(404);
        return;
    }

    let WintelTemplate = {
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
    const { body: { Title, Text, Facts } } = req;
    WintelTemplate.Title = Title;
    WintelTemplate.sections[0].Text = Text;
    for (let key in Facts) {
        WintelTemplate.sections[0].Facts.push({
            "name": key,
            "value": Facts[key]
        });
    }

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
            body: JSON.stringify(WintelTemplate)
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
    if (!ep.endPoints.hasOwnProperty(req.params.EndPoint)) {
        console.log('Endpoint ' + req.params.EndPoint + ' not found');
        res.sendStatus(404);
        return;
    }

    let passThru = req.body;
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
        },
        function (error, response, body) {
            //console.log("Error" + error);
            //console.log("Response: " + response);
            //console.log("Body: " + body);
        });
    res.end('OK');

}