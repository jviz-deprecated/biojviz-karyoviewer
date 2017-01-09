//Resize event
jviz.modules.karyoviewer.prototype.resize = function()
{
  //Set the canvas width
  //this._canvas.el.width(this._canvas.width);

  //Set the canvas height
  this._canvas.el.height(this._canvas.height);

  //Resize the canvas
  this._canvas.el.resize();

  //Set to resize the chromosomes data
  this._chromosome.resized = false;

  //Set to resize the features data
  this._features.resized = false;

  //Exit
  return this;
};
