//Resize the block object
jviz.modules.karyoviewer.prototype.blockResize = function()
{
  //Get the number of chromosomes
  var num = this._chromosomes.num;

  //Calculate for landscape orientation
  if(this.isLandscape() === true)
  {
    //Get the default values for landscape
    var def = this._block.default.landscape;

    //Set the margins
    this._block.margin = { top: def.margin_top, bottom: def.margin_bottom, left: def.margin_left, right: def.margin_right };

    //Get the block draw width
    this._block.draw.width = this._width - this._block.margin.left - this._block.margin.right;

    //Get the block draw height
    this._block.draw.height = def.draw_height;
  }

  //Calculate for portrait orientation
  else
  {
    //Get the default values for portrait
    var def = this._block.default.portrait;

    //Set the margins
    this._block.margin = { top: def.margin_top, bottom: def.margin_bottom };

    //Set the margin left
    this._block.margin.left = (this._width - def.draw_width * num) / (2 * num);

    //Set the margin right
    this._block.margin.right = (this._width - def.draw_width * num) / (2 * num);

    //Get the block draw width
    this._block.draw.width = def.draw_width;

    //Get the block draw height
    this._block.draw.height = def.draw_height;
  }

  //Get the block width
  this._block.width = this._block.margin.left + this._block.margin.right + this._block.draw.width;

  //Get the block height
  this._block.height = this._block.margin.top + this._block.margin.bottom + this._block.draw.height;

  //Calculate the new canvas height
  this._height = (this.isLandscape() === true) ? this._block.height * num : this._block.height;

  //Set the canvas height
  this._canvas.el.height(this._height);

  //Set block resized
  this._block.resized = true;

  //Continue
  return this;
};
