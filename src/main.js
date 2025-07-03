import * as THREE from 'three';

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene + Camera
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

// Geometry
const geometry = new THREE.PlaneGeometry(2, 2);

// Uniforms
const uniforms = {
  u_time: { value: 0.0 },
  u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
};

// ShaderMaterial
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    uniform float u_time;
    uniform vec2 u_resolution;

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec3 color = vec3(st.x, st.y, abs(sin(u_time)));
      gl_FragColor = vec4(color, 1.0);
    }
  `
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render loop
function animate(time) {
  uniforms.u_time.value = time * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});
