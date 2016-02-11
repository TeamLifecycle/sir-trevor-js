"use strict";

var _ = require('../lodash');
var utils = require('../utils');
var Block = require('../block');

module.exports = Block.extend({

  type: 'unsubscribe',
  title: function() { return i18n.t('blocks:unsubscribe:title'); },

  // textable: true,
  // toolbarEnabled: false,
  // controllable: true,

  icon_name: 'video',

  editorHTML: '<div class="st-text-block" contenteditable="true">Unsubscribe</div>',

  loadData: function(data){
    if (this.options.convertFromMarkdown && data.format !== "html") {
      this.setTextBlockHTML(stToHTML(data.text, this.type));
    } else {
      this.setTextBlockHTML(data.text);
    }
  },

  
  onBlockRender: function() {
    this.focus();
    this.toggleEmptyClass();
  },

  toggleEmptyClass: function() {
    this.el.classList.toggle('st-block--empty', this.isEmpty());
  },

  isEmpty: function() {
    return this._scribe.getTextContent() === '';
  }

});

