uniform sampler2D tDiffuse;
uniform sampler2D overlay;
varying vec2 vUv;

void main() {
  gl_FragColor = max(texture2D(tDiffuse, vUv), texture2D(overlay, vUv));
}