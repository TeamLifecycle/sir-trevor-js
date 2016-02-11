"use strict";

var _ = require('../lodash');
var config = require('../config');
var utils = require('../utils');
var EventBus = require('../event-bus');

module.exports = {

  mixinName: "Socialable",
  requireInputs: true,

  initializeSocialable: function() {
    console.log("initializeSocialable", config.defaults.Block.social_options, this.social_options)
    this.social_options = Object.assign(
      {}, config.defaults.Block.social_options, this.social_options);

    this.inputs.insertAdjacentHTML("beforeend", _.template(this.social_options.html, this));

    var context = this;
    Array.prototype.forEach.call(this.$('.display'), (el) => {
      el.addEventListener('click', function(event) { 
        event.preventDefault()
        el.classList.add("hide")
        el.nextSibling.classList.remove("hide")
      });
    });

    Array.prototype.forEach.call(this.$('.social-submit'), (el) => {
      el.addEventListener('click', function(event) { 
        event.preventDefault()
        SirTrevor.onFormSubmit()
        context._handleContentSubmit(context.blockStorage.data);
        EventBus.trigger('block:changed');
      });
    });
  }

};
