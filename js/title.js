//Set the karyotype title
jviz.modules.karyoviewer.prototype.title = function(text)
{
  //Check for undefined text
  if(typeof text !== 'string'){ return this; }

  //Check for no panel element
  if(this._panel.visible === false){ return this; }

  //Set the panel title
  this._panel.el.title(text);

  //Continue
  return this;
};

//Set the karyotype detail
jviz.modules.karyoviewer.prototype.detail = function(text)
{
  //Check for undefined text
  if(typeof text !== 'string'){ return this; }

  //Check for no panel element
  if(this._panel.visible === false){ return this; }

  //Set the panel detail
  this._panel.el.detail(text);

  //Continue
  return this;
};
