# grabTwitchChats
A module to grab twitch chats from a VOD broadcast.
## Usage
```javascript
const grabTwitchChats = require('./grabTwitchChats.js');

const chats = new grabTwitchChats(devId, videoId, startTimeSeconds, endTimeSeconds {, template});
chats.run().then(chatData => {
    // Do stuff with chatData
});
```
---

## Options
`devId: String`  
Your [Twitch.tv](https://dev.twitch.tv/docs/api/) developer ID.

`videoId: Number`  
The ID of the video you want to grab chats from.

`startTimeSeconds: Number`  
The amount of seconds into the video to start collecting chats.

`endTimeSeconds: Number or Null`  
The amount of seconds into the video to stop collecting chats.

`template: Object`  
Template is used to filter data that you want. Template expects an object that matches the shape of the data you want back. If you want unfiltered data, you can pass in an empty object.

---

## Examples
Get all chat data from a video:
```javascript
const grabTwitchChats = require('./grabTwitchChats.js');

const chats = new grabTwitchChats('devId', 949573583, 0, null, {});
chats.run().then(chatData => {
    // Do stuff with chatData
});
```

Get all chat data between 200 and 4000 seconds from a video:
```javascript
const grabTwitchChats = require('./grabTwitchChats.js');

const chats = new grabTwitchChats('devId', 949573583, 200, 4000, {});
chats.run().then(chatData => {
    // Do stuff with chatData
});
```

Get chat data between 0 and 4000 seconds and filter to only show content_offset_seconds and message.body.
```javascript
const grabTwitchChats = require('./grabTwitchChats.js');

const chats = new grabTwitchChats('devId', 949573583, 0, 4000, {
    content_offset_seconds: '',
    message: {
        body: ''
    }
});
chats.run().then(chatData => {
    // Do stuff with chatData
});
```

Get chat data between 0 and 4000 seconds and filter to only to only show content_offset_seconds and everything inside of message.
```javascript
const grabTwitchChats = require('./grabTwitchChats.js');

const chats = new grabTwitchChats('devId', 949573583, 0, 4000, {
    content_offset_seconds: '',
    message: {}
});
chats.run().then(chatData => {
    // Do stuff with chatData
});
```
