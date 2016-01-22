"use strict";

var ScribeDragDropPlugin = function(block) {
  return function(scribe) {
    scribe.el.addEventListener('drop', function(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text/plain")
      block.appendContent(data);

    });

  };
};

module.exports = ScribeDragDropPlugin;
