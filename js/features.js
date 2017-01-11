//Add the features list
jviz.modules.karyoviewer.prototype.features = function(list)
{
  //Check the features list
  if(typeof list === 'undefined'){ return this; }

  //Check for array
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Reset the features list
  this._features.list = [];

  //Reset the features list by chromosomes
  this._features.chromosomes = {};

  //Reset the features counter list
  this._features.counter.list = {};

  //Read all the features
  for(var i = 0; i < list.length; i++)
  {
    //Get the feature
    var feature = list[i];

    //Initialize the new feature object
    var obj_feature = { posx: 0, posy: 0, width: 0, height: 0 };

    //Save the feature chromosome
    obj_feature.chromosome = feature.chromosome;

    //Save the feature start point
    obj_feature.start = parseInt(feature.start);

    //Save the feature end point
    obj_feature.end = (typeof feature.end === 'undefined') ? obj_feature.start : parseInt(feature.end);

    //Save the feature length
    obj_feature.length = Math.abs(obj_feature.end - obj_feature.start) + 1;

    //Save the feature index
    obj_feature.index = i;

    //Save the feature start position
    //obj.start = draw.height * (feature.start / this._chromosomes.max);

    //Save the feature end position
    //obj.end = draw.height * (feature.end / this._chromosomes.max);

    //feature width
    //obj.width = this._chromosomes.width;

    //feature height
    //obj.height = Math.max(Math.abs(obj.end - obj.start), 1);

    //Add the feature color
    obj_feature.color = (typeof feature.color === 'string') ? feature.color : this._features.color;

    //Check if chromosome exists
    if(typeof this._features.chromosomes[feature.chromosome] === 'undefined')
    {
      //Initialize this chromosome
      this._features.chromosomes[feature.chromosome] = [];

      //Add the features counter
      this._features.counter.list[feature.chromosome] = { rectangle: {}, triangle: [], text: {} };
    }

    //Add the index to the chromosome list
    this._features.chromosomes[feature.chromosome].push(i);

    //Add to the list
    this._features.list.push(obj_feature);
  }

  //Set to resize the features
  this._features.resized = false;

  //Continue
  return this;
};

//Resize the features data
jviz.modules.karyoviewer.prototype.featuresResize = function()
{
  //Get the draw info
  var draw = this._block.draw;

  //Get margins
  var margin = this._block.margin;

  //Read all the chromosomes
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosomes.list[i];

    //Check features on this chromosome
    if(typeof this._features.chromosomes[chr.name] === 'undefined'){ continue; }

    //Get the features list
    var features = this._features.chromosomes[chr.name];

    //Red all features
    for(var j in features)
    {
      //Get the feature object
      var feature = this._features.list[j];

      //Check for landscape
      if(this.isLandscape() === true)
      {
        //Save the feature width
        feature.width = Math.max(draw.width * feature.length / this._chromosomes.max, 1);

        //Save the feature height
        feature.height = this._chromosomes.height;

        //Save the feature position x
        feature.posx = chr.posx + draw.width * Math.min(feature.start, feature.end) / this._chromosomes.max;

        //Save the feature position y
        feature.posy = chr.posy;
      }

      //Check for portrait
      else
      {
        //Save the feature width for portrait
        feature.width = this._chromosomes.width;

        //Save the feature height for portrait
        feature.height = Math.max(draw.height * feature.length / this._chromosomes.max, 1);

        //Save the feature position x for portrait
        feature.posx = chr.posx;

        //Save the feature position y for portrait
        feature.posy = chr.posy + draw.height * Math.min(feature.start, feature.end) / this._chromosomes.max;
      }

      //Save the feature object
      this._features.list[j] = feature;
    }

    //Get the features counter object
    var counter = this._features.counter.list[chr.name];

    //Check for landscape
    if(this.isLandscape() === true)
    {
      //Add hte rectangle position x for landscape
      counter.rectangle.posx = chr.posx + chr.width + this._features.counter.triangle.height + this._features.counter.margin;

      //Add the rectangle position y for landscape
      counter.rectangle.posy = chr.posy + chr.height / 2 - this._features.counter.rectangle.height / 2;
    }

    //Check for portrait
    else
    {
      //Add the rectangle position x for portrait
      counter.rectangle.posx = chr.posx + chr.width / 2 - this._features.counter.rectangle.width / 2;

      //Add the rectangle position y for portrait
      counter.rectangle.posy = chr.posy  - this._features.counter.triangle.height - this._features.counter.rectangle.height;
    }

    //Add the text position x
    counter.text.posx = counter.rectangle.posx + this._features.counter.rectangle.width / 2;

    //Add the text position y
    counter.text.posy = counter.rectangle.posy + this._features.counter.rectangle.height / 2 - this._features.counter.text.margin;

    //Save the counter object
    this._features.counter.list[chr.name] = counter;
  }

  //Set features resized
  this._features.resized = true;

  //Continue
  return this;
};

