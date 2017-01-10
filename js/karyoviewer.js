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

  //Default size
  this._width = 0; //Default width
  this._height = 0; //Default height

  //Margins
  //this._margin = { top: 30, bottom: 30, left: 40, right: 40 };

  //Orientation
  this._orientation = {};
  this._orientation.actual = ''; //Actual orientation name
  this._orientation.default = 'portrait'; //Default orientation
  this._orientation.values = [ 'portrait', 'landscape' ]; //Orientation values

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

  //Check the chromosomes object
  if(typeof opt.chromosomes !== 'object'){ opt.chromosomes = {}; }

  //Chromosomes info
  this._chromosomes = {};
  this._chromosomes.width = 15; //Chromosome default width
  this._chromosomes.height = 50; //Chromosome default height
  this._chromosomes.layer = 1; //Chromosome layer
  this._chromosomes.list = []; //Chromosomes list
  this._chromosomes.names = {}; //Chromosome names
  this._chromosomes.max = 0; //Chromosome max length
  this._chromosomes.margin = 0; //Chromosome margin
  this._chromosomes.num = 0; //Number of chromosomes
  this._chromosomes.color = jviz.colors.blue2.hex; //Chromosome color
  this._chromosomes.opacity = 0.6; //Chromosome opacity
  this._chromosomes.resized = false; //Chromosome data is resized

  //Chromosome radius
  this._chromosomes.radius = {};
  this._chromosomes.radius.portrait = 6; //Chromosome radius for portrait
  this._chromosomes.radius.landscape = 20; //Chromosome radius for landscape

  //Chromosome text info
  this._chromosomes.text = {};
  this._chromosomes.text.list = []; //Chromosomes text
  this._chromosomes.text.font = jviz.font.default; //Text font
  this._chromosomes.text.size = '11px'; //Text size
  this._chromosomes.text.align = 'center'; //Chromosomes text align
  this._chromosomes.text.margin = 5; //Chromosomes text margin top

  //Centromere
  this._chromosomes.centromere = {};
  this._chromosomes.centromere.list = []; //List of centromere positions
  this._chromosomes.centromere.opacity = 0.9; //Centromere opacity

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
