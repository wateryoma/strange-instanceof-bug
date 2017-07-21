import axios from 'axios'
import _get from 'lodash/get'

let request = axios.create({
	baseURL: 'http://localhost:3000'
})

request.interceptors.request.use(function (config) {
	config.headers['Cache-Control'] = 'no-cache'
	config.headers['N-G-Update'] = 1
	return config
})

const MockAdapter = require('axios-mock-adapter')
let mock = new MockAdapter(request, {delayResponse: 500})
mock.onGet(/^\/projects\/\d+/i).reply(200, {
	test: 'whatever'
})

export default {
	getData: ({dispatch}, actions) => Promise.all(actions.map(action => dispatch(action))),
	// Fake Async API Calls
	getTestTitle: ({commit}) => new Promise(resolve => {
		setTimeout(() => {
			commit('SET_TEST_TITLE', 'Test | Axios mock test')
			resolve()
		}, 1000)
	}),
	getTestContent: ({commit}) => new Promise(resolve => {
		return request.get('projects/123').then((r) => {
			commit('SET_TEST_CONTENT', _get(r, 'data.test', ''))
		}).catch((err) => {
			console.log(err)
		})
	})
}
