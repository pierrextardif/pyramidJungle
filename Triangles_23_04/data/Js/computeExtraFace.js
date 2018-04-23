//arrays Initialisation
function triangleMesh(color,scale,p,rot, index){
  var scale = 1;
  var geometry = new THREE.Geometry();
  geometry.verticesNeedUpdate = true;
  geometry.vertices.push(
    new THREE.Vector3(p.x,p.y,p.z),
    new THREE.Vector3(p.x,p.y + scale,p.z),
    new THREE.Vector3(p.x,p.y,p.z + scale),
    new THREE.Vector3(p.x + scale,p.y,p.z)
  );
  var xScale = p.x + scale;
  var yScale = p.y + scale;
  var zScale = p.z + scale;

  var face = new THREE.Face3(0, 1, 2);
  geometry.faces.push(face);
  var face2 = new THREE.Face3(0,3,1);
  geometry.faces.push(face2);
  var face3 = new THREE.Face3(1,3,2);
  geometry.faces.push(face3);
  var face4 = new THREE.Face3(0,2,3);
  geometry.faces.push(face4);
  color = new THREE.Color( 0xaa0000 );
  material = new THREE.MeshBasicMaterial({color: color ,
                      wireframe: true
                    });
  pyramid = new THREE.Mesh(geometry, material);
  pyramid.rotation.x = (Math.PI * rot.x );
  pyramid.rotation.y = (Math.PI * rot.y );
  pyramid.rotation.z = (Math.PI * rot.z );
  pyramid.updateMatrixWorld(true);

  var p = new THREE.Vector3();
  p.setFromMatrixPosition( pyramid.matrixWorld );
  console.log(pyramid);
  extrudeFaceOfPyramid(pyramid);
  pyramid.name = "pyramid";
  group.add(pyramid);
  var qt = pyramid.quaternion;
  qt.normalize();
  var quat = {"x":qt.x,"y":qt.y,"z":qt.z,"w":qt.w};
  return quat;
}

function extrudeFaceOfPyramid(mesh){
  var bool = Math.random() < 0.5;
  var verticesLength = mesh.geometry.vertices.length;
  var facesLength = mesh.geometry.faces.length;
  var color = createRandomColor();
  var g = mesh.geometry;
   g.computeFaceNormals();
  var v = [], vDone = [],faces = [];
  for(var i = 0 ;i<facesLength; i++){
    var face = {};
    face.normal = g.faces[i].normal;
    var v = [];
    v.push(g.vertices[g.faces[i].a]);
    v.push(g.vertices[g.faces[i].b]);
    v.push(g.vertices[g.faces[i].c]);
    face.v = v;
    face.color = color;
    face.prop = prop3SidesEx();
    faces.push(face);
  }

  for(var i = 0 ;i < faces.length; i++){
    // if(bool){
      computeNewFacePyramid(faces[i]);
    // }else{
      // computeNewFaceExtruded(faces[i]);
    // }
  }
  // return mesh
}



