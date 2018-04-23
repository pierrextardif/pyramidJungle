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

  pyramid.name = "pyramid";
  group.add(pyramid);
  var qt = pyramid.quaternion;
  qt.normalize();
  var quat = {"x":qt.x,"y":qt.y,"z":qt.z,"w":qt.w};
  return quat;
}