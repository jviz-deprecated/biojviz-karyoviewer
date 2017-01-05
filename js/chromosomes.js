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
  this._centromere.list = [];

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
      this._centromere.list[i] = obj_cent;

      //Set that has centromere
      obj_chr.centromere = true;
    }

    //Save the chromosome object
    this._chromosome.list[i] = obj_chr;

    //Add the chromosome name
    this._chromosome.names[list[i].name] = i;
  }

  //Continue
  return this;
};

//Draw the chromosomes
jviz.modules.karyoviewer.prototype.chromosomesDraw = function()
{
  //Get the canvas draw zone
  var draw = this._canvas.el.draw();

  //Get the number of chromosomes
  var chr_num = this._chromosome.list.length;

  //Get the chromosomes margin
  this._chromosome.margin = (draw.width - chr_num * this._chromosome.width) / (chr_num - 1);

  //Get the middle layer
  var canvas = this._canvas.el.layer(this._chromosome.layer);

  //Draw all the chromosomes
  for(var i = 0; i < this._chromosome.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosome.list[i];

    //Calculate the chromosome position x
    chr.posx = draw.margin.left + (i + 0) * this._chromosome.margin + i * chr.width;

    //Calculate the chromosome position y
    chr.posy = draw.margin.top + draw.height - chr.height;

    //Draw the chromosome
    canvas.Rect({ x: chr.posx, y: chr.posy, width: chr.width, height: chr.height, radius: this._chromosome.radius });

    //Set the chromosome fill
    canvas.Fill({ color: this._chromosome.fill.color, opacity: this._chromosome.fill.opacity });

    //Add the chromosome name
    this._chromosome.text.text = chr.name + '';

    //Get the text position x
    this._chromosome.text.x = chr.posx + this._chromosome.width / 2;

    //Get the text position y
    this._chromosome.text.y = draw.margin.top + draw.height + this._chromosome.text.margin;

    //Draw the chromosome title
    canvas.Text(this._chromosome.text);

    //Check if has centromere
    if(chr.centromere !== true){ continue; }

    //Get the centromere object
    var cent = this._centromere.list[i];

    //Calculate the centromere position x
    cent.posx = chr.posx;

    //Centromere position y
    cent.posy = draw.margin.top + draw.height - chr.height + cent.start;

    //Clear the centromere region
    canvas.Clear({ x: cent.posx, y: cent.posy, width: cent.width, height: cent.height });

    //Centromere points
    var centp = [];

    //Add the top point
    centp.push([cent.posx, cent.posy]);

    //Add the middle point
    centp.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

    //Add the end point
    centp.push([cent.posx, cent.posy + cent.height]);

    //Add the end right
    centp.push([cent.posx + cent.width, cent.posy + cent.height]);

    //Add the middle right
    centp.push([cent.posx + cent.width / 2, cent.posy + cent.height / 2]);

    //Add the top right
    centp.push([cent.posx + cent.width, cent.posy]);

    //Draw the lines
    canvas.Line(centp);

    //Fill the centromere
    canvas.Fill({ color: this._centromere.fill.color, opacity: this._centromere.fill.opacity });
  }

  //Continue
  return this;
};
