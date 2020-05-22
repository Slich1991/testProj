var renderer, scene, camera;

window.onload = function() {
	var width = window.innerWidth;
	var height = window.innerHeight - 100;
	var canvas = document.getElementById('canvas');

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x00ffff);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
	camera.position.set(0, 0, 1000);

	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

	renderer.render(scene, camera);

}

function render() {

	renderer.render( scene, camera );

}

function createObj() {
	
	var size = document.getElementById('size').value;
	if(size < 1 || size > 10)
	{
		alert("Enter value in diapason 1...10.");
		return;
	}
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	switch(document.getElementById('figures').value)
	{
		case '1':
			geometry = new THREE.BoxGeometry(size, size, size);
		break;
		case '2':
			geometry = new THREE.SphereGeometry(size, size, size);
		break;
		case '3':
			geometry = new THREE.ConeGeometry(size, size, size);
		break;


	}
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.y = Math.random() * 400;
	mesh.position.x = Math.random() * 400;
	mesh.position.z = Math.random() * 300;
	scene.add(mesh);
	renderer.render( scene, camera );
	addToList(mesh.uuid, mesh.id);
}

function addToList (uuid, id){
	var element = document.getElementById("list");
	element.innerHTML += "<span id=\"name_"+id+"\">"+uuid+"</span> <button id=\"remove_"+id+"\" style=\"height: 50; width: 50;\" onclick=\"remove("+id+")\">X</button><br id=\"br_"+id+"\">";
}

function remove(id){
	var name = "name_"+id;
	var nameRem = "remove_"+id;
	var brName = "br_"+id;
	var uuid = document.getElementById(name).textContent;
	var	object = scene.getObjectByProperty( 'uuid', uuid );

	object.geometry.dispose();
	object.material.dispose();
	scene.remove( object );
	renderer.render( scene, camera );

	var element = document.getElementById(name);
	var element2 = document.getElementById(nameRem);
	var element3 = document.getElementById(brName);
    element.parentNode.removeChild(element);
    element2.parentNode.removeChild(element2);
    element3.parentNode.removeChild(element3);
}