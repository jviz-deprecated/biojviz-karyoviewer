//Add a chromosomes list
jviz.modules.karyoviewer.prototype.chromosomes = function(list)
{
  //Check the list
  if(typeof list === 'undefined'){ return this; }

  //Check for array
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Initialize the chromosomes list
  this._chromosome.list = [];

  //Reset the centromere list
  this._chromosome.centromere.list = [];

  //Reset the chromosomes text list
  this._chromosome.text.list = [];

  //Check the list length
  if(list.length === 0){ return this.draw(); }

  //Find the max value
  var max_length = jviz.array.maxKey(list, 'length');

  //Get the canvas draw
  var draw = this._canvas.el.draw();

  //Read all the chromosomes on the list
  for(var i = 0; i < list.length; i++)
  {
    //Initialize the new chromosomes object
    var obj_chr = { posx : 0, posy : 0 };

    //Save the chromosome name
    obj_chr.name = list[i].name;

    //Calculate the chromosome width
    obj_chr.width = this._chromosome.width;

    //Calculate the chromosome height
    obj_chr.height = draw.height * (list[i].length / max_length);

    //Set if has centromere
    obj_chr.centromere = false;

    //Check for centromere
    if(typeof list[i].centromere_start !== 'undefined' && typeof list[i].centromere_end !== 'undefined')
    {
      //Initialize the centromere object
      var obj_cent = { posx: 0, posy: 0 };

      //Centromere width
      obj_cent.width = this._chromosome.width;

      //Centromere start
      obj_cent.start = draw.height * (list[i].centromere_start / max_length);

      //Centromere end
      obj_cent.end = draw.height * (list[i].centromere_end / max_length);

      //Centromere height
      obj_cent.height = Math.abs(obj_cent.end - obj_cent.start);

      //Save the centromere object
      this._chromosome.centromere.list[i] = obj_cent;

      //Set that has centromere
      obj_chr.centromere = true;
    }

    //Save the chromosomes text
    this._chromosome.text.list.push({ posx: 0, posy: 0 });

    //Save the chromosome object
    this._chromosome.list[i] = obj_chr;

    //Add the chromosome name
    this._chromosome.names[list[i].name] = i;
  }

  //Save the chromosome max length
  this._chromosome.max = max_length;

  //Resize the chromosomes
  this.chromosomesResize();

  //Continue
  return this;
};

//Resize the chromosomes
jviz.modules.karyoviewer.prototype.chromosomesResize = function()
{
  //Get the draw info
  var draw = this._canvas.el.draw();

  //Get the number of chromosomes
  var chr_num = this._chromosome.list.length;

  //Get the chromosomes margin
  this._chromosome.margin = (draw.width - chr_num * this._chromosome.width) / (chr_num - 1);

  //Draw all the chromosomes
  for(var i = 0; i < this._chromosome.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosome.list[i];

    //Calculate the chromosome position x
    this._chromosome.list[i].posx = draw.margin.left + (i + 0) * this._chromosome.margin + i * chr.width;

    //Calculate the chromosome position y
    this._chromosome.list[i].posy = draw.margin.top + draw.height - chr.height;

    //Get the text position x
    this._chromosome.text.list[i].posx = chr.posx + this._chromosome.width / 2;

    //Get the text position y
    this._chromosome.text.list[i].posy = draw.margin.top + draw.height + this._chromosome.text.margin;

    //Check for centromere
    if(chr.centromere === false){ continue; }

    //Get the centromere object
    var cent = this._chromosome.centromere.list[i];

    //Calculate the centromere position x
    this._chromosome.centromere.list[i].posx = this._chromosome.list[i].posx;

    //Centromere position y
    this._chromosome.centromere.list[i].posy = draw.margin.top + draw.height - chr.height + cent.start;
  }

  //Exit
  return this;
};

//Draw the chromosomes
jviz.modules.karyoviewer.prototype.chromosomesDraw = function()
{
  //Get the chromosome layer
  var canvas = this._canvas.el.layer(this._chromosome.layer);

  //Draw all the chromosomes
  for(var i = 0; i < this._chromosome.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosome.list[i];

    //Draw the chromosome
    canvas.Rect({ x: chr.posx, y: chr.posy, width: chr.width, height: chr.height, radius: this._chromosome.radius });

    //Set the chromosome fill
    canvas.Fill({ color: this._chromosome.color, opacity: this._chromosome.opacity });

    //Get the text object
    var text = this._chromosome.text.list[i];

    //Get the text font
    var text_font = this._chromosome.text.font;

    //Get the text size
    var text_size = this._chromosome.text.size;

    //Get the text color
    var text_color = this._chromosome.color;

    //Get the text align
    var text_align = this._chromosome.text.align;

    //Draw the chromosome title
    canvas.Text({ text: chr.name, x: text.posx, y: text.posy, font: text_font, size: text_size, color: text_color, align: text_align });

    //Check if has centromere
    if(chr.centromere !== true){ continue; }

    //Get the centromere object
    var cent = this._chromosome.centromere.list[i];

    //Clear the centromere region
    canvas.Clear({ x: cent.posx, y: cent.posy, width: cent.width, height: cent.height });

    //Centromere points
    var cent_points = [];

    //Add the top point
    cent_points.push([cent.posx, cent.posy]);

    //Add the middle point
    cent_points.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

    //Add the end point
    cent_points.push([cent.posx, cent.posy + cent.height]);

    //Add the end right
    cent_points.push([cent.posx + cent.width, cent.posy + cent.height]);

    //Add the middle right
    cent_points.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

    //Add the top right
    cent_points.push([cent.posx + cent.width, cent.posy]);

    //Draw the lines
    canvas.Line(cent_points);

    //Fill the centromere
    canvas.Fill({ color: this._chromosome.color, opacity: this._chromosome.centromere.opacity });
  }

  //Continue
  return this;
};
