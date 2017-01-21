//Add the features list
jviz.modules.karyoviewer.prototype.features = function(list)
{
  //Check the features list
  if(typeof list === 'undefined'){ return this._features.list; }

  //Check for array
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Reset the features list
  this._features.list = [];

  //Initialize the features draw definitions
  this._features.draw = {};

  //Reset the features counter list
  this._features.counter.list = {};

  //Features counter
  var index = 0;

  //Read all the features
  for(var i = 0; i < list.length; i++)
  {
    //Clone the feature
    var feature = Object.assign({}, list[i]);

    //Check the chromosome
    if(typeof feature.chromosome !== 'string'){ console.error('Undefined chromosome on feature ' + i); continue; }

    //Check the feature start position
    if(typeof feature.start === 'undefined'){ console.error('Undefined start on feature ' + i); continue; }

    //Check the feature name
    if(typeof feature.name !== 'string'){ console.error('Undefined name on feature ' + i); continue; }

    //Parse the feature start position
    feature.start = parseInt(feature.start);

    //Save the feature end point
    feature.end = (typeof feature.end === 'undefined') ? feature.start : parseInt(feature.end);

    //Save the feature length
    feature.length = Math.abs(feature.end - feature.start) + 1;

    //Save this feature
    this._features.list.push(feature);

    //Check if chromosome exists
    if(typeof this._features.draw[feature.chromosome] === 'undefined')
    {
      //Initialize this chromosome
      this._features.draw[feature.chromosome] = [];

      //Add the features counter
      this._features.counter.list[feature.chromosome] = new jviz.canvas.tooltip({ color: this._features.color });
    }

    //Initialize the feature object
    var obj = { posx: 0, posy: 0, width: 0, height: 0, index: index, color: this._features.color };

    //Create the feature draw object for this chromosome
    this._features.draw[feature.chromosome].push(obj);

    //Increment the features counter
    index = index + 1;
  }

  //Set to resize the features
  this._features.resized = false;

  //Continue
  return this;
};

//Resize the features data
jviz.modules.karyoviewer.prototype.featuresResize = function()
{
  //Get the draw info
  var draw = this._block.draw;

  //Get margins
  var margin = this._block.margin;

  //Read all the chromosomes
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosomes.list[i];

    //Check features on this chromosome
    if(typeof this._features.draw[chr.name] === 'undefined'){ continue; }

    //Red all features
    for(var j = 0; j < this._features.draw[chr.name].length; j++)
    {
      //Get the feature draw object
      var feature = this._features.draw[chr.name][j];

      //Get the feature
      var feature_info = this._features.list[feature.index];

      //Check for landscape
      if(this.isLandscape() === true)
      {
        //Save the feature width
        feature.width = Math.max(draw.width * feature_info.length / this._chromosomes.max, 1);

        //Save the feature height
        feature.height = this._chromosomes.height;

        //Save the feature position x
        feature.posx = chr.posx + draw.width * Math.min(feature_info.start, feature_info.end) / this._chromosomes.max;

        //Save the feature position y
        feature.posy = chr.posy;
      }

      //Check for portrait
      else
      {
        //Save the feature width for portrait
        feature.width = this._chromosomes.width;

        //Save the feature height for portrait
        feature.height = Math.max(draw.height * feature_info.length / this._chromosomes.max, 1);

        //Save the feature position x for portrait
        feature.posx = chr.posx;

        //Save the feature position y for portrait
        feature.posy = chr.posy + draw.height * Math.min(feature_info.start, feature_info.end) / this._chromosomes.max;
      }

      //Save the feature object
      this._features.draw[chr.name][j] = feature;
    }

    //Initialize the counter positions object
    var counter = { posx: 0, posy: 0, position: 'top' };

    //Check for landscape
    if(this.isLandscape() === true)
    {
      //Calculate the position x
      counter.posx = chr.posx + chr.width + this._features.counter.margin;

      //Calculate the position y
      counter.posy = chr.posy + chr.height / 2;

      //Set the tooltip position
      counter.position = 'right';
    }

    //Check for portrait
    else
    {
      //Calculate the tooltip position x
      counter.posx = chr.posx + chr.width / 2;

      //Calculate the tooltip position y
      counter.posy = chr.posy - this._features.counter.margin;

      //Set the tooltip position
      counter.position = 'top';
    }

    //Move the counter object
    this._features.counter.list[chr.name].move(counter);

    //Set the tooltip position
    this._features.counter.list[chr.name].position(counter.position);

    //Set the number of features
    this._features.counter.list[chr.name].text(this._features.list[chr.name].length + '');
  }

  //Set features resized
  this._features.resized = true;

  //Continue
  return this;
};

//Draw the features
jviz.modules.karyoviewer.prototype.featuresDraw = function()
{
  //Get the canvas
  var canvas = this._canvas.el.layer(this._features.layer);

  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosomes.list[i];

    //Get the features for this chromosome
    var features = this._features.draw[chr.name];

    //Red all features
    for(var j = 0; j < features.length; j++)
    {
      //Get this feature
      var feature = features[j];

      //Draw the feature
      canvas.Rect({ x: feature.posx, y: feature.posy, width: feature.width, height: feature.height });

      //feature fill
      canvas.Fill({ color: feature.color, opacity: this._features.opacity });
    }

    //Check for drawing the features counter
    if(this._features.counter.visible === false){ continue; }

    //Check for no features
    if(features.length === 0){ continue; }

    //Draw the counter tooltip
    this._features.counter.list[chr.name].draw(canvas);
  }

  //Exit
  return this;
};

//Update the features info
jviz.modules.karyoviewer.prototype.featuresMap = function(fn)
{
  //Check the function
  if(typeof fn !== 'function'){ return this; }

  //Read all the features
  for(var i = 0; i < this._features.list.length; i++)
  {
    //Get the feature
    var feature = this._features.list[i];

    //Parse the feature
    var new_feature = fn(feature, index);

    //Check for undefined new feature
    if(typeof new_feature !== 'object'){ continue; }

    //Update the original feature
    this._features.list[i] = Object.assign(feature, new_feature);
  }

  //Return this and exit
  return this;
};

//Update the feature color
jviz.modules.karyoviewer.prototype.featuresColor = function(fn)
{
  //Check the function
  if(typeof fn !== 'function'){ return this; }

  //Read all the chromosomes
  for(var chr in this._features.draw)
  {
    //Get the list of draw objects
    var list = this._features.draw[chr];

    //Read the full list
    for(var i = 0; i < list.length; i++)
    {
      //Get the draw object
      var draw = list[i];

      //Get the feature of this draw object
      var feature = this._features.list[draw.index];

      //Get the color
      var color = fn(feature, draw.color, this._features.color);

      //Check for undefined string
      if(typeof color !== 'string'){ continue; }

      //Update the object color
      list[i].color = color;
    }

    //Save the new list
    this._features.draw[chr] = list;
  }

  //Continue
  return this;
};
