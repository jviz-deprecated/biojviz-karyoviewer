//Register events
jviz.modules.karyoviewer.prototype.on = function(name, listener)
{
  //Register the event
  return this._events.add(name, listener);
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
  //Check if label is active
  if(this._label.active === true && this._label.visible === true)
  {
    //Check if user has clicked on a label
    return this.labelClick(x, y);
  }

  //Check for no chromosome
  if(chr === false){ return; }

  //Emit the click on a chromosome
  return this._events.emit('click:chromosome', chr.name, chr.index);
};

//Move event
jviz.modules.karyoviewer.prototype.eventMove = function(x, y)
{
  //Check the move
  if(this._over.move === false){ this._over.move = true; return; }

  //Change the move
  this._over.move = false;

  //Get the actual chromosome
  this._over.chromosome.actual = this.overChromosome(x, y);

  //Draw the label
  this.labelDraw(x, y);
};

//Up event
jviz.modules.karyoviewer.prototype.eventUp = function(x, y)
{

};
