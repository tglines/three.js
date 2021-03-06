/**
 * @author Mikael Emtinger
 */
 
THREE.LensFlare = function ( texture, size, distance, blending ) {

	THREE.Object3D.call( this );

	this.positionScreen = new THREE.Vector3();
	this.lensFlares = [];
	this.customUpdateCallback = undefined;

	if( texture !== undefined ) {
		
		this.add( texture, size, distance, blending );
		
	}
};

THREE.LensFlare.prototype = new THREE.Object3D();
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.supr = THREE.Object3D.prototype;


/*
 * Add: adds another flare 
 */

THREE.LensFlare.prototype.add = function( texture, size, distance, blending ) {
	
	if( size === undefined ) size = -1;
	if( distance === undefined ) distance = 0;
	if( blending === undefined ) blending = THREE.BillboardBlending;
	
	distance = Math.min( distance, Math.max( 0, distance ));

	this.lensFlares.push( { texture: texture, 			// THREE.Texture
		                    size: size, 				// size in pixels (-1 = use texture.width)
		                    distance: distance, 		// distance (0-1) from light source (0=at light source)
		                    x: 0, y: 0, z: 0,			// screen position (-1 => 1) z = 0 is ontop z = 1 is back 
		                    scale: 1, 					// scale
		                    rotation: 1, 				// rotation
		                    opacity: 1,					// opacity
		                    blending: blending } );		// blending

}


/*
 * Update lens flares update positions on all flares based on the screen position
 * Set myLensFlare.customUpdateCallback to alter the flares in your project specific way.
 */

THREE.LensFlare.prototype.updateLensFlares = function( visibility ) {
	
	var f, fl = this.lensFlares.length;
	var flare;
	var vecX = -this.positionScreen.x * 2;
	var vecY = -this.positionScreen.y * 2; 
	
	
	for( f = 0; f < fl; f++ ) {
		
		flare = this.lensFlares[ f ];
		
		flare.x = this.positionScreen.x + vecX * flare.distance;
		flare.y = this.positionScreen.y + vecY * flare.distance;

		flare.wantedScale = ( visibility * 0.2 + 0.8 );
		flare.wantedRotation = flare.x * Math.PI * 0.25;
		flare.wantedOpacity = visibility;
		
		flare.scale += ( flare.wantedScale - flare.scale ) * 0.25;
		flare.rotation += ( flare.wantedRotation - flare.rotation ) * 0.25;
		flare.opacity += ( flare.wantedOpacity - flare.opacity ) * 0.5;

	}

}












