//Add the regions list
jviz.modules.karyoviewer.prototype.regions = function(list)
{
  //Check the regions list
  if(typeof list === 'undefined'){ return this; }

  //Check for no chromosomes data
  if(this._chromosome.list.length === 0){ return console.error('No chromosomes data'); }

  //Check for array
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Get the draw zone
  var draw = this._canvas.el.draw();

  //Reset the regions list
  this._regions.list = {};

  //Read all the regions
  for(var i = 0; i < list.length; i++)
  {
    //Get the region
    var region = list[i];

    //Check the chromosome
    if(typeof this._regions.list[region.chromosome] === 'undefined')
    {
      //Add this chromosome
      this._regions.list[region.chromosome] = [];
    }

    //Initialize the new region object
    var obj = { posx: 0, posy: 0 };

    //Save the region start position
    obj.start = draw.height * (region.start / this._chromosome.max);

    //Save the region end position
    obj.end = draw.height * (region.end / this._chromosome.max);

    //Region width
    obj.width = this._chromosome.width;

    //Region height
    obj.height = Math.max(Math.abs(obj.end - obj.start), 1);

    //Add the region color
    obj.color = (typeof region.color === 'string') ? region.color : this._regions.color;

    //Add to the list
    this._regions.list[region.chromosome].push(obj);
  }

  //Resize the regions
  this.regionsResize();

  //Continue
  return this;
};

//Resize the regions data
jviz.modules.karyoviewer.prototype.regionsResize = function()
{
  //Get the draw zone
  var draw = this._canvas.el.draw();

  //Read all the chromosomes
  for(var i = 0; i < this._chromosome.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosome.list[i];

    //Check regions on this chromosome
    if(typeof this._regions.list[chr.name] === 'undefined'){ continue; }

    //Get the regions list
    var regions = this._regions.list[chr.name];

    //Red all regions
    for(var j = 0; j < regions.length; j++)
    {
      //Get this region
      var region = regions[j];

      //Save the region position x
      this._regions.list[chr.name][j].posx = chr.posx;

      //Save the region position y
      this._regions.list[chr.name][j].posy = draw.margin.top + draw.height - chr.height + region.start;
    }
  }

  //Update the label rectangle width
  this._regions.label.rectangle.width = 

  //Continue
  return this;
};

//Draw the regions
jviz.modules.karyoviewer.prototype.regionsDraw = function()
{
  //Get the canvas
  var canvas = this._canvas.el.layer(this._regions.layer);

  //Clear the canvas
  canvas.Clear();

  //Read all the chromosomes
  for(var i = 0; i < this._chromosome.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosome.list[i];

    //Check regions on this chromosome
    if(typeof this._regions.list[chr.name] === 'undefined'){ continue; }

    //Get the regions list
    var regions = this._regions.list[chr.name];

    //Red all regions
    for(var j = 0; j < regions.length; j++)
    {
      //Get this region
      var region = regions[j];

      //Draw the region
      canvas.Rect({ x: region.posx, y: region.posy, width: region.width, height: region.height });

      //Region fill
      canvas.Fill({ color: region.color, opacity: this._regions.opacity });

      //Check the regions triangle
      if(this._regions.triangle.visible === false){ continue; }

      //Get the triangle configuration
      var triangle = this._regions.triangle;

      //Initialize the triangle array
      var triangle_points = [];

      //Add the first point
      triangle_points.push([ region.posx - triangle.margin - triangle.width, region.posy - triangle.height ]);

      //Add the middle point
      triangle_points.push([ region.posx - triangle.margin, region.posy ]);

      //Add the first point
      triangle_points.push([ region.posx - triangle.margin - triangle.width, region.posy + triangle.height ]);

      //Add the line
      canvas.Line(triangle_points);

      //Fill the triangle
      canvas.Fill({ color: region.color, opacity: this._regions.triangle.opacity });
    }

    //Check for drawing the label
    if(this._regions.label.visible === false){ continue; }

    //Check for no regions
    if(regions.length === 0){ continue; }

    //
  }

  //Exit
  return this;
};
