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

  //Reset the chromosomes draw list
  this._chromosomes.draw = [];

  //Reset the centromere list
  this._chromosomes.centromere.list = [];

  //Reset the chromosomes name list
  this._chromosomes.name.list = [];

  //Reset the chromosomes max value
  this._chromosomes.max = 0;

  //Check the list length
  if(list.length === 0){ return this.draw(); }

  //Index counter
  var index = 0;

  //Read all the chromosomes on the list
  for(var i = 0; i < list.length; i++)
  {
    //Clone the chromosome object
    //var chr = Object.assign({}, list[i]);
    var chr = list[i];

    //Check for undefined chromosome name
    if(typeof chr.name === 'undefined'){ console.error('Undefined name at chromosome ' + i); continue; }

    //Check for undefined chromosome length
    if(typeof chr.length === 'undefined'){ console.error('Undefined length at chromosome ' + i); continue; }

    //Parse the chromosome name
    chr.name = chr.name.toString();

    //Parse the chromosome length
    chr.length = parseInt(chr.length);

    //Check the max value
    this._chromosomes.max = Math.max(this._chromosomes.max, chr.length);

    //Initialize if has centromere
    var has_centromere = false;

    //Check for centromere
    if(typeof chr.centromere_start !== 'undefined' && typeof chr.centromere_end !== 'undefined')
    {
      //Parse the centromere start position
      chr.centromere_start = parseInt(chr.centromere_start);

      //Parse the centromere end position
      chr.centromere_end = parseInt(centromere_end);

      //Calculate the centromere length
      chr.centromere_length = Math.abs(chr.centromere_end - chr.centromere_start);

      //Set that has centromere
      has_centromere = true;
    }

    //Save the chromosome object
    this._chromosomes.list.push(chr);

    //Save the chromosome name object
    this._chromosomes.name.list.push({ posx: 0, posy: 0 });

    //Save the centromere object
    this._chromosomes.centromere.list.push({ posx: 0, posy: 0, width: 0, height: 0, points: [] });

    //Save the chromosomes draw object
    this._chromosomes.draw.push({ posx : 0, posy : 0, width: 0, height: 0, index: index, has_centromere: has_centromere });

    //Increment the index
    index = index + 1;
  }

  //Save the number of chromosomes
  this._chromosomes.num = this._chromosomes.list.length;

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
    //Get the chromosome info
    var chr_info = this._chromosomes.list[i];

    //Get the chromosome draw object
    var chr_draw = this._chromosomes.draw[i];

    //Check for landscape orientation
    if(this.isLandscape() === true)
    {
      //Calculate the chromosome width for landscape orientation
      chr_draw.width = draw.width * (chr.length / this._chromosomes.max);

      //Calculate hte chromosome height for landscape orientation
      chr_draw.height = this._chromosomes.height;

      //Calculate the chromosome position x for landscape orientation
      chr_draw.posx = margin.left;

      //Calculate the chromosome position y for landscape orientation
      chr_draw.posy = margin.top + i * this._block.height;

      //Get the chromosome radius
      chr_draw.radius = this._chromosomes.radius.landscape;
    }

    //Calculate for portrait
    else
    {
      //Calculate the chromosome width for portrait orientation
      chr_draw.width = this._chromosomes.width;

      //Calculate the chromosome height for portrait orientation
      chr_draw.height = draw.height * (chr.length / this._chromosomes.max);

      //Calculate the chromosome position x for portrait orientation
      chr_draw.posx = margin.left + i * this._block.width;

      //Calculate the chromosome position y for portrait orientation
      chr_draw.posy = margin.top + draw.height - chr_draw.height;

      //Get the chromosome radius
      chr_draw.radius = this._chromosomes.radius.portrait;
    }

    //Save the chromosome values
    this._chromosomes.draw[i] = chr_draw;

    //Get the chromosome name object
    var chr_name = this._chromosomes.name.list[i];

    //Calculate for landscape
    if(this.isLandscape() === true)
    {
      //Calculate the name position x for landscape
      chr_name.posx = margin.left / 2;

      //Calculate the name position y for landscape
      chr_name.posy = chr_draw.posy + chr_draw.height / 2 - this._chromosomes.name.margin;
    }

    //Calculate for portrait
    else
    {
      //Calculate the name position x for portrait
      chr_name.posx = chr_draw.posx + chr_draw.width / 2;

      //Calculate the name position y for portrait
      chr_name.posy = margin.top + draw.height + margin.bottom / 2 - this._chromosomes.name.margin;
    }

    //Save the name object
    this._chromosomes.name.list[i] = chr_name;

    //Check for centromere
    if(chr_draw.has_centromere === false){ continue; }

    //Get the centromere object
    var chr_cent = this._chromosomes.centromere.list[i];

    //Check for landscape orientation
    if(this.isLandscape() === true)
    {
      //Calculate the centromere width for landscape orientation
      chr_cent.width = draw.width * chr.centromere_length / this._chromosomes.max;

      //Calculate the centromere height for landscape orientation
      chr_cent.height = this._chromosomes.height;

      //Calculate the centromere position x for landscape orientation
      chr_cent.posx = chr_draw.posx + draw.width * chr.centromere_start / this._chromosomes.max;

      //Calculate the centromere position y for landscape orientation
      chr_cent.posy = chr_draw.posy;
    }

    //Calculate for portrait orientation
    else
    {
      //Calculate the centromere width for portrait orientation
      chr_cent.width = this._chromosomes.width;

      //Calculate the centromere height for portrait orientation
      chr_cent.height = draw.height * chr.centromere_length / this._chromosomes.max;

      //Calculate the centromere position x for portrait orientation
      chr_cent.posx = chr_draw.posx;

      //Calculate the centromere position y for portrait orientation
      chr_cent.posy = chr_draw.posy + draw.height * chr.centromere_start / this._chromosomes.max;
    }

    //Reset the centromere points
    chr_cent.points = [];

    //Add the top point
    chr_cent.points.push([chr_cent.posx, chr_cent.posy]);

    //Add the middle point
    chr_cent.points.push([chr_cent.posx + chr_cent.width / 2, chr_cent.posy + chr_cent.height / 2]);

    //Add the end point
    if(this.isLandscape() === true)
    {
      //Add the end point for landscape
      chr_cent.points.push([chr_cent.posx + chr_cent.width, chr_cent.posy]);
    }
    else
    {
      //Add the end point for portrait
      chr_cent.points.push([chr_cent.posx, chr_cent.posy + chr_cent.height]);
    }

    //Add the end right
    chr_cent.points.push([chr_cent.posx + chr_cent.width, chr_cent.posy + chr_cent.height]);

    //Add the middle right
    chr_cent.points.push([chr_cent.posx + chr_cent.width / 2, chr_cent.posy + chr_cent.height / 2]);

    //Add the top right
    if(this.isLandscape() === true)
    {
      //Add the top right point for landscape
      chr_cent.points.push([chr_cent.posx, chr_cent.posy + chr_cent.height]);
    }
    else
    {
      //Add the top right point for portrait
      chr_cent.points.push([chr_cent.posx + chr_cent.width, chr_cent.posy]);
    }

    //Save the centromere object
    this._chromosomes.centromere.list[i] = chr_cent;
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

    //Get the chromosome draw info
    var chr_draw = this._chromosomes.draw[i];

    //Draw the chromosome
    canvas.Rect({ x: chr_draw.posx, y: chr_draw.posy, width: chr_draw.width, height: chr_draw.height, radius: chr_draw.radius });

    //Set the chromosome fill
    canvas.Fill({ color: this._chromosomes.color, opacity: this._chromosomes.opacity });

    //Get the chromosome name info
    var chr_name = this._chromosomes.name.list[i];

    //Draw the name text
    canvas.Text(jviz.object.extend(this._chromosomes.name.text, { text: chr.name, x: chr_name.posx, y: chr_name.posy }));

    //Check if has centromere
    if(chr_draw.has_centromere !== true){ continue; }

    //Get the centromere object
    var chr_cent = this._chromosomes.centromere.list[i];

    //Clear the centromere region
    canvas.Clear({ x: chr_cent.posx, y: chr_cent.posy, width: chr_cent.width, height: chr_cent.height });

    //Draw the centromere lines
    canvas.Line(chr_cent.points);

    //Fill the centromere
    canvas.Fill({ color: this._chromosomes.color, opacity: this._chromosomes.centromere.opacity });
  }

  //Continue
  return this;
};

//Update the chromosomes info
jviz.modules.karyoviewer.prototype.chromosomesMap = function(fn)
{
  //Check the function
  if(typeof fn !== 'function'){ return this; }

  //Read all the chromosomes objects
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosomes.list[i];

    //Update the chromosome
    var new_chr = fn(chr, i);

    //Check the new chromosome
    if(typeof new_chr !== 'object'){ continue; }

    //Update the chromosome
    this._chromosomes.list[i] = Object.assign(chr, new_chr);
  }

  //Return this
  return this;
};
