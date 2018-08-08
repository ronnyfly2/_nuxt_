const webpack = require('webpack')
module.exports = {
	mode: 'spa',
	/*
	Apis link or url principal for api
	*/
	env: {
		baseUrl: process.env.BASE_URL || 'http://erp.delicores.com/api/'
	},
  /*
  ** Headers of the page
  */
  head: {
    title: 'Delicores | venta de licores en Lima',
    meta: [
			{ charset: 'utf-8' },
			{ name:'language', content:'es-PE'},
			{ 'http-equiv':'X-UA-Compatible', content:'IE=edge,chrome=1'},
			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
			{ name:'author', content:'Delicores Distribuidora'},
			{ name:"robots", content:'index, follow'},
			{ hid: 'title', name: 'title', content:'Delicores Distribuidora | Venta de licores a buen precio'},
			{ hid: 'description', name: 'description', content: 'Venta de licores a por mayor y menos, distribuidora de vinos y licores a buenos precios.' },
			{ hid: 'keywords', name:'keywords', content:'licor, licores, licores a buen precio, licor barato, pisco barato, whisky barato, distribuidora de licores, vinos, licores delivery, delivery de licores la molina surco'},
			{ property:'og:description', content:"Venta de licores a por mayor y menor, distribuidora de vinos y licores a buenos precios."},
			{ property:'og:image', content:'https://delicores.com/static/img/logo_delicores.c31589c.png'},
			{ property:'og:site_name', content:'Delicores.com'},
			{ property:'og:title', content:'Delicores Distribuidora | Venta de licores a buen precio en Lima'},
			{ property:'og:type', content:'website'},
			{ property:'og:url', content:'https://delicores.com/'}
		],
		script: [
			{ src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAjANx4BfyF8TubDB__QYje0d6oquO5cJQ' },
			{ src: 'https://cdn.emailjs.com/dist/email.min.js?callback=window.emailjs'}
    ],
    link: [
			{	rel:'alternate', href:'https://delicores.com', hreflang:'es-pe'},
			{	rel:'stylesheet',href:"https://use.fontawesome.com/releases/v5.0.13/css/all.css", integrity:"sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp", crossorigin:"anonymous"},
			{	rel:'stylesheet',href:"https://fonts.googleapis.com/css?family=Encode+Sans|Encode+Sans+Expanded:100,300,400,500,600,700"},
      { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.png' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
	modules: [
		'@nuxtjs/axios',
	],
	axios: {
		baseURL: process.env.BASE_URL || 'http://erp.delicores.com/api/',
		credentials: false
	},
	router: {
    middleware: 'category'
  },
  plugins:[
		{src:'~plugins/element-ui.js'},
		{src:'~plugins/aos.js',ssr: false },
		{src:'~plugins/others.js'}
	],
  css:['~assets/css/style.styl'],
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios','aos','element-ui'],
    plugins: [
      new webpack.ProvidePlugin({
        //-'$': 'jquery'
        //-'_': 'lodash'
        // ...etc.
      })
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
