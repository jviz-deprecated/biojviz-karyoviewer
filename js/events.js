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
  //Get the canvas layer
  var canvas = this._canvas.el.layer(this._features.name.layer);

  //Get the features by position
  var features = this.featuresByPosition(x, y, this._features.name.margin);

  //Check the features list
  if(features.length === 0)
  {
    //Remove the actual feature
    this._features.name.actual = '';

    //Clear the canvas and exit
    return canvas.Clear();
  }

  //CHANGE WHEN WE HAVE THE ZOOM FUNCTION
  //***********************************
  //Get the first feature
  var feature = features[0];

  //Check the feature name
  if(this._features.name.actual === feature.name){ return; }

  //Clear the canvas
  canvas.Clear();

  //Update the actual feature
  this._features.name.actual = feature.name;

  //Initialize the tooltip coordinates
  var coordinates = { posx: 0, posy: 0 };

  //Check the orientation
  if(this.isLandscape() === true)
  {
    //Set the x coordinate for landscape orientation
    coordinates.posx = feature.posx + feature.width / 2;

    //Set the y coordinate for landscape orientation
    coordinates.posy = feature.posy + feature.height;
  }
  else
  {
    //Set the x coordinate for portrait orientation
    coordinates.posx = feature.posx + feature.width;

    //Set the y coordinate for protrait orientation
    coordinates.posy = feature.posy + feature.height / 2;
  }

  //Move the tooltip
  this._features.name.tooltip.move(coordinates);

  //Set the tooltip text
  this._features.name.tooltip.text(feature.name, false);

  //Set the tooltip color
  this._features.name.tooltip.color(feature.color);

  //Draw the tooltip
  this._features.name.tooltip.draw(canvas);

  //Exit
  return;
};

//Up event
jviz.modules.karyoviewer.prototype.eventUp = function(x, y)
{

};
