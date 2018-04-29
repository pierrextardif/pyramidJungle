
function randRot(){
  return {x:randOneRot(),y:randOneRot(),z:randOneRot()};
}
function randOneRot(){
  return Math.PI - 2 * (Math.random() * Math.PI );
}
function randPos(){
  var sizePerimeter = 6;
  return sizePerimeter / 2 - (Math.random() * sizePerimeter );
}
function animatePyGeo(s, oscillator){
// scene.children[0].geometry.vertices[1]
  s.x += oscillator.x; 
  s.y += oscillator.y;
  s.z += oscillator.z;
}
function animatePyCol(s, oscillator){
  s.r += oscillator.x; 
  // console.log(s.r);
  // s.g += oscillator.y;
  // s.b += oscillator.z;
}
function shadeColor(color){
  var shade = Math.floor(Math.random() * 3);
  if(shade == 0){
    color.r = shadeChannel(color.r);
  }else if(shade == 1){
    color.g = shadeChannel(color.g);
  }else if(shade == 2){
    color.b = shadeChannel(color.b);
  }
  return color;
}
function shadeChannel(channel){
  var increment = 0.1;
  if(channel > 0.8){
    channel -= increment;
  }else if(channel < 0.2){
    channel += increment;
  }else{
    channel += increment;
  }
  return channel;
}
function prop3SidesEx(){
  var prop = [];
  for(var i = 0 ; i < 3 ; i++){
    prop[i] = propEx();
  }
  for(var i = 3 ; i < 6 ; i++){
    prop[i] = propExTrgle();
  }
  return prop;
}

function propEx(){
  return Math.random() * 2 +1;
}

function propExTrgle(){
  // return 1;
  return Math.random() * 1.5 + 0.5;
}
function addToGeom(a,b,c,g){
  var face = new THREE.Face3(a,b,c);
  g.faces.push(face);
}
//Colors
function colorSelect(){
  var redBool = Math.random() < 0.5;
  var greenBool = Math.random() < 0.5;
  var blueBool = Math.random() < 0.5;
  if(!redBool && !greenBool){
    blueBool = true;
  }
  boolCol = [redBool,greenBool,blueBool];
}
function createRandomColor(){
  var colorParts = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  var colorToUse = [colorParts[Math.floor(Math.random() * 15)] * colorParts[Math.floor(Math.random() * 15)],colorParts[Math.floor(Math.random() * 15)] * colorParts[Math.floor(Math.random() * 15)],colorParts[Math.floor(Math.random() * 15)] * colorParts[Math.floor(Math.random() * 15)]];
  // var colorForShape = "rgb("+colorToUse[0]+","+colorToUse[1]+","+colorToUse[2]+")";
    var colorForShape = "rgb("+colorToUse[0]+","+colorToUse[1]+","+colorToUse[2]+")";

  var colored = new THREE.Color( colorForShape );
  return colored;
}
//Controls
function initControls(){
  controls = new THREE.TrackballControls( camera, renderer.domElement );
}
function controlsAnim(controler,el){
  if(controler.WebVR == true){
    vrDisplay.requestPresent([{source: el}]);
    controler.WebVR = false;
  }else if(controler.fullscreen == true){
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
    controler.fullscreen = false;
  }
}
var pulseTest = function() {
	this.pulseY =2;
	this.pulseZ =2;
	this.scale =5;
}

var VRModes = function(){
	this.fullscreen = false;
	this.WebVR = false;
}

var colorRes = function() {
	this.red =false;
	this.green =true;
	this.blue =false;
}

function guiInit(){
  var f0 = gui.addFolder('VR');
  var f1 = gui.addFolder('Triangles');
  var f2 = gui.addFolder('pulses');
  f0.add(VrControls,'fullscreen');
  f0.add(VrControls,'WebVR');
  f2.add(varPulse, 'pulseY',1,5);
  f2.add(varPulse, 'pulseZ',1,5);
  f1.add(varPulse, 'scale',1,50);
}
//Arrays operations
function checkMax(array){
  var max =0;
  for(var i =0;i<array.length;i++){
    if(array[i]>max)max = array[i];
  }
  return max;
}
function map(valToTransform, max){
  return valToTransform / max;
} 
function floor(number){
  return Math.floor(number);
}
function random(number1, number2){
  return ((Math.random() * number1)+number2);
}
function mOneOrOne(){
  return 1;
  // return Math.pow(-1,Math.round(Math.random()));
}

//camera & canvas operations
function onResize() {
  console.log('Resizing to %s x %s.', window.innerWidth, window.innerHeight);
  // controls = new THREE.VRControls(camera);
  // effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
function onVRDisplayPresentChange() {
  console.log('onVRDisplayPresentChange');
  onResize();
}
function centerCamera(){
//    center = {
//     x : checKcenter(),
//     y : checkYmoy(),
//     z : checkZmoy()
//   };

//   camera.position.x = center.x;
//   camera.position.y = center.y;
//   camera.position.z = center.z;
}
//animation operations
function rotScale(index){
  group.children[index].scale.x = group.children[index].scale.y = group.children[index].scale.z = varPulse.scale;
  group.children[index].rotateZ(0.03);
}
function cmpInc(incDim,pulseDim,boolDim){
  if(incDim > pulseDim)
    {
      incDim = 0;
      boolDim = !boolDim;
    }
    return [incDim,boolDim];
}

function addLight(){
  // var ambientLight = new THREE.AmbientLight( 0x000000 );
      // scene.add( ambientLight );



  var light = new THREE.AmbientLight(  0xffffff00,1,100); // soft white light
  // var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );
var lights = [];
      lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

      lights[ 0 ].position.set( 0, 100, 0 );
      lights[ 1 ].position.set( 50, 100, 150 );
      lights[ 2 ].position.set( - 50, - 10, - 50 );

      scene.add( lights[ 0 ] );
      scene.add( lights[ 1 ] );
      scene.add( lights[ 2 ] );

}