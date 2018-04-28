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

  pyramid.name = "pyramid";
  extrudeFaceOfPyramid(pyramid, rot);
  group.add(pyramid);
  var quaternion = quat(pyramid);
  return quaternion;
}

function extrudeFaceOfPyramid(mesh, rot){
  var bool = Math.random() < 0.5;
  var verticesLength = mesh.geometry.vertices.length;
  var facesLength = mesh.geometry.faces.length;
  var color = createRandomColor();
  var g = mesh.geometry;
   g.computeFaceNormals();
  var v = [], vDone = [],faces = [];
  for(var i = 0 ;i<facesLength; i++){
    var face = {};
    //face is made of :
    //    normals
    //    vertices
    //    rotations
    //    color
    //    proportion
    face.normal = g.faces[i].normal;
    var v = [];
    v.push(g.vertices[g.faces[i].a]);
    v.push(g.vertices[g.faces[i].b]);
    v.push(g.vertices[g.faces[i].c]);
    face.rot = rot;
    face.v = v;
    face.color = color;
    face.prop = prop3SidesEx();
    faces.push(face);
  }

  for(var i = 0 ;i < faces.length; i++){
    computeNewFacePyramid(faces[i]);
  }
}



function computeNewFacePyramid(face){
  var dir = {x:-mOneOrOne(), y:-mOneOrOne(), z:-mOneOrOne()};
  var n = face.normal;
  var v = face.v;
  var prop = face.prop;
  var c = face.color;

  geometryFace = new THREE.Geometry();
  geometryFace.verticesNeedUpdate = true;

  n.x = (dir.x * n.x + (face.v[0].x + face.v[1].x + face.v[2].x)/3) * prop[0] / 2;
  n.y = (dir.y * n.y + (face.v[0].y + face.v[1].y + face.v[2].y)/3) * prop[1] / 2;
  n.z = (dir.z * n.z + (face.v[0].z + face.v[1].z + face.v[2].z)/3) * prop[2] / 2;


  geometryFace.vertices.push(
    new THREE.Vector3(v[0].x,v[0].y,v[0].z),
    new THREE.Vector3(n.x, n.y, n.z),
    new THREE.Vector3(v[1].x, v[1].y, v[1].z),
    new THREE.Vector3(v[2].x, v[2].y, v[2].z)
  );


    addToGeom(0,1,2,geometryFace);
    addToGeom(0,2,1,geometryFace);
    addToGeom(0,1,3,geometryFace);
    addToGeom(0,3,1,geometryFace);
    addToGeom(1,2,3,geometryFace);
    addToGeom(1,3,2,geometryFace);
    addToGeom(0,2,3,geometryFace);
    addToGeom(0,3,2,geometryFace);
  var color = createRandomColor();
  var simpleMaterial = new THREE.MeshBasicMaterial({color: color ,
                      wireframe: true
                    });
  var pointyFace = new THREE.Mesh(geometryFace, simpleMaterial);
  pointyFace.rotation.x = (Math.PI * face.rot.x );
  pointyFace.rotation.y = (Math.PI * face.rot.y );
  pointyFace.rotation.z = (Math.PI * face.rot.z );
  pointyFace.updateMatrixWorld(true);
  pointyFace.name = "pointyFace";
  var quaternion = quat(pointyFace);

  var pyramidProp = [0.06, 0.03];
  var arrayOfVertices = [];
  arrayOfVertices.push(
    0,1,2,
    0,1,3,
    1,2,3,
    0,2,3);
  pushPosPyramid(arrayOfVertices, geometryFace.vertices, color, pyramidProp, quaternion);

  group.add(pointyFace);
}

