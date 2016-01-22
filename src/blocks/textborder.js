"use strict";

/*
  Text Block
*/

var Block = require('../block');
var stToHTML = require('../to-html');

var ScribeTextBlockPlugin = require('./scribe-plugins/scribe-text-block-plugin');
var ScribePastePlugin = require('./scribe-plugins/scribe-paste-plugin');
var ScribeDragDropPlugin = require('./scribe-plugins/scribe-drag-drop');

module.exports = Block.extend({
 
  type: "textborder",

  title: function() { return i18n.t('blocks:textborder:title'); },

  editorHTML: '<div class="st-required st-text-block border" contenteditable="true"></div>',

  icon_name: 'text',

  textable: true,

  controllable: true,

  configureScribe: function(scribe) {
    scribe.use(new ScribeTextBlockPlugin(this));
    scribe.use(new ScribePastePlugin(this));
    scribe.use(new ScribeDragDropPlugin(this));
  },

  scribeOptions: { 
    allowBlockElements: true,
    // tags: {
    //   p: true,
    //   span: true
    // }
  },

  loadData: function(data){
    if (this.options.convertFromMarkdown && data.format !== "html") {
      this.setTextBlockHTML(stToHTML(data.text, this.type));
    } else {
      this.setTextBlockHTML(data.text);
    }
  }
});
