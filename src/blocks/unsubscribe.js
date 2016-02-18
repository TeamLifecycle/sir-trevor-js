"use strict";

var _ = require('../lodash');
var utils = require('../utils');
var Block = require('../block');
var stToHTML = require('../to-html');
var EventBus = require('../event-bus');

module.exports = Block.extend({

  type: 'unsubscribe',
  title: function() { return i18n.t('blocks:unsubscribe:title'); },

  // textable: true,
  // toolbarEnabled: false,
  controllable: true,

  icon_name: 'video',

  editorHTML: '<div class="st-unsubscribe-block" style="text-align:center;">Unsubscribe</div>',

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