function computeNewFacePyramid(face){
  var dir = {x:-mOneOrOne(), y:-mOneOrOne(), z:-mOneOrOne()};
  var n = face.normal;
  var v = face.v;
  var prop = face.prop;
  var c = face.color;

  geometryFace = new THREE.Geometry();
  geometryFace.verticesNeedUpdate = true;

  // geometryFace.addAttribute( 'color', colorAttribute );
  // g.elementsNeedUpdate = true;
  n.x = (dir.x * n.x + (face.v[0].x + face.v[1].x + face.v[2].x)/3) * prop[0];
  n.y = (dir.y * n.y + (face.v[0].y + face.v[1].y + face.v[2].y)/3) * prop[1];
  n.z = (dir.z * n.z + (face.v[0].z + face.v[1].z + face.v[2].z)/3) * prop[2];

  // n.x = dir.x * n.x * prop[0];
  // n.y = dir.y * n.y * prop[1];
  // n.z = dir.z * n.z * prop[2];

  geometryFace.vertices.push(
    new THREE.Vector3(v[0].x,v[0].y,v[0].z),
    new THREE.Vector3(n.x, n.y, n.z),
    new THREE.Vector3(v[1].x, v[1].y, v[1].z),
    new THREE.Vector3(v[2].x, v[2].y, v[2].z)
  );

    // var geometryBuffer = new THREE.BufferGeometry();
    // var bufferPos = buffPos(geometryFace.vertices);
    // colorAtt = colAttribute();

    // var colorAttribute = new THREE.Uint8BufferAttribute( colorAtt, 4 );
    // var positionAttribute = new THREE.Float32BufferAttribute( bufferPos, 3 );

    // console.log("bufferPos is : ", bufferPos );
    // geometryBuffer.addAttribute( 'position', bufferPos );
    // geometryBuffer.addAttribute( 'color', colorAttribute );

    // var material = new THREE.RawShaderMaterial( {

    //   uniforms: {
    //     time: { value: 1.0 }
    //   },
    //   vertexShader: document.getElementById( 'vertexshader' ).textContent,
    //   fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
    //   side: THREE.DoubleSide,
    //   transparent: true

    // } );
    // var bufferMesh = new THREE.Mesh( geometryBuffer, material );
    // bufferMesh.name = "geomBuffer";
    // group.add(bufferMesh);


    addToGeom(0,1,2,geometryFace);
    addToGeom(0,2,1,geometryFace);
    addToGeom(0,1,3,geometryFace);
    addToGeom(0,3,1,geometryFace);
    addToGeom(1,2,3,geometryFace);
    addToGeom(1,3,2,geometryFace);
    addToGeom(0,2,3,geometryFace);
    addToGeom(0,3,2,geometryFace);
  var color = createRandomColor();
  material = new THREE.MeshDepthMaterial({
    // color: c,
    // alphaMap : c,
    // emissive:c,
        // combine: 0.1,
        // alphaMap:texture,
        morphTargets:true,
        opacity: 0.2,
        displacementBias: 0.8,
        transparent: true,
        // wireframe: false, 
        // lights:true,
        // lightMapIntensity : 0.4,
        // morphTargets: true,
        // reflectivity:1.0,
        // skinning:true
        dithering:true
                    });
  // material.needsUpdate = true;
  var pointyFace = new THREE.Mesh(geometryFace, material);
  pointyFace.name = "pointyFace";
  // mesh.rotateZ(Math.random());
  group.add(pointyFace);
  // scene.add( mesh );

  // return mesh;
}
function computeNewFaceExtruded(face){
  // var dir = 1;
  var dir = {x:-mOneOrOne(), y:-mOneOrOne(), z:-mOneOrOne()};
  var n = face.normal;
  var v = face.v;
  var prop = face.prop;
  var g = new THREE.Geometry();
  // g.elementsNeedUpdate  = true;
  g.name = "computedFace";

  n.x = (dir.x * n.x + (v[0].x + v[1].x + v[2].x)/3) * prop[0];
  n.y = (dir.y * n.y + (v[0].y + v[1].y + v[2].y)/3) * prop[1];
  n.z = (dir.z * n.z + (v[0].z + v[1].z + v[2].z)/3) * prop[2];

  g.vertices.push(
    new THREE.Vector3(v[0].x,v[0].y,v[0].z),
    new THREE.Vector3(v[1].x,v[1].y,v[1].z),
    new THREE.Vector3(v[2].x,v[2].y,v[2].z),
    new THREE.Vector3(v[0].x + n.x,v[0].y + n.y,v[0].z + n.z * prop[3]),
    new THREE.Vector3(v[1].x + n.x,v[1].y + n.y,v[1].z + n.z * prop[4]),
    new THREE.Vector3(v[2].x + n.x,v[2].y + n.y,v[2].z + n.z * prop[5])
  );
  addToGeom(0,3,1,g);
  addToGeom(0,1,3,g);
  addToGeom(3,1,4,g);
  addToGeom(3,4,1,g);
  addToGeom(1,4,2,g);
  addToGeom(1,2,4,g);
  addToGeom(4,2,5,g);
  addToGeom(4,5,2,g);
  addToGeom(2,5,3,g);
  addToGeom(2,3,5,g);
  addToGeom(0,2,3,g);
  addToGeom(0,3,2,g);
  addToGeom(3,4,5,g);
  addToGeom(3,5,4,g);
  var color = shadeColor(face.color);
  var mat = new THREE.MeshPhysicalMaterial({
        color: color,
        // alphaMap:texture,
        // emmissiveMap:texture,
        // morphTargets:true,
        opacity: 0.2,
        // refractionRatio:1.0,
        roughness:0.0,
        roughnessMap:texture,
        // aoMap:texture,
        // displacementBias: 0.3,
        // transparent: true,
        metalness: 0,
        reflectivity : 1.0,
        clearCoatRoughness : 1.0,
        clearCoat:0.0
                    });
  // var mat = new THREE.MeshBasicMaterial({
  //       color: color,
  //       opacity: 0.8,
  //       transparent: true,
  //       wireframe: false
  //                   });
  var extrudedFace = new THREE.Mesh(g, mat);
  extrudedFace.name = "extrudedFace";
  group.add(extrudedFace);
}


function animatePointyPyramid(timer){
  var l = scene.children[0].children.length;
  for(var i = 0 ;i< l;i ++){
    if(scene.children[0].children[i].name == "geomBuffer"){
      var time = performance.now();
      // scene.children[0].children[i].material.uniforms.time.value = timer * 0.5;
    }
    if(scene.children[0].children[i].name == "pointyFace"){
    var d = distToCam(vert);

      var vert = scene.children[0].children[i].geometry.vertices[1];

      if(d < 20){
        // console.log("we in");
        var amp = 0.0001 + Math.pow((Math.abs(vert.x - vert.y)), 0.1);
        var sine = 10/(1+ (d * amp));
        // console.log("sine is : ", sine);
        scene.children[0].children[i].geometry.vertices[1].z += sine;
        // console.log("z = ",scene.children[0].children[i].geometry.vertices[1].z);
        // scene.children[0].children[i].geometry.vertices[1].z +=  0.1 * Math.sin( timer * 1/(amp * 0.05));
        // scene.children[0].children[i].geometry.verticesNeedUpdate = true;
      }
    }
  }
}

function distToCam(vertice){
  var dx = camera.position.x - vertice.x;
  var dy = camera.position.y - vertice.y;
  var dz = camera.position.z - vertice.z;

  var distance = Math.sqrt( dx * dx + dy * dy + dz * dz );
  return distance;
}