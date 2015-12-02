#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

uniform float time;
uniform float wiggleAmp;
uniform float wiggleIntensity;

attribute float positionW;

varying vec2 vUv;

void main() {

  vUv = uv;

  // wiggle
  // pos4d += time;
  vec3 pos = position + vec3(
  	snoise3(position + time*0.7),
  	snoise3(position + vec3(1000.0, 500.0, 110.0) + time*0.7),
  	snoise3(position + vec3(100.0, -500.0, -400.0) + time*0.7)) * wiggleAmp * wiggleIntensity;

  // 3d transform
	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}