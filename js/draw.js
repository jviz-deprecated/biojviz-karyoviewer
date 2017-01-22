//Draw
jviz.modules.karyoviewer.prototype.draw = function()
{
  //Set panel loading as true
  if(this._panel.visible){ this._panel.el.loading(true); }

  //Check if block is resized
  if(this._block.resized === false){ this.blockResize(); }

  //Check for chromosomes data not resized
  if(this._chromosomes.resized === false){ this.chromosomesResize(); }

  //Check for features data no resized
  if(this._features.resized === false){ this.featuresResize(); }

  //Clear all layers
  this._canvas.el.clear();

  //Reset the label
  this._label.active = false;

  //Draw the chromosomes
  this.chromosomesDraw();

  //Draw the features
  this.featuresDraw();

  //Set panel loading as false
  if(this._panel.visible){ this._panel.el.loading(false); }

  //Continue
  return this;
};
