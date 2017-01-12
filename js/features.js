//Add the features list
jviz.modules.karyoviewer.prototype.features = function(list)
{
  //Check the features list
  if(typeof list === 'undefined'){ return this; }

  //Check for array
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Reset the features list
  this._features.list = {};

  //Reset the features counter list
  this._features.counter.list = {};

  //Initialize the features names max length
  this._features.name.length = 0;

  //Read all the features
  for(var i = 0; i < list.length; i++)
  {
    //Get the feature
    var feature = list[i];

    //Initialize the new feature object
    var obj_feature = { posx: 0, posy: 0, width: 0, height: 0 };

    //Save the feature name
    obj_feature.name = feature.name;

    //Save the feature chromosome
    obj_feature.chromosome = feature.chromosome;

    //Save the feature start point
    obj_feature.start = parseInt(feature.start);

    //Save the feature end point
    obj_feature.end = (typeof feature.end === 'undefined') ? obj_feature.start : parseInt(feature.end);

    //Save the feature length
    obj_feature.length = Math.abs(obj_feature.end - obj_feature.start) + 1;

    //Save the feature index
    obj_feature.index = i;

    //Save the feature start position
    //obj.start = draw.height * (feature.start / this._chromosomes.max);

    //Save the feature end position
    //obj.end = draw.height * (feature.end / this._chromosomes.max);

    //feature width
    //obj.width = this._chromosomes.width;

    //feature height
    //obj.height = Math.max(Math.abs(obj.end - obj.start), 1);

    //Add the feature color
    obj_feature.color = (typeof feature.color === 'string') ? feature.color : this._features.color;

    //Check the feature name size
    if(feature.name.length > this._features.name.length){ this._features.name.length = feature.name.length; }

    //Check if chromosome exists
    if(typeof this._features.list[feature.chromosome] === 'undefined')
    {
      //Initialize this chromosome
      this._features.list[feature.chromosome] = [];

      //Add the features counter
      this._features.counter.list[feature.chromosome] = new jviz.canvas.tooltip({ color: this._features.color });
    }

    //Add the index to the chromosome list
    this._features.list[feature.chromosome].push(obj_feature);
  }

  //Update the tooltip text
  this._features.name.tooltip.text(jviz.string.spaces(this._features.name.length));

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
    if(typeof this._features.list[chr.name] === 'undefined'){ continue; }

    //Red all features
    for(var j = 0; j < this._features.list[chr.name].length; j++)
    {
      //Get the feature object
      var feature = this._features.list[chr.name][j];

      //Check for landscape
      if(this.isLandscape() === true)
      {
        //Save the feature width
        feature.width = Math.max(draw.width * feature.length / this._chromosomes.max, 1);

        //Save the feature height
        feature.height = this._chromosomes.height;

        //Save the feature position x
        feature.posx = chr.posx + draw.width * Math.min(feature.start, feature.end) / this._chromosomes.max;

        //Save the feature position y
        feature.posy = chr.posy;
      }

      //Check for portrait
      else
      {
        //Save the feature width for portrait
        feature.width = this._chromosomes.width;

        //Save the feature height for portrait
        feature.height = Math.max(draw.height * feature.length / this._chromosomes.max, 1);

        //Save the feature position x for portrait
        feature.posx = chr.posx;

        //Save the feature position y for portrait
        feature.posy = chr.posy + draw.height * Math.min(feature.start, feature.end) / this._chromosomes.max;
      }

      //Save the feature object
      this._features.list[chr.name][j] = feature;
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

  //Read all the chromosomes
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosomes.list[i];

    //Get the features list
    var features = this.featuresByChromosome(chr.name);

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

//Get features by chromosome name
jviz.modules.karyoviewer.prototype.featuresByChromosome = function(name)
{
  //Check for no features on this chromosome
  if(typeof this._features.list[name] === 'undefined'){ return []; }

  //Return the features  for this chromosome
  return this._features.list[name];
};

//Get features by position
jviz.modules.karyoviewer.prototype.featuresByPosition = function(x, y)
{
  //Get the chromosome
  var chr = this.chromosomeByPosition(x, y);

  //Check for no chromosome
  if(chr === false){ return []; }

  //Get the features on this chromosome
  var features = this.featuresByChromosome(chr.name);

  //Check the features length
  if(features.length === 0){ return []; }

  //Output features
  var out = [];

  //Read all the features
  for(var i = 0; i < features.length; i++)
  {
    //Check the feature x coordinate
    if(x < features[i].posx){ break; }

    //Check the feature y coordinate
    if(y < features[i].posy){ break; }

    //Check the feature x coordinate
    if(feautres[i].posx + features[i].width < x){ continue; }

    //Check the feature y coordinate
    if(feautres[i].posy + features[i].height < y){ continue; }

    //Save the feature
    out.push(features[i]);
  }

  //Return the features list
  return out;
};