//Draw the features
jviz.modules.karyoviewer.prototype.featuresDraw = function()
{
  //Get the canvas
  var canvas = this._canvas.el.layer(this._features.layer);

  //Read all the chromosomes
  for(var i = 0; i < this._chromosomes.list.length; i++)
  {
    //Get the chromosome
    var chr = this._chromosomes.list[i];

    //Check features on this chromosome
    if(typeof this._features.chromosomes[chr.name] === 'undefined'){ continue; }

    //Get the features list
    var features = this._features.chromosomes[chr.name];

    //Red all features
    for(var j in features)
    {
      //Get this feature
      var feature = this._features.list[j];

      //Draw the feature
      canvas.Rect({ x: feature.posx, y: feature.posy, width: feature.width, height: feature.height });

      //feature fill
      canvas.Fill({ color: feature.color, opacity: this._features.opacity });
      /*

      //Check the features triangle
      if(this._features.triangle.visible === false){ continue; }

      //Get the triangle configuration
      var triangle = this._features.triangle;

      //Initialize the triangle array
      var triangle_points = [];

      //Add the first point
      triangle_points.push([ feature.posx - triangle.margin - triangle.width, feature.posy - triangle.height ]);

      //Add the middle point
      triangle_points.push([ feature.posx - triangle.margin, feature.posy ]);

      //Add the first point
      triangle_points.push([ feature.posx - triangle.margin - triangle.width, feature.posy + triangle.height ]);

      //Add the line
      canvas.Line(triangle_points);

      //Fill the triangle
      canvas.Fill({ color: feature.color, opacity: this._features.triangle.opacity });
      */
    }

    //Check for drawing the features counter
    if(this._features.counter.visible === false){ continue; }

    //Check for no features
    if(features.length === 0){ continue; }

    //Get the features cunter object
    var counter = this._features.counter.list[chr.name];

    //Initialize the rectangle object
    var counter_rect = { x: counter.rectangle.posx, y: counter.rectangle.posy };

    //Add the counter rectangle width
    counter_rect.width = this._features.counter.rectangle.width;

    //Add the counter rectangle height
    counter_rect.height = this._features.counter.rectangle.height;

    //Add the rectangle radius
    counter_rect.radius = this._features.counter.rectangle.radius;

    //Draw the rectangle
    canvas.Rect(counter_rect);

    //Add the rectangle fill
    canvas.Fill({ color: this._features.color, opacity: this._features.counter.opacity });

    //Initialize the text object
    var counter_text = { text: features.length + '', x: counter.text.posx, y: counter.text.posy };

    //Add the text color
    counter_Text.color = this._features.counter.text.color;

    //Add the text font
    counter_text.font = this._features.counter.text.font;

    //Add the text size
    counter_text.size = this._features.counter.text.size;

    //Add the text align
    counter_text.align = this._features.counter.text.align;

    //Draw the text
    canvas.Text(counter_text);
  }

  //Exit
  return this;
};

//Get features by chromosome name
jviz.modules.karyoviewer.prototype.featuresByChromosome = function(name)
{
  //Check for no features on this chromosome
  if(typeof this._features.chromosomes[name] === 'undefined'){ return []; }
};
