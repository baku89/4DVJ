uniform mat4 matrix4d;
uniform mat4 localMatrix4d;
uniform vec4 translate4d;
uniform mat4 ringMatrix4d;

uniform vec2 distance4d;

void main() {

	// transform in 4d
	vec4 pos4d = matrix4d * localMatrix4d * (ringMatrix4d * vec4(position, 0.0) + translate4d);

	// stereograph
	//pos4d = normalize(pos4d);

	// perspective projection from [0, 0, 0, distance4d] to XYZ hyperplane
	float d = distance4d.x / (distance4d.x - pos4d.w);
	vec3 pos = pos4d.xyz * d;

	// 3d transform
	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}