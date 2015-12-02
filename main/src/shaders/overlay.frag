#pragma glslify: blendExclusion = require(./exclusion)

uniform sampler2D tDiffuse;
uniform sampler2D attack;
uniform sampler2D zfighting;
varying vec2 vUv;

void main() {
	vec3 color = texture2D(tDiffuse, vUv).rgb;

	vec3 attackColor = texture2D(attack, vUv).rgb;
	color = blendExclusion(color, attackColor);

	vec3 zfightingColor  = texture2D(zfighting, vUv).rgb;
	color = blendExclusion(color, zfightingColor);

  gl_FragColor = vec4(color, 1.0);
}