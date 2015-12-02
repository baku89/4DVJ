#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 

uniform float time;
uniform mat4 matrix4d;
uniform vec2 distance4d;
uniform float wiggleAmp;
uniform float wiggleIntensity;

attribute float positionW;

varying vec2 vUv;

void main() {

  vUv = uv;

  vec4 pos4d = vec4(position, positionW);

  // wiggle
  // pos4d += time;
  pos4d += vec4(
  	snoise2(pos4d.xy + time*0.7),
  	snoise2(pos4d.wz + time*0.7),
  	snoise2(pos4d.yw + vec2(1000.0, 500.0) + time*0.7),
  	snoise2(pos4d.zx + vec2(100.0, -500.0) + time*0.7)) * wiggleAmp * wiggleIntensity;

  // transform in 4d
	pos4d = matrix4d * pos4d;

	// stereograph
	pos4d = normalize(pos4d);

	// perspective projection from [0, 0, 0, distance4d] to XYZ hyperplane
	float d = distance4d.x / (distance4d.x - pos4d.w);
	vec3 pos = pos4d.xyz * d;

  // 3d transform
	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}