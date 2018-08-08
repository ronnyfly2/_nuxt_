import axios from 'axios';

export default function ( {params, store} ) {

 // if(!store.state.hasCategories) {
	console.log('return params',params,store.$axios.defaults.baseURL)
    return axios.get(store.$axios.defaults.baseURL+'guest/categories')
    .then ((res) => {
			console.log('category', res.data.data.categories)
      store.commit('addCategories', res.data.data.categories)
      //store.commit('changeHasCategories')
    });
  //}
}
