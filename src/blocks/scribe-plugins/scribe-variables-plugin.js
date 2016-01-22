"use strict";

/*
When content is pasted into a block take the sanitized html and create a block for each
paragraph that has been added.
*/

var scribeVariablesPlugin = function(block) {
  return function(scribe) {

    var command = new scribe.api.Command('insertHTML');

    command.execute = function (value) {
      scribe.api.Command.prototype.execute.call( this, value);
    }

    scribe.commands['variable'] = command;


  };
};

module.exports = scribeVariablesPlugin;
