"use strict";

var utils = require('../utils');
var Dom = require('../packages/dom');
var Events = require('../packages/events');
var config = require('../config');
var EventBus = require('../event-bus');

module.exports = {

  mixinName: "Controllable",

  initializeControllable: function() {
    utils.log("Adding controllable to block " + this.blockID);
    this.control_ui = Dom.createElement('div', {'class': 'st-block__control-ui'});
    Object.keys(this.controls).forEach(
      function(cmd) {
        // Bind configured handler to current block context
        this.addUiControl(cmd, this.controls[cmd].bind(this));
      },
      this
    );
    this.inner.appendChild(this.control_ui);
  },

  controls: {
    'alignleft': function(ev) {
      this.setAlignment("left");
    },
    'aligncenter': function(ev) {
      this.setAlignment("center");
    },
    'alignright': function(ev) {
      this.setAlignment("right");
    }
  },

  setAlignment: function(dir) {
    this.editor.style["text-align"] = dir;
    this.setData({"align": dir});
    console.log("setAlignment")
    EventBus.trigger('block:updated');
  },
  
  getControlTemplate: function(cmd) {
    // return Dom.createElement("a",
    //   { 'data-icon': cmd,
    //     'class': 'st-icon st-block-control-ui-btn st-block-control-ui-btn--' + cmd
    //   });

      // TODO SVG's not rendering
      var child = document.createElement('use');
      // child["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
      // child["xlink:href"] = config.defaults.iconUrl + "#left-align";
      child.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      child.setAttribute("xlink:href", config.defaults.iconUrl + "#plus");

      var parent = document.createElement('svg');
      parent.setAttribute("role", "img");
      parent.className = "st-icon";
      parent.appendChild(child);

      var grandparent = document.createElement('a');
      grandparent["data-icon"] = cmd;
      grandparent.className = 'st-icon st-block-control-ui-btn st-block-control-ui-btn--' + cmd;
      grandparent.appendChild(parent);

      return grandparent;
  },

  addUiControl: function(cmd, handler) {
    this.control_ui.appendChild(this.getControlTemplate(cmd));
    Events.delegate(this.control_ui, '.st-block-control-ui-btn--' + cmd, 'click', handler);
  }
};
