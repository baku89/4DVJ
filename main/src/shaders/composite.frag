#pragma glslify: chromaticAberration = require(./chromatic-aberration)
#pragma glslify: blendExclusion = require(./exclusion)
// #pragma glslify: fxaa = require(glsl-fxaa) 


uniform vec2 resolution;
uniform sampler2D tDiffuse;
uniform float exposure;
uniform vec3 exclusionColor;
uniform vec3 hsvAjust;

varying vec2 vUv;


vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


void main() {
  // vec2 fragCoord = vUv * resolution;

  // TODO: aspect correction

  vec2 fragCoord = vUv * resolution;

  // chromatic aberration
  // TODO: aspect correction
  vec4 color = chromaticAberration(tDiffuse, vUv);

  // exclusion color
  color = vec4(blendExclusion(color.rgb, exclusionColor), 1.0);

  // ajsut
  vec3 hsv = rgb2hsv(color.rgb);
  hsv.x += hsvAjust.x;
  hsv.y *= hsvAjust.y;
  hsv.z *= hsvAjust.z;
  color = vec4(hsv2rgb(hsv), 1.0);

  gl_FragColor = color;//texture2D(tDiffuse, vUv);
}