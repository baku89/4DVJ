#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: PI = require(glsl-pi)
#pragma glslify: map = require(glsl-map)

uniform vec2 resolution;
uniform sampler2D tDiffuse;
uniform float intensity;
uniform float time;
uniform float turbulanceAmp;
uniform float slitscanIntensity;
uniform float lensRadius;
uniform float lensIntensity;
uniform int effectKind;

#define EFFECT_NONE   0
#define EFFECT_REPEAT 1
#define EFFECT_MIRROR_RIGHT 2
#define EFFECT_MIRROR_LEFT  3
#define EFFECT_POLAR  4

varying vec2 vUv;

vec2 rotateVec2(vec2 p, float radian) {
	float s = sin(radian);
	float c = cos(radian);
	return p * mat2(c, s, -s, c);
}

void main() {
  vec2 fragCoord = vUv * resolution;
  vec2 halfr = resolution / 2.0;

  // ------------------------------------------------
  // turbulance
  vec3 noisePos = vec3(fragCoord/500.0, time / 2000.0);
  fragCoord += vec2(snoise3(noisePos), snoise3(noisePos+300.0)) * turbulanceAmp;

  // ------------------------------------------------
  // slitscan

  noisePos = vec3(fragCoord.x/1200.0, fragCoord.y/400.0, time / 12000.0);
  vec2 slitscanCoord = fragCoord + vec2(snoise3(noisePos+1000.0), snoise3(noisePos+33300.0)) * 20.0;
  slitscanCoord.x = map(fragCoord.x, 0.0, resolution.x, halfr.x - 3.0, halfr.x + 3.0);

  fragCoord = mix(fragCoord, slitscanCoord, slitscanIntensity);

  

  // ------------------------------------------------
  // effect
  if (effectKind == EFFECT_REPEAT) {
    fragCoord.x = mod(fragCoord.x, resolution.x/3.0) + resolution.x/3.0;

  } else if (effectKind == EFFECT_MIRROR_RIGHT) {
    float x = fragCoord.x / resolution.x;
    x = abs((1.0 - x) - 0.5) + 0.5;
    fragCoord.x = x * resolution.x;

  } else if (effectKind == EFFECT_MIRROR_LEFT) {
    float x = fragCoord.x / resolution.x;
    x = 0.5 - abs((1.0 - x) - 0.5);
    fragCoord.x = x * resolution.x;
  
  } else if (effectKind == EFFECT_POLAR) {
    
  }


  // ------------------------------------------------
  // lens
  vec2 center = fragCoord - resolution / 2.0;
  float r = length(center);
  float a = atan(center.y, center.x);

  if (r < lensRadius) {
    float phase = map(r, 0.0, lensRadius, PI/2.0, 2.0*PI);
    r = lensRadius * cos(phase) * (r / lensRadius);
  }
  vec2 lensCoord = r * vec2(cos(a), sin(a)) + resolution / 2.0;
  fragCoord = mix(fragCoord, lensCoord, lensIntensity);

  // ------------------------------------------------
  gl_FragColor = texture2D(tDiffuse, fragCoord / resolution);
}