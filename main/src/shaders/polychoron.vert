uniform mat4 matrix4d;
uniform float distance4d;

attribute float positionW;

void main() {
	// transform in 4d
	vec4 pos4d = matrix4d * vec4(position, positionW);

	// stereograph
	pos4d = normalize(pos4d);

	// perspective projection from [0, 0, 0, distance4d] to XYZ hyperplane
	float d = distance4d / (distance4d - pos4d.w);
	vec3 pos = pos4d.xyz * d;

	// 3d transform
	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}