//Draw the label
jviz.modules.karyoviewer.prototype.labelDraw = function(x, y)
{
  //Check if label is visible
  if(this._label.visible === false){ return; }

  //Get the canvas layer
  var canvas = this._canvas.el.layer(this._label.layer);

  //Check if label is active
  if(this._label.active === true)
  {
    //Check the position for landscape
    if(this.isLandscape() === true)
    {
      //Check the x position
      if(Math.abs(x - this._label.position) <= this._label.offset){ return; }
    }
    //Check the position for portrait
    else
    {
      //Check the y position
      if(Math.abs(y - this._label.position) <= this._label.offset){ return; }
    }

    //Clear the canvas
    canvas.Clear();
  }

  //Set label as inactive
  this._label.active = false;

  //Get the features by position
  this._label.features = this.featuresByPosition(x, y, this._label.offset);

  //Check the features list
  if(this._label.features.length === 0){ return; }

  //Get the first feature
  var feature = this._label.features[0];

  //Initialize the tooltip coordinates
  var coordinates = { posx: 0, posy: 0 };

  //Check the orientation
  if(this.isLandscape() === true)
  {
    //Set the x coordinate for landscape orientation
    coordinates.posx = feature.posx + feature.width / 2;

    //Set the y coordinate for landscape orientation
    coordinates.posy = feature.posy + feature.height + this._label.tooltip.margin;

    //Save the label position
    this._label.position = coordinates.posx;
  }
  else
  {
    //Set the x coordinate for portrait orientation
    coordinates.posx = feature.posx + feature.width + this._label.tooltip.margin;

    //Set the y coordinate for protrait orientation
    coordinates.posy = feature.posy + feature.height / 2;

    //Save the label position
    this._label.position = coordinates.posy;
  }

  //Get the features names
  var names = this._label.features.map(function(el){ return el.name; });

  //Add the features names
  this._label.tooltip.el.text(names);

  //Move the tooltip
  this._label.tooltip.el.move(coordinates);

  //Set the tooltip color
  this._label.tooltip.el.color(feature.color);

  //Draw the tooltip
  this._label.tooltip.el.draw(canvas);

  //Set label active as true
  this._label.active = true;

  //Exit
  return;
};
