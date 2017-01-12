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
  jviz.commons.mouse.down(id, function(e, x, y){ return self.eventDown(x, y); });

  //Add the mouse move event
  jviz.commons.mouse.move(id, function(e, x, y){ return self.eventMove(x, y); });

  //Add the mouse up event
  jviz.commons.mouse.up(id, function(e, x, y){ return self.eventUp(x, y); });

  //Add the resize event
  jviz.dom.resize(function(){ return self.resize().draw(); });

  //Return this
  return this;
};

//Click down event
jviz.modules.karyoviewer.prototype.eventDown = function(x, y)
{

};

//Move event
jviz.modules.karyoviewer.prototype.eventMove = function(x, y)
{

};

//Up event
jviz.modules.karyoviewer.prototype.eventUp = function(x, y)
{

};
