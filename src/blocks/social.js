"use strict";

var _ = require('../lodash');
var utils = require('../utils');
var Dom = require('../packages/dom');

var Block = require('../block');

var tweet_template = _.template([
  "<blockquote class='twitter-tweet' align='center'>",
  "<p><%= text %></p>",
  "&mdash; <%= user.name %> (@<%= user.screen_name %>)",
  "<a href='<%= status_url %>' data-datetime='<%= created_at %>'><%= created_at %></a>",
  "</blockquote>"
].join("\n"));

function imgCreate(title) {
    var img= document.createElement('img');
    if(title == "facebook") img.src= "https://s3-us-west-2.amazonaws.com/lifecycle-cdn/email/social/facebook.png";
    else if(title == "googleplus") img.src= "https://s3-us-west-2.amazonaws.com/lifecycle-cdn/email/social/googleplus.png";
    else if(title == "instagram") img.src= "https://s3-us-west-2.amazonaws.com/lifecycle-cdn/email/social/instagram.png";
    else if(title == "twitter") img.src= "https://s3-us-west-2.amazonaws.com/lifecycle-cdn/email/social/twitter.png";
    img.alt= title;
    img.title= title;
    return img;
}

module.exports = Block.extend({

  type: "social",
  socialable: true,

  drop_options: {
    re_render_on_reorder: true
  },

  title: function(){ return i18n.t('blocks:social:title'); },

  fetchUrl: function(tweetID) {
    return "/tweets/?tweet_id=" + tweetID;
  },

  icon_name: 'twitter',

  beforeLoadingData: function() {
    // this.setupListVariables();
    this.loadData(this._getData());
  },


  loadData: function(data) {
    this.$('.valid-list')[0].innerHTML = ""
    for (var key in data) {
        this.$('[data-social-type="'+key+'"]')[0].value = data[key];
        if(data[key] && data[key].length) {
          // var node = document.createElement("div");                 // Create a <li> node
          // var textnode = document.createTextNode(key);         // Create a text node
          // node.appendChild(textnode);                              // Append the text to <li>
          var node = imgCreate(key)
          this.$('.valid-list')[0].appendChild(node);
        }
    }
    this.$('.display')[0].classList.remove("hide")
    this.$('.edit')[0].classList.add("hide")


  },

  validTweetUrl: function(url) {
    return (utils.isURI(url) &&
            url.indexOf("twitter") !== -1 &&
            url.indexOf("status") !== -1);
  },

  onContentSubmit: function(data){
    this.setAndLoadData(data);
    this.ready();
  },

  _serializeData: function() {

    var socialData = {}

    Array.prototype.forEach.call(this.$('.social-input'), (el) => {
      socialData[el.dataset.socialType] = el.value;
    });

    var data = socialData;

    return data;
  },

});
