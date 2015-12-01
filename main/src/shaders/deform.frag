#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

uniform vec2 resolution;
uniform sampler2D tDiffuse;
uniform float intensity;
uniform float time;

varying vec2 vUv;

void main() {
  vec2 fragCoord = vUv * resolution;

  // turbulance
  // vec3 noisePos = vec3(fragCoord/500.0, time / 1600.0);
  // fragCoord += (snoise3(noisePos)*2.0 - 1.0) * 80.0;

  gl_FragColor = texture2D(tDiffuse, fragCoord / resolution);
}