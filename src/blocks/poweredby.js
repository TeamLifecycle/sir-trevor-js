"use strict";

var _ = require('../lodash');
var utils = require('../utils');
var Block = require('../block');
var stToHTML = require('../to-html');

module.exports = Block.extend({

  type: 'poweredby',
  title: function() { return i18n.t('blocks:poweredby:title'); },

  controllable: true,

  icon_name: 'video',

  editorHTML: '<div class="st-unsubscribe-block" style="text-align:center;">Powered by <img src="https://s3-us-west-2.amazonaws.com/lifecycle-cdn/email/logo-poweredby.png" alt="Powered By Lifecycle" style="height: 24px;vertical-align: middle;" /></div>',

  loadData: function(data){
    // if (this.options.convertFromMarkdown && data.format !== "html") {
    //   // this.setTextBlockHTML(stToHTML(data.text, this.type));
    // } else {
    //   // this.setTextBlockHTML(data.text);
    // }
  },

  scribeOptions: { 
    allowBlockElements: true,
    tags: {
      p: true
    }
  },

  controls: {
    'alignleft': function(ev) {
      this.editor.style["text-align"] = 'left';
      this.blockStorage.data.align = "left";
    },
    'aligncenter': function(ev) {
      this.editor.style["text-align"] = 'center';
      this.blockStorage.data.align = "center";
    },
    'alignright': function(ev) {
      this.editor.style["text-align"] = 'right';
      this.blockStorage.data.align = "right";
    }
  },

});

