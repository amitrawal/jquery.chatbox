var ChatboxManager = function(options) {
  var visibleBoxes = new Array(),
    gap = 25, width = 240,
    hiddenBoxs = new Array();


  var addBox = function(id, title) {    
    var idx1 = visibleBoxes.indexOf(id),
      idx2 = hiddenBoxs.indexOf(id);

    if(idx1 > -1) {
      // Already visible Do nothing
    } else if(idx2 > -1) {
      hiddenBoxs.splice(id, 1);
      visibleBoxes.push(id);
      recalculateOffsets();
    } else {
      var el = $("<div></div>", {id: id});
      el.appendTo('body');
      el.chatbox({
        id: id,
        title: title,
        offset: visibleBoxes.length * (width + gap),
        boxClosed: closeBoxCallback
      });
      visibleBoxes.push(id);
    }    
  },
  closeBoxCallback = function(boxId) {
    var idx = visibleBoxes.indexOf(boxId);
    hiddenBoxs.push(boxId);
    visibleBoxes.splice(idx, 1);
    recalculateOffsets();    
  },
  recalculateOffsets = function() {
    var initialOffset = 0;
    for(var i = 0; i < visibleBoxes.length; i++) {
      $('#' + visibleBoxes[i]).chatbox('showBox');
      $('#' + visibleBoxes[i]).chatbox('offset', initialOffset);
      console.log(initialOffset);
      initialOffset += (width + gap);      
    }
  };

  return {
    addBox: addBox
  };
};