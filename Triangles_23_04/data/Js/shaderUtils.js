function initShaderFunction(){
	var triangles = 500;

	var geometry = new THREE.BufferGeometry();

	// var positions = [];
	var colors = [];

	for ( var i = 0; i < triangles; i ++ ) {

		// positions.push( Math.random() - 0.5 );
		// positions.push( Math.random() - 0.5 );
		// positions.push( Math.random() - 0.5 );

		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );
		colors.push( Math.random() * 255 );

	}

	// var positionAttribute = new THREE.Float32BufferAttribute( positions, 3 );

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
