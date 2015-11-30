void main() {
	gl_Position = projetionMatrix * modelViewMatrix * vec4(position, 1.0)
}