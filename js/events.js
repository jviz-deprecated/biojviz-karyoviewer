//Add the events
jviz.modules.karyoviewer.prototype.events = function()
{
  //Get the last layer ID
  var id = this._canvas.el.layerID(this._canvas.layers - 1);

  //Save this
  var self = this;

  //Add the mouse down event
  jviz.commons.mouse.down(id, function(e, x, y){ return self.eventClick(x,y); });

  //Add the resize event
  jviz.dom.resize(function(){ return self.resize(); });

  //Return this
  return this;
};

//Resize event
jviz.modules.karyoviewer.prototype.resize = function()
{
  //Resize the canvas
  this._canvas.el.resize();

  //Resize the chromosomes data
  this.chromosomesResize();

  //Resize the regions data
  this.regionsResize();

  //Draw again the data
  this.draw();

  //Exit
  return;
};

//Register events
jviz.modules.karyoviewer.prototype.on = function(name, listener)
{
  //Register the event
  this._events.add(name, listener);

  //Continue
  return this;
};
