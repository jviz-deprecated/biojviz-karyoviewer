//Build the Karyotype
jviz.modules.karyoviewer.prototype.build = function()
{
  //Append the module
  jviz.dom.append(this._parent, { id: this._id, class: this._class });

  //Check the panel
  if(this._panel.visible === true)
  {
    //Add the panel
    this._panel.el = new jviz.components.panel(this._panel);

    //Update the canvas panel
    this._canvas.parent = this._panel.el.body();
  }

  //Build the canvas layer
  this._canvas.el = new jviz.components.canvas(this._canvas);

  //Add the canvas margin
  //this._canvas.el.margin(this._margin);

  //Return this
  return this;
};
