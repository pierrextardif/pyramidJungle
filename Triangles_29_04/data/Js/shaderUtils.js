function initShaderFunction(){
	var triangles = 500;

	var geometry = new THREE.BufferGeometry();

	// var positions = [];
	var colors = [];

	for ( var i = 0; i < triangles; i ++ ) {
		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );

	}

	colorAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader

	// geometry.addAttribute( 'position', positionAttribute );
	geometry.addAttribute( 'color', colorAttribute );

	// material

	var material = new THREE.RawShaderMaterial( {

		uniforms: {
			time: { value: 1.0 }
		},
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		side: THREE.DoubleSide,
		transparent: true

	} );
	return 
}	
function colAttribute(){
	var colors = [];
	for ( var i = 0; i < amountOfTriangles; i ++ ) {

		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );

	}
	var colorAttribute = new THREE.Uint8BufferAttribute( colors, 4 );
	colorAttribute.normalized = true;

	return colors;
}
function buffPos(verticesPosArray){
	var buff = [];
	for (var i = 0; i< verticesPosArray.length; i++) {
		buff.push(verticesPosArray[i].x);
		buff.push(verticesPosArray[i].y);
		buff.push(verticesPosArray[i].z);
	}
	return buff;
}

function quat(geom){
	var qt = geom.quaternion;
	qt.normalize();
	var quat = {"x":qt.x,"y":qt.y,"z":qt.z,"w":qt.w};
	return quat;
}
function pushColorRot(col,rot){
	colors.push(col.r,col.g,col.b,Math.random() * 255);
	rotForBuffer.push(rot.x,rot.y,rot.z,rot.w);
  extraFaceBuffer.push(1.0);
}
function pushINColrot(rot){
  colors.push( Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 255 );
  rotForBuffer.push(rot.x,rot.y,rot.z,rot.w);
  extraFaceBuffer.push(0.0);
}
function colVariation(col, variation){
	var r = col.r + variation / 2 - Math.random() * variation;
	var g = col.g + variation / 2 - Math.random() * variation;
	var b = col.b + variation / 2 - Math.random() * variation;
	return {"r":r * 255, "g":g * 255, "b":b * 255};
}
function colVariationR(col, variation){
	var r = col.r + variation / 2 - Math.random() * variation;
	return {"r":r * 255, "g":col.g * 255, "b":col.b * 255};
}
function colVariationG(col, variation){
	var g = col.g + variation / 2 - Math.random() * variation;
	return {"r":col.r * 255, "g":g * 255, "b":col.b * 255};
}
function colVariationB(col, variation){
	var b = col.b + variation / 2 - Math.random() * variation;
	return {"r":col.r * 255, "g":col.g * 255, "b":b * 255};
}
function colorVar(col, variation){
  var colAttrib = Math.round(Math.random() * 2);
  if(colAttrib == 0){
    col.r = col.r + variation * 255;
  }else if(colAttrib == 1){
    col.g = col.g + variation * 255;
  }else if(colAttrib == 2){
    col.g = col.g + variation * 255;
  }
  return col;
}


function pushPyramid(scale, pos, rot){
  /*
  *                  *
  *                 /|\
  *                / | \
  *               /1 |2 \
  *              /---|---\
  *             /    |    \
  *            /     |     \
  *           /_     |      \
  *          /  |    |       \
  *         * 3 |    |        \
  *                  |         \
  *                  *----------*       
  *
  *          
  */
  //face 1
  posForBuffer.push(pos.x,pos.y,pos.z);
  pushINColrot(rot);
  // console.log("rotForBuffer is : "+rotForBuffer);
  posForBuffer.push(pos.x + scale,pos.y,pos.z);
  pushINColrot(rot);
  posForBuffer.push(pos.x,pos.y + scale,pos.z);
  pushINColrot(rot);

  //face 2
  posForBuffer.push(pos.x,pos.y,pos.z);
  pushINColrot(rot);
  posForBuffer.push(pos.x,pos.y + scale,pos.z);
  pushINColrot(rot);
  posForBuffer.push(pos.x,pos.y,pos.z + scale);
  pushINColrot(rot);

  //face 3
  posForBuffer.push(pos.x,pos.y,pos.z);
  pushINColrot(rot);
  posForBuffer.push(pos.x + scale,pos.y,pos.z);
  pushINColrot(rot);
  posForBuffer.push(pos.x,pos.y,pos.z + scale);
  pushINColrot(rot);


  //face 4
  posForBuffer.push(pos.x,pos.y + scale,pos.z);
  pushINColrot(rot);
  posForBuffer.push(pos.x + scale,pos.y,pos.z);
  pushINColrot(rot);
  posForBuffer.push(pos.x,pos.y,pos.z + scale);
  pushINColrot(rot);
}

function pushPointyPyramid(scale, pos, rot, n, color, propColVar){
	//face 1
  var col = colVariationR(color,propColVar);
  posForBuffer.push(pos[0].x,pos[0].y,pos[0].z);
  pushColorRot(col, rot);
  var prop = 0.05;
  var colVar = colorVar(col,prop);
  posForBuffer.push(n.x,n.y,n.z);
  pushColorRot(colVar, rot);
  posForBuffer.push(pos[1].x,pos[1].y,pos[1].z);
  colVar = colorVar(col,prop);
  pushColorRot(colVar, rot);

  // //face 2
  col = colVariationG(color,propColVar);
  posForBuffer.push(pos[0].x,pos[0].y,pos[0].z);
  pushColorRot(col, rot);
  var prop = 0.05;
  colVar = colorVar(col,prop);
  posForBuffer.push(n.x,n.y,n.z);
  pushColorRot(colVar, rot);
  posForBuffer.push(pos[2].x,pos[2].y,pos[2].z);
  colVar = colorVar(col,prop);
  pushColorRot(colVar, rot);

  // //face 3
  col = colVariationB(color,propColVar);
  posForBuffer.push(n.x,n.y,n.z);
  pushColorRot(col, rot);
  var prop = 0.05;
  colVar = colorVar(col,prop);
  posForBuffer.push(pos[1].x,pos[1].y,pos[1].z);
  pushColorRot(colVar, rot);
  posForBuffer.push(pos[2].x,pos[2].y,pos[2].z);
  colVar = colorVar(col,prop);
  pushColorRot(colVar, rot);

  // //face 4
  col = colVariation(color,propColVar);
  posForBuffer.push(pos[0].x,pos[0].y,pos[0].z);
  pushColorRot(col, rot);
  var prop = 0.05;
  colVar = colorVar(col,prop);
  posForBuffer.push(pos[1].x,pos[1].y,pos[1].z);
  pushColorRot(colVar, rot);
  posForBuffer.push(pos[2].x,pos[2].y,pos[2].z);
  colVar = colorVar(col,prop);
  pushColorRot(colVar, rot);


}

function pushPosPyramid(array, pos, color, prop, rot){

  var propColVarTriangle = prop[0];
  var propColVarVertex = prop[1];

  var col;
  var index = 0;

  var colorChange = Math.round(Math.random() * 2);
  switch(colorChange) {
      case 0:
        col = colVariationR(color,propColVarTriangle);
      break;

      case 1:
        col = colVariationG(color,propColVarTriangle);
      break;

      case 2:
        col = colVariationB(color,propColVarTriangle);
      break;

  }
  for (var i = 0; i < array.length; i++) {
    posForBuffer.push(pos[array[i]].x,pos[array[i]].y,pos[array[i]].z);
    pushColorRot(col, rot);
    col = colorVar(col,propColVarVertex);
  }

}
