#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: PI = require(glsl-pi)

uniform vec2 resolution;
uniform sampler2D tDiffuse;
uniform float intensity;
uniform float time;
uniform float turbulanceAmp;
uniform float radius;
uniform int isRepeat;

varying vec2 vUv;

vec2 rotateVec2(vec2 p, float radian) {
	float s = sin(radian);
	float c = cos(radian);
	return p * mat2(c, s, -s, c);
}

void main() {
  vec2 fragCoord = vUv * resolution;

  // turbulance
  vec3 noisePos = vec3(fragCoord/500.0, time / 2000.0);
  fragCoord += vec2(snoise3(noisePos), snoise3(noisePos+300.0)) * turbulanceAmp;

  // center polar
  vec2 polarVec = fragCoord - resolution / 2.0;
  if (length(polarVec) < radius) {
  	polarVec = rotateVec2(polarVec, time / 10000.0);
  	fragCoord = vec2(
	  	(atan(polarVec.x, polarVec.y) / PI + 1.0) / 2.0 * resolution.x,
	  	fract( sin(length(polarVec)/radius * PI * 0.7) ) * radius
	  );
  }

  // repeat
  if (isRepeat == 1) {
    fragCoord.x = mod(fragCoord.x, resolution.x/3.0) + resolution.x/3.0;
  }


  gl_FragColor = texture2D(tDiffuse, fragCoord / resolution);
}