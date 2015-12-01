#pragma glslify: blendExclusion = require(./exclusion)

uniform sampler2D tDiffuse;
uniform sampler2D overlay;
varying vec2 vUv;

void main() {
	vec3 src = texture2D(tDiffuse, vUv).rgb;
	vec3 attack = texture2D(overlay, vUv).rgb;
  gl_FragColor = vec4(blendExclusion(src, attack), 1.0);
}