//Add a chromosomes list
jviz.modules.karyoviewer.prototype.chromosomes = function(list, isExample)
{
  //Check the list
  if(typeof list === 'undefined'){ return this; }

  //Check the is exemple option
  if(typeof isExample !== 'booelan'){ var isExample = false; }

  //Check for array
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Initialize the chromosomes list
  this._chromosomes.list = [];

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

    //Save the chromosomes text
    //this._chromosomes.text.list.push({ posx: 0, posy: 0 });

    //Save the chromosome object
    this._chromosomes.list[i] = obj_chr;

    //Add the chromosome name
    //this._chromosomes.names[list[i].name] = i;
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

    //Get the text position x
    //this._chromosomes.text.list[i].posx = chr.posx + this._chromosomes.width / 2;

    //Get the text position y
    //this._chromosomes.text.list[i].posy = draw.margin.top + draw.height + this._chromosomes.text.margin;

    //Check for centromere
    if(chr.centromere === false){ continue; }

    //Get the centromere object
    var cent = this._chromosomes.centromere.list[i];

    //Reset the centromere points
    cent.points = [];

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

      //Add the top point
      cent.points.push([cent.posx, cent.posy]);

      //Add the middle point
      cent.points.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

      //Add the end point
      cent.points.push([cent.posx + cent.width, cent.posy]);

      //Add the end right
      cent.points.push([cent.posx + cent.width, cent.posy + cent.height]);

      //Add the middle right
      cent.points.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

      //Add the top right
      cent.points.push([cent.posx, cent.posy + cent.height]);
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

      //Add the top point
      cent.points.push([cent.posx, cent.posy]);

      //Add the middle point
      cent.points.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

      //Add the end point
      cent.points.push([cent.posx, cent.posy + cent.height]);

      //Add the end right
      cent.points.push([cent.posx + cent.width, cent.posy + cent.height]);

      //Add the middle right
      cent.points.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

      //Add the top right
      cent.points.push([cent.posx + cent.width, cent.posy]);
    }

    //Calculate the centromere position x
    //this._chromosomes.centromere.list[i].posx = this._chromosomes.list[i].posx;

    //Centromere position y
    //this._chromosomes.centromere.list[i].posy = draw.margin.top + draw.height - chr.height + cent.start;

    //Centromere start
    //obj_cent.start = draw.height * (list[i].centromere_start / max_length);

    //Centromere end
    //obj_cent.end = draw.height * (list[i].centromere_end / max_length);

    //Centromere height
    //obj_cent.height = Math.abs(obj_cent.end - obj_cent.start);

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
    /*

    //Get the text object
    var text = this._chromosomes.text.list[i];

    //Get the text font
    var text_font = this._chromosomes.text.font;

    //Get the text size
    var text_size = this._chromosomes.text.size;

    //Get the text color
    var text_color = this._chromosomes.color;

    //Get the text align
    var text_align = this._chromosomes.text.align;

    //Draw the chromosome title
    canvas.Text({ text: chr.name, x: text.posx, y: text.posy, font: text_font, size: text_size, color: text_color, align: text_align });

    */

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
