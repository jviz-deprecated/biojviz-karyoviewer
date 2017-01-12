//Manage the orientation
jviz.modules.karyoviewer.prototype.orientation = function(value)
{
  //Check the orientation value
  if(typeof value !== 'string'){ return this._orientation.actual; }

  //convert to lower case
  value = value.toLowerCase();

  //Save the orientation
  this._orientation.actual = (this._orientation.values.indexOf(value) === -1) ? this._orientation.default : value;

  //Resize the canvas
  this.resize();

  //Check the orientation
  if(this.isLandscape() === true)
  {
    //Set the feature name tooltip position
    this._features.name.tooltip.position('bottom');
  }
  else
  {
    //Set the feature name tooltip position
    this._features.name.tooltip.position('right');
  }

  //Continue
  return this;
};

//Check if is landscape
jviz.modules.karyoviewer.prototype.isLandscape = function()
{
  //Check if the actual orientation is landscape
  return this._orientation.actual === 'landscape';
};

//Set landscape orientation
jviz.modules.karyoviewer.prototype.setLandscape = function()
{
  //Set landscape orientation
  return this.orientation('landscape');
};

//Check if orientation is protrait
jviz.modules.karyoviewer.prototype.isPortrait = function()
{
  //Check if actual orientation is portrait
  return this._orientation.actual === 'portrait';
};

//Set portrait orientation
jviz.modules.karyoviewer.prototype.setPortrait = function()
{
  //Set portrait orientation
  return this.orientation('portrait');
};
