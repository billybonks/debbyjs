const fetch = require('./fetch')
const _ = require('lodash')
const { arrayHasValues} = require('./util');

function fbQuickReplies(quickreplies) {
  if (!quickreplies || !Array.isArray(quickreplies)) return;
  quickreplies = _.chain(quickreplies).compact().unique();

  if(quickreplies.length > 0){
    return quickreplies.map((quickreply) => {
      return constructQuickReply(startsWithLocation(quickreply) && 'location', quickreply);
    });
  }
}

function startsWithLocation(text) {
  return text.match(/^location\|/i) || undefined;
}

function constructQuickReply (type='text', title, payload=title) {
  return {
    content_type: type,
    title,
    payload,
  };
}

class FacebookSdk {

  constructor(pageId, accessToken) {
    this.pageId = pageId,
    this.accessToken = accessToken
  }

  request({ body, method='GET', apiVersion='/v2.11', endpoint='/me/messages', error=`FACEBOOK ${endpoint} ${method} ERROR` }) {
    const url = `https://graph.facebook.com${apiVersion}${endpoint}?access_token=${this.accessToken}`;
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).catch((errors) => {
      logError(errors, errorType);
      throw errors;
    });
  }

  botResponseText(id, text, quick_replies) {
    const body = {
      recipient: { id },
      message: { text, quick_replies: fbQuickReplies(quick_replies) },
    };
    return this.request({ body, method: 'POST' });
  }

  botResponseAttachment(id, { attachment }, quick_replies) {
    const body = {
      recipient: { id },
      message: { attachment, quick_replies: fbQuickReplies(quick_replies) },
    };
    return this.request({ body, method: 'POST' });
  }

  notedAndTyping(id, sender_action='typing_on') {
    const body = {
      recipient: { id },
      sender_action,
    };
    return this.request({ body, method: 'POST' });
  }

  messageCreative(payload, quick_replies) {
    const body = {
      messages: [
        Object.assign(payload, { quick_replies: fbQuickReplies(quick_replies) }),
      ],
    };
    return this.request({ body, method: 'POST', endpoint: '/me/message_creatives' });
  }

  broadcast(message_creative_id, custom_label_id) {
    const body = { message_creative_id };
    if (custom_label_id) body.custom_label_id = custom_label_id;
    return this.request({ body, method: 'POST', endpoint: '/me/broadcast_messages', error: 'FACEBOOK BROADCAST ERROR' });
  }

  privateReply(id, message) {
    //fireStore.botMessage(id, { text: message }, 'private_reply');
    const body = {
      message,
    };
    return this.request({ body, method: 'POST', endpoint: `/${id}/private_replies`, error: 'FACEBOOK PRIVATE_REPLY ERROR' });
  }

  getUser(id) {
    return this.request({ body: {}, method: 'GET', endpoint: `/${id}`, error: 'FACEBOOK GET ERROR' });
  }

  trackEvent(context, _eventName, extras, trackContext) {
    const body = this.constructEvent(context, _eventName, extras, trackContext);
    return this.request({ body, method: 'POST', apiVersion: '', endpoint: `/${this.pageId}/activities`, error: 'FACEBOOK TRACK ERROR' });
  }

  constructEvent(context, _eventName, extras={}, trackContext=false) {
    _eventName = sanitizeEventName(_eventName);
    return Object.assign(context._fbid_ ? { page_scoped_user_id: context._fbid_ } : { anon_id: 'comment' }, {
      event: 'CUSTOM_APP_EVENTS',
      custom_events: [Object.assign(extras, { _eventName }, trackContext ? context : { psid: context._fbid_ } )],
      advertiser_tracking_enabled: 0,
      application_tracking_enabled: 0,
      extinfo: ['mb1'],
      page_id: this.pageId,
    });
  }

}

module.exports = FacebookSdk;
