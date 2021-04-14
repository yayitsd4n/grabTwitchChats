const axios = require('axios');

class grabTwitchChats {
    constructor(devId, streamId, start, end, template) {
        this.devId = devId;
        this.streamId = streamId;
        this.start = start;
        this.end = end;
        this.template = template;
    }

    async run() {
        const chats = await this.buildChatArray();
        return this.filterChatsFromTemplate(chats);
    }

    async buildChatArray(part) {
        const url = this.getURL(part);
        const { data: { comments, _next } } = await axios(url, {
            method: 'GET',
            accept: 'application/vnd.twitchtv.v5+json; charset=UTF-8',
            headers: {
                'Client-ID': this.devId,
            }
        });

        if (_next) {
            if (!this.end || comments[comments.length - 1].content_offset_seconds < this.end) {
                return comments.concat(await this.buildChatArray(_next));
            }
        } else {
            return comments;
        }
    }

    getURL(part) {
        const url = `https://api.twitch.tv/v5/videos/${this.streamId}`
        if (!part) {
            return `${url}/comments?content_offset_seconds=${this.start}`;
        } else {
            return `${url}/comments?cursor=${part}`;
        }
    }

    filterChatsFromTemplate(chats) {
        const copyValuesToTemplate = (template, chat) => {
            const copyToTemplate = (template, chat) => {
                if (typeof template != 'object') {
                    return chat;
                } else {
                    if (Array.isArray(template)) {
                        template.forEach((prop, index) => {
                            template[index] = copyToTemplate(template[index], chat[index]);
                        });
                        return template;
                    } else {
                        if (Object.keys(template).length) {
                            for (const [key, value] of Object.entries(template)) {
                                template[key] = copyToTemplate(value, chat[key]);
                            }
                            return template;
                        } else {
                            return chat;
                        }
                    }
                }
            };

            if (Object.keys(template).length) {
                for (const [key, value] of Object.entries(template)) {
                    template[key] = copyToTemplate(value, chat[key]);
                }
            } else {
                template = chat;
            }

            return template;
        };

        return chats.map(chat => {
            var template = JSON.parse(JSON.stringify(this.template));
            return copyValuesToTemplate(template, chat);
        });
    }
};

module.exports = grabTwitchChats;