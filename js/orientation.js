//Manage the orientation
jviz.modules.karyoviewer.prototype.orientation = function(value)
{
  //Check the orientation value
  if(typeof value !== 'string'){ return this._orientation.actual; }

  //convert to lower case
  value = value.toLowerCase();

  //Parse the orientation
  if(['portrait', 'landscape'].indexOf(value) === -1){ value = 'portrait'; }

  //Save the orientation
  this._orientation.actual = value;

  //Continue
  return this;
};
