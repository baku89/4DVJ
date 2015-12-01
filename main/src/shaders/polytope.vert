uniform mat4 matrix4d;
uniform vec2 distance4d;

attribute float positionW;
attribute vec3 color;

varying vec3 vColor;

void main() {
	// color
	vColor = color;

	// transform in 4d
	vec4 pos4d = matrix4d * vec4(position, positionW);

	// stereograph
	pos4d = normalize(pos4d);

	// perspective projection from [0, 0, 0, distance4d] to XYZ hyperplane
	float d = distance4d.x / (distance4d.x - pos4d.w);
	vec3 pos = pos4d.xyz * d;

	// 3d transform
	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}