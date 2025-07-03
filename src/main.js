import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Example geometry with a basic ShaderMaterial
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  vertexShader: 
    `void main() { 
      gl_Position = vec4(position, 1.0); 
    }`,
  fragmentShader: 
    `void main() { 
      gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0); 
    }`
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 2;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
