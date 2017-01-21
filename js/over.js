//Check if a coordinate is over a rectangle
jviz.modules.karyoviewer.prototype.overRect = function(rect, x, y)
{
  //Check the x coordinate
  if(x < rect.posx || rect.posx + rect.width < x){ return false; }

  //Check the y coordinate
  if(y < rect.posy || rect.posy + rect.height < y){ return false; }

  //Default, return true
  return true;
};

//Get the chromosome where the coordinates are over
jviz.modules.karyoviewer.prototype.overChromosome = function(x, y)
{
  //Read all the chromosomes
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Check the x coordinate
    if(x < this._chromosomes.list[i]._posx){ return false; }

    //Check the y coordinate
    if(y < this._chromosomes.list[i]._posy){ return false; }

    //Check the x coordinate
    if(this._chromosomes.list[i]._posx + this._chromosomes.list[i]._width < x){ continue; }

    //Check the y coordinate
    if(this._chromosomes.list[i]._posy + this._chromosomes.list[i]._height < y){ continue; }

    //Return the chromosome index
    return this._chromosomes.list[i]._index;
  }

  //Default, return false
  return false;
};

//Check if is over a feature
jviz.modules.karyoviewer.prototype.overFeatures = function(chr, x, y, margin)
{
  //Check the margin
  if(typeof margin !== 'number'){ var margin = 0; }

  //Check for undefined features on this chromosome
  if(typeof this._features.chromosomes[chr] !== 'object'){ return []; }

  //Get the features on this chromosome
  var features = this._features.chromosomes[chr];

  //Output features
  var out = [];

  //Read all the features
  for(var i in features)
  {
    //Get the feature
    var feature = this._features.list[i];

    //Check the feature x coordinate
    if(x + margin < feature._posx){ break; }

    //Check the feature y coordinate
    if(y + margin < feature._posy){ break; }

    //Check the feature x coordinate
    if(feature._posx + feature._width < x - margin){ continue; }

    //Check the feature y coordinate
    if(feature._posy + feature._height < y - margin){ continue; }

    //Save the feature object
    out.push(feature);
  }

  //Return the features list
  return out;
};

//Check if coordinatesare over a label
jviz.modules.karyoviewer.prototype.overLabel = function(x, y)
{
  //Check if label is active
  if(this._label.active === false){ return false; }

  //Check if is over the tooltip rectangle
  if(this.overRect(this._label.over, x, y) === true){ return true; }

  //Check the position for landscape
  if(this.isLandscape() === true)
  {
    //Check the x position
    if(Math.abs(x - this._label.position) < this._label.offset){ return true; }
  }
  //Check the position for portrait
  else
  {
    //Check the y position
    if(Math.abs(y - this._label.position) < this._label.offset){ return true; }
  }

  //Default, return false
  return false;
};
