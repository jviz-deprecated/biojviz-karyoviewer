//Manage the orientation
jviz.modules.karyoviewer.prototype.orientation = function(value)
{
  //Check the orientation value
  if(typeof value !== 'string'){ return this._orientation.actual; }

  //convert to lower case
  value = value.toLowerCase();
  
  //Save the orientation
  this._orientation.actual = (this._orientation.values.indexOf(value) === -1) ? this._orientation.default : value;

  //Continue
  return this;
};
