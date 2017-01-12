//Add a chromosomes list
jviz.modules.karyoviewer.prototype.chromosomes = function(list, isExample)
{
  //Check the list
  if(typeof list === 'undefined'){ return this._chromosomes.list; }

  //Check the is exemple option
  if(typeof isExample !== 'booelan'){ var isExample = false; }

  //Check for array
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Initialize the chromosomes list
  this._chromosomes.list = [];

  //Reset the chromosomes index
  this._chromosomes.index = {};

  //Reset the centromere list
  this._chromosomes.centromere.list = [];

  //Reset the chromosomes name list
  this._chromosomes.name.list = [];

  //Check the list length
  if(list.length === 0){ return this.draw(); }

  //Find the max value
  this._chromosomes.max = jviz.array.maxKey(list, 'length');

  //Read all the chromosomes on the list
  for(var i = 0; i < list.length; i++)
  {
    //Initialize the new chromosomes object
    var obj_chr = { posx : 0, posy : 0, width: 0, height: 0 };

    //Save the chromosome name
    obj_chr.name = list[i].name.toString();

    //Save the chromosome length
    obj_chr.length = list[i].length;

    //Set if has centromere
    obj_chr.centromere = false;

    //Check for centromere
    if(typeof list[i].centromere_start !== 'undefined' && typeof list[i].centromere_end !== 'undefined')
    {
      //Initialize the centromere object
      var obj_cent = { posx: 0, posy: 0, width: 0, height: 0, points: [] };

      //Centromere start position
      obj_cent.start = parseInt(list[i].centromere_start);

      //Centromere end position
      obj_cent.end = parseInt(list[i].centromere_end);

      //Calculate the centromere length
      obj_cent.length = Math.abs(obj_cent.end - obj_cent.start);

      //Save the centromere object
      this._chromosomes.centromere.list[i] = obj_cent;

      //Set that has centromere
      obj_chr.centromere = true;
    }

    //Save the chromosome name object
    this._chromosomes.name.list[i] = { posx: 0, posy: 0 };

    //Save the chromosome object
    this._chromosomes.list[i] = obj_chr;

    //Add the chromosome index
    this._chromosomes.index[obj_chr.name] = i;
  }

  //Save the number of chromosomes
  this._chromosomes.num = list.length;

  //Set chromosomes data is not resized
  this._chromosomes.resized = false;

  //Set blocks object not resized
  this._block.resized = false;

  //Continue
  return this;
};

//Resize the chromosomes
jviz.modules.karyoviewer.prototype.chromosomesResize = function()
{
  //Get the draw info
  var draw = this._block.draw;

  //Get margins
  var margin = this._block.margin;

  //Draw all the chromosomes
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosomes.list[i];

    //Check for landscape orientation
    if(this.isLandscape() === true)
    {
      //Calculate the chromosome width for landspace orientation
      chr.width = draw.width * (chr.length / this._chromosomes.max);

      //Calculate hte chromosome height for landscape orientation
      chr.height = this._chromosomes.height;

      //Calculate the chromosome position x for landscape orientation
      chr.posx = margin.left;

      //Calculate the chromosome position y for landscape orientation
      chr.posy = margin.top + i * this._block.height;

      //Get the chromosome radius
      chr.radius = this._chromosomes.radius.landscape;
    }

    //Calculate for portrait
    else
    {
      //Calculate the chromosome width for portrait orientation
      chr.width = this._chromosomes.width;

      //Calculate the chromosome height for portrait orientation
      chr.height = draw.height * (chr.length / this._chromosomes.max);

      //Calculate the chromosome position x for portrait orientation
      chr.posx = margin.left + i * this._block.width;

      //Calculate the chromosome position y for portrait orientation
      chr.posy = margin.top + draw.height - chr.height;

      //Get the chromosome radius
      chr.radius = this._chromosomes.radius.portrait;
    }

    //Save the chromosome values
    this._chromosomes.list[i] = chr;

    //Get the chromosome name object
    var name = this._chromosomes.name.list[i];

    //Calculate for landscape
    if(this.isLandscape() === true)
    {
      //Calculate the name position x for landscape
      name.posx = margin.left / 2;

      //Calculate the name position y for landscape
      name.posy = chr.posy + chr.height / 2 - this._chromosomes.name.margin;
    }

    //Calculate for portrait
    else
    {
      //Calculate the name position x for portrait
      name.posx = chr.posx + chr.width / 2;

      //Calculate the name position y for portrait
      name.posy = margin.top + draw.height + margin.bottom / 2 - this._chromosomes.name.margin;
    }

    //Save the name object
    this._chromosomes.name.list[i] = name;

    //Check for centromere
    if(chr.centromere === false){ continue; }

    //Get the centromere object
    var cent = this._chromosomes.centromere.list[i];

    //Check for landscape orientation
    if(this.isLandscape() === true)
    {
      //Calculate the centromere width for landscape orientation
      cent.width = draw.width * cent.length / this._chromosomes.max;

      //Calculate the centromere height for landscape orientation
      cent.height = this._chromosomes.height;

      //Calculate the centromere position x for landscape orientation
      cent.posx = chr.posx + draw.width * cent.start / this._chromosomes.max;

      //Calculate the centromere position y for landscape orientation
      cent.posy = chr.posy;
    }

    //Calculate for portrait orientation
    else
    {
      //Calculate the centromere width for portrait orientation
      cent.width = this._chromosomes.width;

      //Calculate the centromere height for portrait orientation
      cent.height = draw.height * cent.length / this._chromosomes.max;

      //Calculate the centromere position x for portrait orientation
      cent.posx = chr.posx;

      //Calculate the centromere position y for portrait orientation
      cent.posy = chr.posy + draw.height * cent.start / this._chromosomes.max;
    }

    //Reset the centromere points
    cent.points = [];

    //Add the top point
    cent.points.push([cent.posx, cent.posy]);

    //Add the middle point
    cent.points.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

    //Add the end point
    if(this.isLandscape() === true)
    {
      //Add the end point for landscape
      cent.points.push([cent.posx + cent.width, cent.posy]);
    }
    else
    {
      //Add the end point for portrait
      cent.points.push([cent.posx, cent.posy + cent.height]);
    }

    //Add the end right
    cent.points.push([cent.posx + cent.width, cent.posy + cent.height]);

    //Add the middle right
    cent.points.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

    //Add the top right
    if(this.isLandscape() === true)
    {
      //Add the top right point for landscape
      cent.points.push([cent.posx, cent.posy + cent.height]);
    }
    else
    {
      //Add the top right point for portrait
      cent.points.push([cent.posx + cent.width, cent.posy]);
    }

    //Save the centromere object
    this._chromosomes.centromere.list[i] = cent;
  }

  //Set chromosomes data resized
  this._chromosomes.resized = true;

  //Exit
  return this;
};

