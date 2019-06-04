import THREE from './THREE';
import img_map from './map.png';
import img_universe from './universe.jpg';
import img_radial_layers_medium from './radial_layers_medium.jpg';
import img_map_inverted from './map_inverted.png';
import img_particleA from './particleA.png';
var THREEx = {};
THREEx.KeyboardState = function() {
  this.keyCodes = {};
  this.modifiers  = {};
  var self  = this;
  this._onKeyDown = function(event){ self._onKeyChange(event, true); };
  this._onKeyUp = function(event){ self._onKeyChange(event, false);};
  document.addEventListener("keydown", this._onKeyDown, false);
  document.addEventListener("keyup", this._onKeyUp, false);
}
THREEx.KeyboardState.prototype.destroy = function() {
  document.removeEventListener("keydown", this._onKeyDown, false);
  document.removeEventListener("keyup", this._onKeyUp, false);
}
THREEx.KeyboardState.MODIFIERS  = ['shift', 'ctrl', 'alt', 'meta'];
THREEx.KeyboardState.ALIAS  = {
  'left'    : 37,
  'up'    : 38,
  'right'   : 39,
  'down'    : 40,
  'space'   : 32,
  'pageup'  : 33,
  'pagedown'  : 34,
  'tab'   : 9
};
THREEx.KeyboardState.prototype._onKeyChange = function(event, pressed) {
  var keyCode = event.keyCode;
  this.keyCodes[keyCode] = pressed;
  this.modifiers['shift']= event.shiftKey;
  this.modifiers['ctrl']  = event.ctrlKey;
  this.modifiers['alt'] = event.altKey;
  this.modifiers['meta']  = event.metaKey;
}
THREEx.KeyboardState.prototype.pressed = function(keyDesc) {
  var keys  = keyDesc.split("+");
  for(var i = 0; i < keys.length; i++){
    var key   = keys[i];
    var pressed;
    if( THREEx.KeyboardState.MODIFIERS.indexOf( key ) !== -1 ){
      pressed = this.modifiers[key];
    }else if( Object.keys(THREEx.KeyboardState.ALIAS).indexOf( key ) != -1 ){
      pressed = this.keyCodes[ THREEx.KeyboardState.ALIAS[key] ];
    }else {
      pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)]
    }
    if( !pressed) return false;
  };
  return true;
}
THREEx.Gobal = function(props) {
  this.constructor(props);
}
THREEx.Gobal.prototype = {
  constructor: function(props) {
    this.props = {};
    //super(props);
    this.bgColor = "0x00FFA7";
    this.sphereColor = "0x0A3B48";
    this.ringColor = "0x00FFA7";
    this.earthColor = "0x0A3B48";
    this.linghtColor = "0x33CCFF";
    this.spin = 0.1;
    this.moveAnim = true;
    this.flightLines = [];
    this.hotspots = [];
    this.city = [];
    this.markers = [];
    this.currentCity = 0;
    this.isAnimate = false;
    this.flightLineColor = {
      "0": new THREE.Color(0xA50026),   
      "1": new THREE.Color(0xF16740),   
      "2": new THREE.Color(0xFEC97A),   
      "3": new THREE.Color(0xCEFA00),   
      "4": new THREE.Color(0xDEFA00),
      "5": new THREE.Color(0xB9FA00)
    };
    this.HotspotColor = {
      "0": new THREE.Color(0xA50026),   
      "1": new THREE.Color(0xF16740),   
      "2": new THREE.Color(0xFEC97A),   
      "3": new THREE.Color(0xCEFA00),   
      "4": new THREE.Color(0xDEFA00),
      "5": new THREE.Color(0xB9FA00)
    };
    this.radius = 100;
    this.segments = 60;
    this.rotateX = 0;
    this.rotateY = 0;
    this.rotateVX = 0;
    this.rotateVY = 0;
    this.rotateXMax = 90 * Math.PI / 180;
    this.rotateTargetX = 0;
    this.rotateTargetY = 0;
    this.dragging = false;
    this.apply(this.props, props);
    this.wrap = document.getElementById(this.props.el);
    this.el = document.createElement("div");
    this.el.style = "user-select: none;width: 100%;height: 100%;";
    this.wrap.appendChild(this.el);
    this.containt = document.createElement("div");
    this.containt.style = "user-select: none;";
    this.wrap.appendChild(this.containt);
    if(!this._baseGeometry) {
      this._baseGeometry = new THREE.Geometry();
    }
    if(!this.point) {
      this.point = new THREE.Mesh(new THREE.CubeGeometry(0.5, 0.5, 1, 1, 1, 1));
    }
    this.init();
  },
  apply: function(a, b) {
    if(a && b && typeof b == 'object') {
      for(var p in b) {
        a[p] = b[p];
      }
    }
    return a;
  },
  init: function() {
    this.initScene();
  },
  initScene: function() {
    if(!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true
      });
      var w = this.el.offsetWidth || window.innerWidth,
      h = this.el.offsetHeight || window.innerHeight;
      this.renderer.setSize(w, h);
      this.renderer.autoClear = false;
      this.renderer.sortObjects = false;    
      this.renderer.generateMipmaps = false;          
      this.el.appendChild(this.renderer.domElement);
    }
    if(!this.scene) {
      this.scene = new THREE.Scene();
      this.scene.matrixAutoUpdate = false;
    }
    if(!this.camera) {
      this.camera = new THREE.PerspectiveCamera(12, w / h, 1, 20000);
      this.camera.position.z = 1600;
      this.camera.position.y = 0;
      this.scene.add(this.camera);
    }
    if(!this.rotating) {
      this.rotating = new THREE.Object3D();
      //this.camera.position.x = 80;
      this.scene.add(this.rotating);
    }
    if(!this.visualizationMesh) {
      this.visualizationMesh = new THREE.Object3D();
      this.rotating.add(this.visualizationMesh);
    }
    this.addSphere();
    this.addMap();
    this.addLinght();
    this.initTrackballControls();
  },
  addSphere: function() {
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius, this.segments, this.segments),
      new THREE.MeshLambertMaterial({
        map: new THREE.ImageUtils.loadTexture(img_map),
        color: this.sphereColor,
        transparent: true,
        opacity: 0.6,
        depthWrite: true,
        depthTest: true,
      })
    );
    this.rotating.add(this.sphere);
  },
  addMap: function() {
    var img0 = new Image();
    img0.src = img_map_inverted;
    img0.onload = () => {
      this.rotating.add(this.showEarth(img0));
    }
  },
  showEarth: function(img) {
    var globeCloudVerticesArray = [], globeCloud, offset = 20;
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var geo = new THREE.Geometry();
    for (var i = 0; i < imageData.data.length; i += offset) {
      var curX = i / 4 % canvas.width;
      var curY = (i / 4 - curX) / canvas.width;
      if (i / offset % 2 === 1 && curY % (offset / 5) === 1) {
        var color = imageData.data[i];
        if (color === 0) {
          var x = curX;
          var y = curY;
          var lat = (y / (canvas.height / 180) - 90) / -1;
          var lon = x / (canvas.width / 360) - 180;
          geo.vertices.push(this.getVector3(lat, lon, this.radius));
        }
      }
    }
    var uniforms = {
      color: {
        type: "c",
        value: new THREE.Color(this.earthColor)
      },
      glowColor: {
        type: "c",
        value: new THREE.Color(0xffffff)
      }
    };
    var mat = new THREE.ShaderMaterial({
      uniforms: uniforms,     
      vertexShader: `
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 3.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 glowColor;
        uniform sampler2D texture;
        void main() {
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true
    });
    var globeCloud = new THREE.ParticleSystem(geo, mat);
    globeCloud.sortParticles = true;
    return globeCloud;
  },
  addLinght: function() {
    var hemiLight = new THREE.PointLight(this.linghtColor, 2.2);
    hemiLight.position.x = -50; 
    hemiLight.position.y = 0;
    hemiLight.position.z = 350;
    this.scene.add(hemiLight);
    var hemiLight1 = new THREE.PointLight(this.linghtColor, 2.2);
    hemiLight1.position.x = 50; 
    hemiLight1.position.y = 0;
    hemiLight1.position.z = 350;
    this.scene.add(hemiLight1);
    var hemiLight2 = new THREE.PointLight(this.linghtColor, 2.5);
    hemiLight2.position.x = 0; 
    hemiLight2.position.y = 0;
    hemiLight2.position.z = 350;
    this.scene.add(hemiLight2);
  },
  wrapFn: function(value, min, rangeSize) {
    rangeSize -= min;
      while (value < min) {
        value += rangeSize;
    }
    return value % rangeSize;
  },
  screenXY: function(vec3) {
    if(!this.projector) {
      this.projector = new THREE.Projector();
    }
    var clo = vec3.clone();
    var vector = this.projector.projectVector(clo, this.camera);
    var windowWidth = window.innerWidth;
    var minWidth = 1280;
    if(windowWidth < minWidth) {
      windowWidth = minWidth;
    }
    clo = null;
    return {
      x: Math.round(vector.x * (windowWidth / 2)) + windowWidth / 2,
      y: Math.round((0 - vector.y) * (window.innerHeight / 2)) + window.innerHeight / 2
    };
  },
  addMarker: function(center) {
    var marker = document.createElement("div");
    marker.className ="earth-marker";
    marker.innerHTML = '<div class="earth-detailText"></div>';
    this.containt.appendChild(marker);
    marker.center = center["center"];
    marker.setPosition = function(x, y, z) {
      this.style.left = x + 'px';
      this.style.top = y + 'px';  
      this.style.zIndex = z;
    }
    marker.setVisible = function(vis) {
      if(!vis)
        this.style.display = 'none';
      else 
        this.style.display = 'inline';
    }
    var detailLayer = marker.querySelector('.earth-detailText');
    detailLayer.innerHTML = center["name"];
    marker.detailLayer = detailLayer;
    marker.setSize = function(s) {
      var detailSize = Math.floor(2 + s * 0.5); 
      var totalHeight = detailSize * 2;
    }
    var self = this;
    marker.update = function() {
      var matrix = self.rotating.matrixWorld;
      var clo = this.center.clone();
      var abspos = matrix.multiplyVector3(clo);
      var screenPos = self.screenXY(abspos);
      var s = 0.3 + self.camera.scale.z * 1;
      var importanceScale = this.importance / 5000000;
      importanceScale = self.constrain(importanceScale, 0, 18);
      s += importanceScale;
      if(this.tiny)
        s *= 0.75;
      if(this.selected)
        s = 30;
      if(this.hover)
        s = 15;
      this.setSize(s); 
      this.setVisible(abspos.z > 0.60);
      var zIndex = Math.floor(1000 - abspos.z + s);
      if(this.selected || this.hover)
        zIndex = 10000;
      this.setPosition(screenPos.x, screenPos.y, zIndex);
      clo = null;
    }
    this.markers.push(marker);
  },
  rotateToLatLng: function(latLon, offsetY) {
    if(!latLon) {
      return;
    }
    this.rotateTargetX = latLon["lat"] * Math.PI / 180;
    var targetY0 = -(latLon["lon"] - 9 - 270) * Math.PI / 180, piCounter = 0;
    while(true) {
      var targetY0Neg = targetY0 - Math.PI * 2 * piCounter;
      var targetY0Pos = targetY0 + Math.PI * 2 * piCounter;
      if(Math.abs(targetY0Neg - this.rotating.rotation.y) < Math.PI) {
        this.rotateTargetY = targetY0Neg;
        break;
      } else if(Math.abs(targetY0Pos - this.rotating.rotation.y) < Math.PI) {
        this.rotateTargetY = targetY0Pos;
        break;
      }
      piCounter++;
      this.rotateTargetY = this.wrapFn(targetY0, -Math.PI, Math.PI);
    }
    this.rotateVX *= 0.6;
    this.rotateVY *= 0.6;
  },
  rotateCallback: function(currentCity, preCity) {},
  autoRotateToCities: function() {
    if(!this.isRotate) {
      if(this.city[0]) {
        this.ou = setTimeout(() => {
          this.rotateToLatLng(this.city[0]);
          this.rotateCallback(this.city[0]);
          clearTimeout(this.ou);
        }, 3500);
        this.isRotate = true;
      }
    } else {
      this.preCity = this.currentCity;
      if(this.currentCity >= this.city.length) {
        this.currentCity = 0;
      } else {
        this.currentCity += 0.003;
      }
      if(Math.floor(this.currentCity) != Math.floor(this.preCity)) {
        this.rotateToLatLng(this.city[Math.floor(this.currentCity)]);
        this.rotateCallback(this.city[Math.floor(this.currentCity)]);
      }
    }
  },
  interpolation: function(from, to, fraction) {
    return (to - from) * fraction + from;
  },
  render: function() {
    if(this.moveAnim) {
      if(this.rotateTargetX !== undefined && this.rotateTargetY !== undefined) {
        this.rotateVX += (this.rotateTargetX - this.rotateX) * 0.012;
        this.rotateVY += (this.rotateTargetY - this.rotateY) * 0.012;
        if(Math.abs(this.rotateTargetX - this.rotateX) < 0.1 && Math.abs(this.rotateTargetY - this.rotateY) < 0.1) {
          this.rotateTargetX = undefined;
          this.rotateTargetY = undefined;
        }
      }
      this.rotateX += this.rotateVX;
      this.rotateY += this.rotateVY;
      this.rotateVX *= 0.98;
      this.rotateVY *= 0.98;
      if(this.dragging || this.rotateTargetX !== undefined) {
        this.rotateVX *= 0.6;
        this.rotateVY *= 0.6;
      }
      this.rotateY += this.spin * 0.01;
      if(this.rotateX < -this.rotateXMax){
        this.rotateX = -this.rotateXMax;
        this.rotateVX *= -0.95;
      }
      if(this.rotateX > this.rotateXMax){
        this.rotateX = this.rotateXMax;
        this.rotateVX *= -0.95;
      }
      // TWEEN.update();
      this.rotating.rotation.x = this.rotateX;
      this.rotating.rotation.y = this.rotateY;
    } else {
      if(this.rotateTargetX !== undefined && this.rotateTargetY !== undefined) {
        this.rotateVX += (this.rotateTargetX - this.rotateX) * 0.08;
        this.rotateVY += (this.rotateTargetY - this.rotateY) * 0.08;
        if(Math.abs(this.rotateTargetX - this.rotateX) < 0.1 && Math.abs(this.rotateTargetY - this.rotateY) < 0.1) {
          this.rotateTargetX = undefined;
          this.rotateTargetY = undefined;
        }
      }
      this.rotateX += this.rotateVX;
      this.rotateY += this.rotateVY;
      this.rotateVX *= 0.01;
      this.rotateVY *= 0.01;
      if(this.dragging || this.rotateTargetX !== undefined) {
        this.rotateVX *= 0.6;
        this.rotateVY *= 0.6;
      }
      if(this.rotateX < -this.rotateXMax){
        this.rotateX = -this.rotateXMax;
      }
      if(this.rotateX > this.rotateXMax){
        this.rotateX = this.rotateXMax;
      }
      // TWEEN.update();
      this.rotating.rotation.x = this.rotateX;
      this.rotating.rotation.y = this.rotateY;
    }
    this.renderer.clear();               
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
    for(var i = 0; i < this.flightLines.length; i++) {  
      if(this.flightLines[i] && this.flightLines[i].update !== undefined) {
        this.flightLines[i].update();
      }
    }
    //this.camera.position.z = this.interpolation(this.camera.position.z, 1200, .05);
    this.autoRotateToCities();
  },
  drawLine_type: function(start, end, lineType, type) {
lineType = 2;
    var attributes = {
      pos: {
        type: 'f',
        value: []
      },
      max: {
        type: 'f',
        value: []
      }
    };
    var number;
    var linesGeo = new THREE.Geometry();
    if(lineType == 0) {
      var distanceBetweenCountryCenter = start["center"].clone()[this.isVersion49() ? "subSelf" : "sub"](end["center"]).length();   
      var anchorHeight = this.radius + distanceBetweenCountryCenter * 0.5;
      var mid = start["center"].clone()[this.isVersion49() ? "lerpSelf" : "lerp"](end["center"], 0.5);    
      var midLength = mid.length();
      mid.normalize();
      mid.multiplyScalar(midLength + distanceBetweenCountryCenter * 0.5);     
      var normal = (new THREE.Vector3()).sub(start["center"], end["center"]);
      normal.normalize();
      var distanceHalf = distanceBetweenCountryCenter * 0.5;
      var startAnchor = start["center"];
      var midStartAnchor = mid.clone()[this.isVersion49() ? "addSelf" : "add"](normal.clone().multiplyScalar(distanceHalf));          
      var midEndAnchor = mid.clone()[this.isVersion49() ? "addSelf" : "add"](normal.clone().multiplyScalar(-distanceHalf));
      var endAnchor = end["center"];
      var splineCurveA = new THREE.CubicBezierCurve3(start["center"], startAnchor, midStartAnchor, mid);                      
      var splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, end["center"]);
      var vertexCountDesired = Math.floor(distanceBetweenCountryCenter * 4.5) * 2;
      var points = splineCurveA.getPoints(vertexCountDesired);
      points = points.splice(0, points.length - 1);
      points = points.concat(splineCurveB.getPoints(vertexCountDesired));
      number = points.length;
      for(var i = 0; i < points.length; i ++) {
        linesGeo.vertices.push(points[i]);
        attributes.pos.value.push(i);
        attributes.max.value.push(number);
      }
    } else if(lineType == 1) {
      var pointNum = 0.15;
      if(Math.abs(start["lon"] - end["lon"]) > 180) {
        number = Math.ceil(Math.abs(-180 - start["lon"] - (180 - end["lon"])) / pointNum);
        number = Math.ceil(Math.abs(-180 - start["lon"] - (180 - end["lon"])) / pointNum);
        var num1, num2;
        var a1, a2;
        a1 = -180 - start["lon"];
        a2 = 180 - end["lon"];
        num1 = Math.ceil(number * Math.abs(a1) / (a2 - a1));
        var lonP = Math.abs(start["lon"] - end["lon"]) / number;
        var latP = Math.abs(start["lat"] - end["lat"]) / number;
        for (var i = 1; i < number; i++) {
          var lonTmp, latTmp;
          if (i <= num1) {
            lonTmp = start["lon"] + i * a1 / num1;
          } else {
            lonTmp = 180 - (i - num1) * a2 / (number - num1);
          }
          if (start["lat"] > end["lat"]) {
            latTmp = start["lat"] - i * latP;
          } else if (start["lat"] < end["lat"]) {
            latTmp = start["lat"] + i * latP;
          }
          var r, h = this.radius / 10;
          if (i <= number / 2) {
            r = this.radius + 4 * h / (number + 2) * i - (i * (i - 1 ) / 2) * 8 * h / (Math.pow(number, 2) + 2 * number);
          } else {
            var count = number - i;
            r = this.radius + 4 * h / (number + 2) * count - (count * (count - 1 ) / 2) * 8 * h / (Math.pow(number, 2) + 2 * number);
          }
          linesGeo.vertices.push(this.getVector3(latTmp, lonTmp, r + 1));
          attributes.pos.value.push(i);
          attributes.max.value.push(number);
        }
      } else {
        if (Math.abs(start["lon"] - end["lon"]) > Math.abs(start["lat"] - end["lat"])) {
          number = Math.ceil(Math.abs(start["lon"] - end["lon"]) / pointNum);
        } else {
          number = Math.ceil(Math.abs(start["lat"] - end["lat"]) / pointNum);
        }
        var lonP = Math.abs(start["lon"] - end["lon"]) / number;
        var latP = Math.abs(start["lat"] - end["lat"]) / number;
        for (var i = 1; i < number; i++) {
          var lonTmp, latTmp;
          if (start["lon"] > end["lon"]) {
            lonTmp = start["lon"] - i * lonP;
          } else if (start["lon"] < end["lon"]) {
            lonTmp = start["lon"] + i * lonP;
          }
          if (start["lat"] > end["lat"]) {
            latTmp = start["lat"] - i * latP;
          } else if (start["lat"] < end["lat"]) {
            latTmp = start["lat"] + i * latP;
          }
          var r, h = this.radius / 10;
          if (i <= number / 2) {
            r = this.radius + 4 * h / (number + 2) * i - (i * (i - 1 ) / 2) * 8 * h / (Math.pow(number, 2) + 2 * number);
          } else {
            var count = number - i;
            r = this.radius + 4 * h / (number + 2) * count - (count * (count - 1 ) / 2) * 8 * h / (Math.pow(number, 2) + 2 * number);
          }
          linesGeo.vertices.push(this.getVector3(latTmp, lonTmp, r + 1));
          attributes.pos.value.push(i);
          attributes.max.value.push(number);
        }
      } 
    } else if(lineType == 2) {
      var start_lat = start["lat"];
      var start_lon = start["lon"];
      var end_lat = end["lat"];
      var end_lon = end["lon"];
      var max_height = Math.random() * 35.1 + 0.05;
      var points = [];
      var G = Math.random().toFixed(2) * 300 + 400;
      //var points = [];
      number = G;
      for (var i = 0; i < G; i++) {
        var arc_angle = i * 180.0 / G;
        var arc_radius = this.radius + (Math.sin(arc_angle * Math.PI / 180.0)) * max_height;
        var latlon = this.lat_lon_inter_point(start_lat, start_lon, end_lat, end_lon, i / G);
        linesGeo.vertices.push(this.getVector3(latlon["lat"], latlon["lon"], arc_radius));
        attributes.pos.value.push(i);
        attributes.max.value.push(number);
      }
    }
    var uniforms = {
      c: {
        type: "f",
        value: 1.0
      },
      p: {
        type: "f",
        value: 1.4
      },
      glowColor: {
        type: "c",
        value: new THREE.Color(0xffffff)
      },
      viewVector: {
        type: "v3",
        value: this.camera.position
      },
      time: {
        type: "f",
        value: 0.0
      },
      leng: {
        type: "f",
        value: 200.0
      },
      color: {
        type: "c",
        value: this.flightLineColor[type]
      },
      pColor: {
        type: "c",
        value: new THREE.Color(0xffffff)
      },
      texture: {
        type: "t",
        value: 0,
        texture: THREE.ImageUtils.loadTexture(img_particleA)
      }
    };
    var shaderMaterial = new THREE.ShaderMaterial({
      attributes: attributes,
      uniforms: uniforms,
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        attribute float pos;
        attribute float max;
        varying float vMax;
        varying float vPos;
        varying vec3 vNormal;
        uniform float leng;
        uniform float time;
        void main() {
          vPos = pos;
          vMax = max;
          if(vPos >= time && vPos <= time + leng) {
            gl_PointSize = 3.0;
          } else {
            gl_PointSize = 1.0;
          }
          if(vPos == 5.0 || vPos == vMax - 5.0) {
            gl_PointSize = 13.0;
          }
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float leng;
        uniform vec3 color;
        varying float vPos;
        varying float vMax;
        varying vec3 vNormal;
        uniform sampler2D texture;
        uniform vec3 pColor;
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          if(vPos >= time && vPos <= time + leng) {    
            gl_FragColor = vec4(color * glowColor, 1.0);
            gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
          } else {
            gl_FragColor = vec4(color * glowColor, 0.5);
            gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
          }
          if(vPos == 5.0 || vPos == vMax - 5.0) {
            gl_FragColor = vec4(color * glowColor, 1.0);
            gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
          }
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true
    });
    var points = new THREE.ParticleSystem(linesGeo, shaderMaterial);
    this.rotating.add(points);
    this.flightLines.push(points);
    points.update = function() {
      if(this.material.uniforms.time.value >= this.geometry.vertices.length) {
        this.material.uniforms.time.value = 0;
      } else {
        this.material.uniforms.time.value += 9.5;
      }
      this.geometry.verticesNeedUpdate = true;
    }
  },
  addFlightLine: function(start, end, lineType, type) {
    var s_lat = parseInt(start["lat"], 10);
    var s_lon = parseInt(start["lon"], 10);
    
    var e_lat = parseInt(end["lat"], 10);
    var e_lon = parseInt(end["lon"], 10);
    
    var sv = {
      "lat": s_lat,
      "lon": s_lon,
      "name": start["name"],
      "type": start["type"],
      "value": start["value"],
      "center": this.getVector3(s_lat, s_lon, this.radius)
    };
    var ev = {
      "lat": e_lat,
      "lon": e_lon,
      "name": end["name"],
      "type": end["type"],
      "value": end["value"],
      "center": this.getVector3(e_lat, e_lon, this.radius)
    }
    this.drawLine_type(sv, ev, lineType, type);
  },
  lat_lon_inter_point: function(start_lat, start_lon, end_lat, end_lon, offset) {
    start_lat = start_lat * Math.PI / 180.0;
    start_lon = start_lon * Math.PI / 180.0;
    end_lat = end_lat * Math.PI / 180.0;
    end_lon = end_lon * Math.PI / 180.0;

    var d = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((start_lat - end_lat) / 2)), 2) + Math.cos(start_lat) * Math.cos(end_lat) * Math.pow(Math.sin((start_lon - end_lon) / 2), 2)));
    var A = Math.sin((1 - offset) * d) / Math.sin(d);
    var B = Math.sin(offset * d) / Math.sin(d);
    var x = A * Math.cos(start_lat) * Math.cos(start_lon) + B * Math.cos(end_lat) * Math.cos(end_lon);
    var y = A * Math.cos(start_lat) * Math.sin(start_lon) + B * Math.cos(end_lat) * Math.sin(end_lon);
    var z = A * Math.sin(start_lat) + B * Math.sin(end_lat);
    var lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 180 / Math.PI;
    var lon = Math.atan2(y, x) * 180 / Math.PI;
    return {
      lat: lat,
      lon: lon
    };
  },
  indexOf: function(arr, C, key) {
    if(!arr) return -1;
    for (var B = 0, A = arr.length; B < A; B++) {
      if (arr[B][key] == C[key]) {
        return B;
      }
    }
    return -1;
  },
  loadFlightLine: function(data, lineType) {
    this.removeAllFlightLine();
    for(var i = 0; i < data.length; i++) {
data[i]["type"] = this.getTestNumber(0, 3);
      this.addFlightLine(data[i]["start"], data[i]["end"], data[i]["lineType"] !== undefined ? data[i]["lineType"] : lineType, data[i]["type"] || 1);
    }
  },
  removeAllFlightLine: function() {
    if (this.flightLines !== undefined && this.flightLines.length) {
      for(var i = 0; i < this.flightLines.length; i++) {
        this.rotating.remove(this.flightLines[i]);
        this.removeObject(this.scene, this.flightLines[i]);
        this.flightLines[i] = null;
      }
    }
    this.flightLines = [];
  },
  removeObject: function(G, object) {
    var o, ol, zobject;
    console.log(object instanceof THREE.Mesh || object instanceof THREE.ParticleSystem);
    if (object instanceof THREE.Mesh || object instanceof THREE.ParticleSystem) {
      for (o = G.__webglObjects.length - 1; o >= 0; o--) {
        zobject = G.__webglObjects[o].object;
        if (object == zobject) {
          G.__webglObjects.splice(o, 1);
        }
      }
    }
  },
  getTestNumber: function(n, m) {
    return Math.floor(Math.random() * (m - n)) + n;
  },
  removeAllHotspot: function() {
    if (this.hotspots !== undefined && this.hotspots.length) {
      for(var i = 0; i < this.hotspots.length; i++) {
        this.rotating.remove(this.hotspots[i]);
        this.removeObject(this.scene, this.hotspots[i]);
        this.hotspots[i] = null;
      }
    }
    this.hotspots = [];
  },
  loadHotspot: function(arr) {
    this.removeAllHotspot();
    for(var i = 0; i < arr.length; i++) {   
      this.addHotspot({
        "lat": arr[i]["lat"],
        "lon": arr[i]["lon"],
        "value": arr[i]["value"],
"type": this.getTestNumber(0, 3)
      })
    }
    this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: THREE.FaceColors,
      morphTargets: false
    }));
    this.rotating.add(this.points);
  },
  addHotspot: function(cs) {
    var phi = (90 - cs["lat"]) * Math.PI / 180;
    var theta = (180 - cs["lon"]) * Math.PI / 180;
    this.point.position.x = this.radius * Math.sin(phi) * Math.cos(theta);
    this.point.position.y = this.radius * Math.cos(phi);
    this.point.position.z = this.radius * Math.sin(phi) * Math.sin(theta);
    this.point.lookAt(this.rotating.position);
    this.point.scale.z = -cs["value"];
    this.point.updateMatrix();
    for (var i = 0; i < this.point.geometry.faces.length; i++) {
      this.point.geometry.faces[i].color = this.HotspotColor[cs["type"]];
    }
    THREE.GeometryUtils.merge(this._baseGeometry, this.point);       
  },
  _addHotspot: function(cs) {
    if(!this.hotspot) {
      var geometry = new THREE.CubeGeometry(0.55, 0.55, 1);
      geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));
      this.hotspot = new THREE.Mesh(geometry);
      if(!this.hotspotColor) {
        this.hotspotColor = new THREE.Color(0x32CD32);
      }
      if(!this.hotspotMat) {
        this.hotspotMat = new THREE.MeshBasicMaterial({
          vertexColors : THREE.FaceColors,
          morphTargets : false
        });
      }
    }
    var subHotspotGeo = new THREE.Geometry();
      var pos = this.getPos(cs["lat"], cs["lon"], this.radius);
      this.hotspot.position.x = pos.x;
      this.hotspot.position.y = pos.y;
      this.hotspot.position.z = pos.z;
      this.hotspot.lookAt(this.rotating.position);
      this.hotspot.scale.z = Math.max(cs["value"], 0.1);
      this.hotspotColor = this.HotspotColor[cs["type"]];
      this.hotspot.updateMatrix();
      for (var i = 0; i < this.hotspot.geometry.faces.length; i++) {
        this.hotspot.geometry.faces[i].color = this.hotspotColor;
      }
    THREE.GeometryUtils.merge(subHotspotGeo, this.hotspot);
    var mesh = new THREE.Mesh(subHotspotGeo, this.hotspotMat);
    this.hotspots.push(mesh);
    this.rotating.add(mesh);
  },
  initMap: function() {
    if(!THREE.EdgesGeometry) {
      THREE.Geometry.prototype.clone = function() {
        return new THREE.Geometry().copy(this);
      }
      THREE.Geometry.prototype.copy = function(source) {
        var i, il, j, jl, k, kl;
        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        this.name = source.name;
        var vertices = source.vertices;
        for (i = 0, il = vertices.length; i < il; i ++) {
          this.vertices.push(vertices[i].clone());
        }
        var colors = source.colors;
        for (i = 0, il = colors.length; i < il; i ++) {
          this.colors.push(colors[i].clone());
        }
        var faces = source.faces;
        for (i = 0, il = faces.length; i < il; i ++) {
          this.faces.push(faces[i].clone());
        }
        for (i = 0, il = source.faceVertexUvs.length; i < il; i ++) {
          var faceVertexUvs = source.faceVertexUvs[i];
          if (this.faceVertexUvs[i] === undefined) {
            this.faceVertexUvs[i] = [];
          }
          for (j = 0, jl = faceVertexUvs.length; j < jl; j ++) {
            var uvs = faceVertexUvs[j], uvsCopy = [];
            for (k = 0, kl = uvs.length; k < kl; k ++) {
              var uv = uvs[k];
              uvsCopy.push(uv.clone());
            }
            this.faceVertexUvs[i].push(uvsCopy);
          }
        }
        var morphTargets = source.morphTargets;
        for (i = 0, il = morphTargets.length; i < il; i ++) {
          var morphTarget = {};
          morphTarget.name = morphTargets[i].name;
          if (morphTargets[i].vertices !== undefined) {
            morphTarget.vertices = [];
            for (j = 0, jl = morphTargets[i].vertices.length; j < jl; j ++) {
              morphTarget.vertices.push(morphTargets[i].vertices[j].clone());
            }
          }
          if (morphTargets[i].normals !== undefined) {
            morphTarget.normals = [];
            for (j = 0, jl = morphTargets[i].normals.length; j < jl; j ++) {
              morphTarget.normals.push(morphTargets[i].normals[j].clone());
            }
          }
          this.morphTargets.push(morphTarget);
        }
        var morphNormals = source.morphNormals;
        for (i = 0, il = morphNormals.length; i < il; i ++) {
          var morphNormal = {};
          if (morphNormals[i].vertexNormals !== undefined) {
            morphNormal.vertexNormals = [];
            for (j = 0, jl = morphNormals[i].vertexNormals.length; j < jl; j ++) {
              var srcVertexNormal = morphNormals[i].vertexNormals[j];
              var destVertexNormal = {};
              destVertexNormal.a = srcVertexNormal.a.clone();
              destVertexNormal.b = srcVertexNormal.b.clone();
              destVertexNormal.c = srcVertexNormal.c.clone();
              morphNormal.vertexNormals.push(destVertexNormal);
            }
          }
          if (morphNormals[i].faceNormals !== undefined) {
            morphNormal.faceNormals = [];
            for (j = 0, jl = morphNormals[i].faceNormals.length; j < jl; j ++) {
              morphNormal.faceNormals.push(morphNormals[i].faceNormals[j].clone());
            }
          }
          this.morphNormals.push(morphNormal);
        }
        this.elementsNeedUpdate = source.elementsNeedUpdate;
        this.verticesNeedUpdate = source.verticesNeedUpdate;
        this.uvsNeedUpdate = source.uvsNeedUpdate;
        this.normalsNeedUpdate = source.normalsNeedUpdate;
        this.colorsNeedUpdate = source.colorsNeedUpdate;
        this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
        this.groupsNeedUpdate = source.groupsNeedUpdate;
        return this;
      }
      THREE.EdgesGeometry = function(geometry, thresholdAngle) {
        THREE.BufferGeometry.call(this);
        this.type = 'EdgesGeometry';
        this.parameters = {
          thresholdAngle: thresholdAngle
        };
        thresholdAngle = (thresholdAngle !== undefined) ? thresholdAngle : 1;
        var vertices = [];
        var thresholdDot = Math.cos(THREE.Math.DEG2RAD * thresholdAngle);
        var edge = [0, 0], edges = {}, edge1, edge2;
        var key, keys = ['a', 'b', 'c'];
        var geometry2;
        if (geometry.isBufferGeometry) {
          geometry2 = new THREE.Geometry();
          geometry2.fromBufferGeometry(geometry);
        } else {
          geometry2 = geometry.clone();
        }
        geometry2.mergeVertices();
        geometry2.computeFaceNormals();
        var sourceVertices = geometry2.vertices;
        var faces = geometry2.faces;
        for (var i = 0, l = faces.length; i < l; i ++) {
          var face = faces[i];
          for (var j = 0; j < 3; j ++) {
            edge1 = face[keys[j]];
            edge2 = face[keys[(j + 1) % 3]];
            edge[0] = Math.min(edge1, edge2);
            edge[1] = Math.max(edge1, edge2);
            key = edge[0] + ',' + edge[1];
            if (edges[key] === undefined) {
              edges[key] = {index1: edge[0], index2: edge[1], face1: i, face2: undefined};
            } else {
              edges[key].face2 = i;
            }
          }
        }
        for (key in edges) {
          var e = edges[key];
          if (e.face2 === undefined || faces[e.face1].normal.dot(faces[e.face2].normal) <= thresholdDot) {
            var vertex = sourceVertices[e.index1];
            vertices.push(vertex.x, vertex.y, vertex.z);
            vertex = sourceVertices[e.index2];
            vertices.push(vertex.x, vertex.y, vertex.z);
          }
        }
      }
      THREE.EdgesGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
      THREE.EdgesGeometry.prototype.constructor = THREE.EdgesGeometry;
    }
    if(!THREE.LineSegments) {
      THREE.LineSegments = function(geometry, material) {
        THREE.Line.call(this, geometry, material);
        this.type = 'LineSegments';
      }
    }
    if(!THREE.EdgesHelper) {
      THREE.EdgesHelper = function (object, hex) {
        console.warn('THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead.');
        return new THREE.LineSegments(
          new THREE.EdgesGeometry(object.geometry), 
          new THREE.LineBasicMaterial({color: hex !== undefined ? hex : 0xffffff})
        );
      }
    }
    var t3d;
    for (var name in country_data) {
        t3d = new Tessalator3D(country_data[name], 0);
        var continents = ["CH"];
        var color;
        if(country_data[name].data.cont == "CH") {
          color = new THREE.Color(0x103C3F);
        } else {
          color = new THREE.Color(0x103C3F);
        }
        var mesh = country_data[name].mesh = new THREE.Mesh(t3d, new THREE.MeshLambertMaterial({
          emissive: 0x103C3F,
        }));
        this.rotating.add(mesh);
      }
  },
  initTrackballControls: function() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.pmouseX = 0;
    this.pmouseY = 0;
    this.pressX = 0;
    this.pressY = 0;
    this.keyboard = new THREEx.KeyboardState();
    this.onDocumentResize = function(event) {}
    this.onDocumentMouseDown = function(event) {  
      this.dragging = true;        
      this.pressX = this.mouseX;
      this.pressY = this.mouseY;    
      this.rotateTargetX = undefined;
      this.rotateTargetX = undefined;
    }
    this.onDocumentMouseMove = function(event) {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.clientX - window.innerWidth * 0.5;
      this.mouseY = event.clientY - window.innerHeight * 0.5;
      if(this.dragging) {
        if(this.keyboard.pressed("shift") == false) {
          this.rotateVY += (this.mouseX - this.pmouseX) / 2 * Math.PI / 180 * 0.3;
          this.rotateVX += (this.mouseY - this.pmouseY) / 2 * Math.PI / 180 * 0.3;  
        } else {
          this.camera.position.x -= (this.mouseX - this.pmouseX) * .5; 
          this.camera.position.y += (this.mouseY - this.pmouseY) * .5;
        }
      }
    }
    this.onDocumentMouseUp = function(event) {
      this.dragging = false;
    }
    this.onMouseWheel = function(event) {
      var delta = 0;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
      } else if(event.detail) {
        delta = -event.detail / 3;
      }
      if (delta) {
        this.camera.scale.z += delta * 0.1;
        this.camera.scale.z = this.constrain(this.camera.scale.z, 0.7, 5.0);
      }
      event.returnValue = false;      
    }
    this.renderer.domElement.addEventListener('windowResize', (event) => {
      this.onDocumentResize(event);
    }, false);
    this.renderer.domElement.addEventListener('mousedown', (event) => {
      this.onDocumentMouseDown(event);
    }, true);
    this.renderer.domElement.addEventListener('mousemove', (event) => {
      this.onDocumentMouseMove(event);
    }, true);
    this.renderer.domElement.addEventListener('mouseup', (event) => {
      this.onDocumentMouseUp(event);
    }, false);
    this.renderer.domElement.addEventListener('mousewheel', (event) => {
      this.onMouseWheel(event);
    }, false);
    this.renderer.domElement.addEventListener('DOMMouseScroll', (event) => {
      this.onMouseWheel(window.event || event);
    }, false);
  },
  getPos: function(lat, lon, radius) {
    radius = radius || this.radius;
    var phi = (90 - lat) * Math.PI / 180;
    var theta = (lon - 180) * Math.PI / 180;
    return {
      x: -radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    };
  },
  getVector3: function(lat, lon, radius) {
    var pos = this.getPos(lat, lon, radius);
    var center = new THREE.Vector3();
    center.x = pos.x;
    center.y = pos.y;
    center.z = pos.z;
    return center;
  },
  isVersion49: function() {
    return THREE.REVISION == 49;
  },
  load: function(data, type) {
    if(!this.isAnimate) {
      this.animate();
      this.isAnimate = true;
    }
    if(data) {
    }
  },
  constrain: function(v, min, max) {
    if(v < min)
      v = min;
    else
    if(v > max)
      v = max;
    return v;
  }
};
export default THREEx;