#pragma glslify: blendExclusion = require(./exclusion)

uniform sampler2D tDiffuse;
uniform sampler2D flash;
uniform sampler2D flicker;
varying vec2 vUv;

void main() {
	vec3 color = texture2D(tDiffuse, vUv).rgb;

	vec3 flashColor = texture2D(flash, vUv).rgb;
	color = blendExclusion(color, flashColor);

	vec3 flickerColor  = texture2D(flicker, vUv).rgb;
	color = blendExclusion(color, flickerColor);

  gl_FragColor = vec4(color, 1.0);
}