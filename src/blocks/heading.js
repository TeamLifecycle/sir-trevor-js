"use strict";

/*
  Text Block
*/

var Block = require('../block');
var stToHTML = require('../to-html');

var ScribeTextBlockPlugin = require('./scribe-plugins/scribe-text-block-plugin');
var ScribePastePlugin = require('./scribe-plugins/scribe-paste-plugin');
var ScribeHeadingPlugin = require('./scribe-plugins/scribe-heading-plugin');
var ScribeQuotePlugin = require('./scribe-plugins/scribe-quote-plugin');

module.exports = Block.extend({

  type: "heading",

  title: function() { return i18n.t('blocks:text:title'); },

  editorHTML: '<h2 class="st-required st-text-block st-text-block--heading" contenteditable="true"></h2>',

  icon_name: 'text',

  textable: true,
  toolbarEnabled: false,
  controllable: true,

  configureScribe: function(scribe) {
    scribe.use(new ScribeTextBlockPlugin(this));
    scribe.use(new ScribePastePlugin(this));
    scribe.use(new ScribeHeadingPlugin(this));
    scribe.use(new ScribeQuotePlugin(this));

    scribe.on('content-changed', this.toggleEmptyClass.bind(this));
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

  scribeOptions: { 
    allowBlockElements: true,
    tags: {
      p: true
    }
  },

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
