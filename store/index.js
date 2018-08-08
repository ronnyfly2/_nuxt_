import Vuex from 'vuex'

const store = () => new Vuex.Store ({
	state: {
		categories: [],
		subcategories:[],
		hasCategories: false,
		searchedPosts: [],
		authenticated: false,
		counter: 0,
		tokenStr: ''
	},
	mutations: {
		addCategories(state, payload){
			state.categories = payload;
			console.log('mutations state', state);
			console.log('mutations payload', payload);
		},
	},
	getters: {
		categories(state){
			console.log('gtterss',state)
			return state.categories
		},
	},
})
export default store
