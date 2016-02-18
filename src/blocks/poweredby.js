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
    // no data to load
  },

  scribeOptions: { 
    allowBlockElements: true,
    tags: {
      p: true
    }
  },

  onBlockRender: function(){
    // need this
    if(this.blockStorage.data.align) {
      this.editor.style["text-align"] = this.blockStorage.data.align;
    }
  },

});

