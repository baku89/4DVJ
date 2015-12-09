import Vue from 'vue'


class App {

	constructor() {

		new Vue({
			el: '#app',
			data: {
				message: 'Hello Vue!'
			},
			methods: {
				reverseMessage() {
					this.message = this.message.split('').reverse().join('')
				}
			}
		})
	}

}




new App()

