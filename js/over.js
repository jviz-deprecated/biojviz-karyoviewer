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
    if(x < this._chromosomes.list[i].posx){ return false; }

    //Check the y coordinate
    if(y < this._chromosomes.list[i].posy){ return false; }

    //Check the x coordinate
    if(this._chromosomes.list[i].posx + this._chromosomes.list[i].width < x){ continue; }

    //Check the y coordinate
    if(this._chromosomes.list[i].posy + this._chromosomes.list[i].height < y){ continue; }

    //Return the chromosome name
    return this._chromosomes.list[i].name;
  }

  //Default, return false
  return false;
};

//Check if is over a feature
jviz.modules.karyoviewer.prototype.overFeatures = function(chromosome, x, y, margin)
{
  //Check the margin
  if(typeof margin !== 'number'){ var margin = 0; }

  //Get the features on this chromosome
  var features = this.featuresByChromosome(chromosome);

  //Output features
  var out = [];

  //Read all the features
  for(var i = 0; i < features.length; i++)
  {
    //Check the feature x coordinate
    if(x + margin < features[i].posx){ break; }

    //Check the feature y coordinate
    if(y + margin < features[i].posy){ break; }

    //Check the feature x coordinate
    if(features[i].posx + features[i].width < x - margin){ continue; }

    //Check the feature y coordinate
    if(features[i].posy + features[i].height < y - margin){ continue; }

    //Save the feature
    out.push(features[i]);
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
