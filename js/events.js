//Register events
jviz.modules.karyoviewer.prototype.on = function(name, listener)
{
  //Register the event
  this._events.add(name, listener);

  //Continue
  return this;
};

//Add the events
jviz.modules.karyoviewer.prototype.events = function()
{
  //Get the last layer ID
  var id = this._canvas.el.layerID(this._canvas.layers - 1);

  //Save this
  var self = this;

  //Add the mouse down event
  jviz.commons.mouse.down(id, function(e, x, y){ return self.eventClick(x,y); });

  //Add the mouse move event
  //Add the mouse up event

  //Add the resize event
  jviz.dom.resize(function(){ return self.resize().draw(); });

  //Return this
  return this;
};