//Draw the chromosomes
jviz.modules.karyoviewer.prototype.chromosomesDraw = function()
{
  //Get the chromosome layer
  var canvas = this._canvas.el.layer(this._chromosomes.layer);

  //Draw all the chromosomes
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Get the chromosome info
    var chr = this._chromosomes.list[i];

    //Draw the chromosome
    canvas.Rect({ x: chr.posx, y: chr.posy, width: chr.width, height: chr.height, radius: chr.radius });

    //Set the chromosome fill
    canvas.Fill({ color: this._chromosomes.color, opacity: this._chromosomes.opacity });

    //Get the chromosome name info
    var name = this._chromosomes.name.list[i];

    //Draw the name text
    canvas.Text(jviz.object.extend(this._chromosomes.name.text, { text: chr.name, x: name.posx, y: name.posy }));

    //Check if has centromere
    if(chr.centromere !== true){ continue; }

    //Get the centromere object
    var cent = this._chromosomes.centromere.list[i];

    //Clear the centromere region
    canvas.Clear({ x: cent.posx, y: cent.posy, width: cent.width, height: cent.height });

    //Draw the centromere lines
    canvas.Line(cent.points);

    //Fill the centromere
    canvas.Fill({ color: this._chromosomes.color, opacity: this._chromosomes.centromere.opacity });
  }

  //Continue
  return this;
};

//Get a chromosome by index
jviz.modules.karyoviewer.prototype.chromosomeByIndex = function(index)
{
  //Check the index
  if(index < 0 || index >= this._chromosomes.list.length){ return false; }
  
  //Get the chromosome information by index
  return this._chromosomes.list[index];
};

//Get a chromosome by name
jviz.modules.karyoviewer.prototype.chromosomeByName = function(name)
{
  //Get the chromosome index
  var index = this._chromosomes.index[name];

  //Check for undefined index
  if(typeof index === 'undefined'){ return false; }

  //Return the chromosome object
  return this.chromosomeByIndex(index);
};

//Get a chromosome by position
jviz.modules.karyoviewer.prototype.chromosomeByPosition = function(x, y)
{
  //Read all the chromosomes
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Check the x coordinate
    if(x < this._chromosomes.list[i].posx){ return false; }

    //Check the y coordinate
    if(y < this._chromosomes.list[i].posy){ return false; }

    //Check the x coordinate
    if(this._chromosomes.list[i].posx + this._chromosomes.list[i].width < x){ continue; }

    //Check the y coordinate
    if(this._chromosomes.list[i].posy + this._chromosomes.list[i].height < y){ continue; }

    //Return the chromosome
    return this._chromosomes.list[i];
  }

  //Default, return false
  return false;
};
