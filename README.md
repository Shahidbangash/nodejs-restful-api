# RestFul APi using Node and Express


To use this APi in your project

Create .env file and Add dbuserName , password and Port

To use or test this API You can try these end points

1. [https://getlocationgoogle.herokuapp.com//](https://getlocationgoogle.herokuapp.com/)


# Firebase Admin Notification API

### Welcome to Firebase Admin Notification API



These docs describe how to use the [Firebase Admin Notification API](https://getlocationgoogle.herokuapp.com/)

This API endpoints return the JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, API returns a JSON response in the following format:

```javascript
{
  "message" : string,
  "success" : bool,
  "error"    : string
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of deleting a resource, success that the resource was properly deleted.

The `success` attribute describes if the request was successful or not.

The `data` attribute contains any other metadata associated with the response. This will be an escaped string containing JSON data.

## Status Codes

This API returns the following status codes in its API:

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 206         | `PARTIAL CONTENT` |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

# GUIDE TO TEST API INDEPENDENTLY WITHOUT FRONTEND INTEGRATION

1. Go to [reqbin.com](https://reqbin.com/). (ReqBin is an online API testing tool for REST and SOAP APIs.).
2. Enter API end points in URL section of website.
3. Specify request type i-e POST,GET.
4. Click on send button.
5. Now Response will be shown at right side.
6. To send post request body, click on content tab and enter a JSON object as body.A common JSON object is given below to undersand the json format.

### json Object sample

```javascript
{
    "name":"test",
    "email":"test@gmail.com",
}
```

## Send Notification to android Phone

```http
POST https://getlocationgoogle.herokuapp.com/send-notification
```
**data required to send Notification request**
```javascript
{
    deviceToken:"zzzzcVTc_S5uRGmkouTUP8oYqX:APA91bHFjfXIAaRv4zLHDZkuBMHkBTIHMQlgLEirbleHrHTyGuvNYggvnf3TGNcbCeTi8fGCj64pCUPbIxIpgPte-MKAVezoPDg3CLzvvXpfCC5nW7uiioqm3iIOa5X1ksCE1OPtHz8h", // token of device 
    senderName:"test",
    messageContent: "Test from Node",
    receiverID:"sadasdad",
    senderID:"senderID",
    notificationType: "", // [it can be anything to differentiate between message notification and alert notfication .. hanfle on device according req]
    
}
```
On successful Result You will Get JSON object like this 
```javascript
{
  "confirm": "new project",
  "deviceToken ": "cVTc_S5uRGmkouTUP8oYqX:APA91bHFjfXIAaRv4zLHDZkuBMHkBTIHMQlgLEirbleHrHTyGuvNYggvnf3TGNcbCeTi8fGCj64pCUPbIxIpgPte-MKAVezoPDg3CLzvvXpfCC5nW7uiioqm3iIOa5X1ksCE1OPtHz8h",
  "body": {
    "deviceToken": "cVTc_S5uRGmkouTUP8oYqX:APA91bHFjfXIAaRv4zLHDZkuBMHkBTIHMQlgLEirbleHrHTyGuvNYggvnf3TGNcbCeTi8fGCj64pCUPbIxIpgPte-MKAVezoPDg3CLzvvXpfCC5nW7uiioqm3iIOa5X1ksCE1OPtHz8h",
    "senderName": "Shahid",
    "messageContent": "Test from Node",
    "receiverID": "sadasdad",
    "senderID": "senderID"
  }
}
