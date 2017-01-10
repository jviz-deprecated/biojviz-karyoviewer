//Resize event
jviz.modules.karyoviewer.prototype.resize = function()
{
  //Set the canvas width
  //this._canvas.el.width(this._width);

  //Set the canvas height
  this._canvas.el.height(this._height);

  //Resize the canvas
  this._canvas.el.resize();

  //Save the full width
  this._width = this._canvas.el.width();

  //Save the full height
  //this._height = this._canvas.el.height();

  //Set to resize the chromosomes data
  this._chromosomes.resized = false;

  //Set to resize the features data
  this._features.resized = false;

  //Exit
  return this;
};
