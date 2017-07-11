/* global Vector */
/* global Point3D */

const CAMERA_FILE_ID = "camera-file";

var camera = null;

function Camera(c, n, v, d, hx, hy) {
  this.c = c;
  this.n = n;
  this.v = v;
  this.d = d;
  this.hx = hx;
  this.hy = hy;
  this.alpha = [];
}

Camera.prototype.genAlpha = function() {
  this.n.normalize();
  
  this.v = this.v.gramSchmidt(this.n);
  this.v.normalize();
  
  var u = this.n.crossProduct(this.v);
  
  this.alpha.push([u.x, u.y, u.z]);
  this.alpha.push([this.v.x, this.v.y, this.v.z]);
  this.alpha.push([this.n.x, this.n.y, this.n.z]);
};

Camera.prototype.changeBase = function(p) {
  return p.changeBase(this);
};

Camera.prototype.projectPoint = function(p) {
  return p.projectPoint(this);
};

function uploadCamera(event) {
  var file = event.target.files[0];

  var reader = new FileReader();
  reader.onload = (function(file) {
    return function(event) {
      var data = this.result.split('\n');
      
      if(!isLightReady()) {
        alert("Você precisa escolher a iluminação.");
        
        return;
      }
      
      processCamera(data);
    };
  })(file);
  reader.readAsText(file);
}

function processCamera(data) {
  camera = null;
  
  var cd = data[0].split(' ');
  var nd = data[1].split(' ');
  var vd = data[2].split(' ');
  var od = data[3].split(' ');
  
  var c = new Point3D(cd[0], cd[1], cd[2]);
  var n = new Vector(nd[0], nd[1], nd[2]);
  var v = new Vector[vd[0], vd[1], vd[2]];
  var d = od[0];
  var hx = od[1];
  var hy = od[2];
  
  camera = new Camera(c, n, v, d, hx, hy);
}

function isCameraReady() {
  return camera != null;
}

document.getElementById(CAMERA_FILE_ID).addEventListener('change', uploadCamera, false);