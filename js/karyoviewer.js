//Karyoviewer object
jviz.modules.karyoviewer = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the ideogram ID
  this._id = (typeof opt.id === 'undefined') ? jviz.misc.getID({ prefix: 'karyoviewer', length: 5 }) : opt.id;

  //Save the ideogram class
  this._class = (typeof opt.class === 'undefined') ? 'jviz-modules-karyoviewer' : opt.class;

  //Parent element
  this._parent = opt.parent;

  //Orientation
  this._orientation = (typeof opt.orientation === 'string') ? opt.orientation.toLowerCase() : 'portrait';

  //Check for unknown orientation
  this._orientation = (['portrait', 'landscape'].indexOf(this._orientation) === -1) ? 'portrait' : this._orientation;

  //Default size
  this._width = 0; //Default width
  this._height = 0; //Default height

  //Margins
  this._margin = { top: 30, bottom: 30, left: 40, right: 40 };

  //Panel object
  this._panel = {};
  this._panel.el = null; //Panel element
  this._panel.id = this._id + '-panel'; //Panel id
  this._panel.parent = this._id; //Panel parent
  this._panel.title = (typeof opt.title === 'string') ? opt.title : 'Karyotype viewer'; //Panel title
  this._panel.detail = (typeof opt.detail === 'string') ? opt.detail : ''; //Panel detail
  this._panel.detail = ''; //Panel detail
  this._panel.visible = (typeof opt.panel === 'boolean') ? opt.panel : true; //Panel is visible

  //Canvas object
  this._canvas = {};
  this._canvas.id = this._id + '-canvas'; //Canvas ID
  this._canvas.parent = this._id; //Parent canvas ID
  this._canvas.width = '100%'; //Canvas width
  this._canvas.height = 0; //Canvas height
  this._canvas.layers = 3; //Number of layers
  this._canvas.el = null; //Canvas element

  //Chromosome info
  this._chromosome = {};
  this._chromosome.width = 15; //Chromosome default width
  this._chromosome.height = 50; //Chromosome default height
  this._chromosome.layer = 1; //Chromosome layer
  this._chromosome.list = []; //Chromosomes list
  this._chromosome.names = {}; //Chromosome names
  this._chromosome.max = 0; //Chromosome max length
  this._chromosome.margin = 0; //Chromosome margin
  this._chromosome.num = 0; //Number of chromosomes
  this._chromosome.color = jviz.colors.blue2.hex; //Chromosome color
  this._chromosome.opacity = 0.6; //Chromosome opacity
  this._chromosome.resized = false; //Chromosome data is resized

  //Chromosome radius
  this._chromosome.radius = {};
  this._chromosome.radius.portrait = 6; //Chromosome radius for portrait
  this._chromosome.radius.landscape = 20; //Chromosome radius for landscape

  //Chromosome text info
  this._chromosome.text = {};
  this._chromosome.text.list = []; //Chromosomes text
  this._chromosome.text.font = jviz.font.default; //Text font
  this._chromosome.text.size = '11px'; //Text size
  this._chromosome.text.align = 'center'; //Chromosomes text align
  this._chromosome.text.margin = 5; //Chromosomes text margin top

  //Centromere
  this._chromosome.centromere = {};
  this._chromosome.centromere.list = []; //List of centromere positions
  this._chromosome.centromere.opacity = 0.9; //Centromere opacity

  //Check the features object
  if(typeof opt.features === 'undefined'){ opt.features = {}; }

  //Features object
  this._features = {};
  this._features.list = []; //List of features
  this._features.layer = 2; //Features layer
  this._features.color = (typeof opt.features.color === 'string') ? opt.features.color : jviz.colors.red.hex; //Features default color
  this._features.opacity = 0.8; //Features opacity
  this._features.resized = false; //Features data is resized

  //Features triangle
  this._features.triangle = {};
  this._features.triangle.width = 6; //Features triangle width
  this._features.triangle.height = 4; //Features triangle height
  this._features.triangle.margin = 1; //Features triangle mrgin
  this._features.triangle.opacity = 0.6; //Features triangle opacity
  this._features.triangle.visible = (typeof opt.features.triangle === 'boolean') ? opt.features.triangle : true; //Triangle visible

  //Features label
  this._features.label = {};
  this._features.label.opacity = 1.0; //Features label opacity
  this._features.label.visible = (typeof opt.features.label === 'boolean') ? opt.features.label : true; //Label visible

  //Features label rectangle
  this._features.label.rectangle = {};
  this._features.label.rectangle.width = 0; //Features label rectangle width
  this._features.label.rectangle.height = 0; //Features label rectangle height
  this._features.label.rectangle.radius = 5; //Features label rectangle radius

  //Chromosomes hover
  this._hover = {};
  this._hover.index = -1; //Hover chromosome index
  this._hover.margin = { top: 10, bottom: 20, left: 10, right: 10 }; //Hover margin
  this._hover.color = jviz.colors.white.hex; //Hover background color
  this._hover.opacity = 1.0; //Hover background color opacity
  this._hover.radius = 10; //Hover radius
  this._hover.layer = 0; //Hover layer

  //Check for undefined orientation
  if(typeof opt.orientation !== 'string'){ opt.orientation = 'portrait'; } 

  //Parse the orientation
  this.orientation(opt.orientation);

  //Build the karyotype element
  this.build();

  //Register the events
  this.events();

  //Resize the canvas
  this.resize();

  //Return this
  return this;
};
