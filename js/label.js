//Draw the label
jviz.modules.karyoviewer.prototype.labelDraw = function(x, y)
{
  //Check if label is visible
  if(this._label.visible === false){ return; }

  //Check if is over a label
  if(this.overLabel(x, y) === true){ return; }

  //Check if label is active and clear the canvas
  if(this._label.active === true){ this.labelClear(); }

  //Check if is over a chromosome
  if(this._over.chromosome.actual === false){ return; }

  //Get the features
  this._label.features = this.overFeatures(this._over.chromosome.actual, x, y, this._label.offset);

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
    this._label.position = x;
  }
  else
  {
    //Set the x coordinate for portrait orientation
    coordinates.posx = feature.posx + feature.width + this._label.tooltip.margin;

    //Set the y coordinate for protrait orientation
    coordinates.posy = feature.posy + feature.height / 2;

    //Save the label position
    this._label.position = y;
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
  this._label.tooltip.el.draw(this._canvas.el.layer(this._label.layer));

  //Set label active as true
  this._label.active = true;

  //Save the label chromosome
  this._label.chromosome = this._over.chromosome.actual;

  //Check the orientation
  if(this.isLandscape() === true)
  {
    //Add the label over width
    this._label.over.width = this._label.tooltip.el._rectangle.width;

    //Add the label over height
    this._label.over.height = this._label.tooltip.el._rectangle.height + this._label.tooltip.el._triangle.height;

    //Add the label over position x
    this._label.over.posx = this._label.tooltip.el._rectangle.posx;

    //Add the label over position y
    this._label.over.posy = this._label.tooltip.el._rectangle.posy - this._label.tooltip.el._triangle.height;
  }
  else
  {
    //Add the label over width
    this._label.over.width = this._label.tooltip.el._rectangle.width + this._label.tooltip.el._triangle.height;

    //Add the label over height
    this._label.over.height = this._label.tooltip.el._rectangle.height;

    //Add the label over position x
    this._label.over.posx = this._label.tooltip.el._rectangle.posx - this._label.tooltip.el._triangle.height;

    //Add the label over position y
    this._label.over.posy = this._label.tooltip.el._rectangle.posy;
  }

  //Exit
  return;
};

//Label click event
jviz.modules.karyoviewer.prototype.labelClick = function(x, y)
{
  //Check the number of features
  if(this._label.features.length === 1)
  {
    //Get the feature
    var feature = this._label.features[0];

    //Emit the event and exit
    return this._events.emit('click:feature', feature.name, feature.start, feature.end, feature.index);
  }

  //Check if has clicked on the label tooltip
  if(this.overRect(this._label.over, x, y) === false){ return; }

  //Get the number of features
  var features_num = this._label.features.length;

  //Get the features height
  var features_height = (this._label.over.height - 2 * this._label.tooltip.el._rectangle.margin) / features_num;

  //Find the position
  for(var i = 0; i < features_num; i++)
  {
    //Check the y coordinate
    if(this._label.over.posy + this._label.tooltip.el._rectangle.margin + (i + 1) * features_height < y){ continue; }

    //Get the feature
    var feature = this._label.features[i];

    //Emit the click event and exit
    return this._events.emit('click:feature', feature.name, feature.start, feature.end, feature.index);
  }

  //Exit
  return;
};

//Clear the label
jviz.modules.karyoviewer.prototype.labelClear = function()
{
  //Clear the canvas layer
  this._canvas.el.layer(this._label.layer).Clear();

  //Set label as inactive
  this._label.active = false;

  //Reset the cursor
  jviz.cursor.remove('pointer');

  //Continue
  return this;
};
