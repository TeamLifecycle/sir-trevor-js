"use strict";

var _ = require('../lodash');
var utils = require('../utils');
var Dom = require('../packages/dom');

var Block = require('../block');

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
  // socialable: true,
  title: function(){ return i18n.t('blocks:social:title'); },


  drop_options: {
    re_render_on_reorder: true
  },

  icon_name: 'tweet',

  beforeLoadingData: function() {
    this.loadData(this._getData());
  },


  loadData: function(data) {
    this.$('.valid-list')[0].innerHTML = ""
    for (var key in data) {
        this.$('[data-social-type="'+key+'"]')[0].value = data[key];
        if(data[key] && data[key].length) {
          var node = imgCreate(key)
          this.$('.valid-list')[0].appendChild(node);
        }
    }
    this.$('.display')[0].classList.remove("hide")
    this.$('.edit')[0].classList.add("hide")


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
