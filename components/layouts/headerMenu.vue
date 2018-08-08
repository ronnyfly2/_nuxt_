<template lang="pug">
	header
		el-row.box_center
			el-col(:span="4").align_left
				img.logo(src="../../assets/img/logo_delicores_v2.png")
			el-col(:span="10")
				.principal_search
					input(type="text")
					i.fas.fa-search
						a.menu_responsive.icon.icon-menu(href="javascript:;")
						a.menu_responsive.icon.icon-close(href="javascript:;")
			el-col(:span="10")
				el-menu(:default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect")
					el-menu-item(index="1")
						a(href="https://www.ele.me" target="_blank")
							i.fas.fa-phone
							span Contáctenos
					el-menu-item(index="2")
						a(href="https://www.ele.me" target="_blank")
							i.fas.fa-sign-in-alt
							span Regístrate
					el-menu-item(index="3")
						a(href="https://www.ele.me" target="_blank")
							i.fas.fa-user
							span Inicia Sesión
				i.fas.fa-shopping-basket
		nav
			ul()
				li(v-for="(categorie, key) in categories" :key="key" v-on:mouseover="mouseSubmenu(key)" @mouseleave="mouseSubmenu(key)")
					a(href="javascript:;") {{ categorie.name }}
				li
					a(href="javascript:;" v-on:mouseover="mouseSubmenu(20)" @mouseleave="mouseSubmenu(20)") Complementos
				li
					a(href="javascript:;" v-on:mouseover="mouseSubmenu(20)" @mouseleave="mouseSubmenu(20)") Ofertas
				li
					a(href="javascript:;" v-on:mouseover="mouseSubmenu(20)" @mouseleave="mouseSubmenu(20)") Notas
			ul.sub_menu(v-if="categorieIdx != null && categorieIdx < 19 && categories[categorieIdx].subcategories.length > 0")
				li(v-for="(subCategorie, idx) in categories[categorieIdx].subcategories" :key="idx")
					a(href="javascript:;") {{ subCategorie.name }}
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
	props:['ListMenu'],
	middleware: 'category',
	data () {
		return {
			categoriesAll:null,
			activeSubmenu:false,
			categorieIdx:null,
			loading: false,
			activeIndex: '1',
		}
	},
	computed:
		mapGetters (['categories']),
	mounted() {
		//let storeApiss = new createStore;
		console.log(this,'store',mapGetters, 'store 2',this.$store.state);
		axios.defaults.baseURL = 'http://erp.delicores.com/api/';
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.clientToken;
		axios.get('http://erp.delicores.com/api/guest/categories')
		.then((res) => {
			console.log('categorias consola: ', res.data)
			//return { noticias: res.data }
		})
		let users = {
			"name": "Ronny",
			"last_name": "Cabrera",
			"email": "holddda@gmail.com",
			"password": "123456",
			"document_type": "DNI",
			"document_number": "459991958",
			"phone": "+51 950 468 383",
			"birthdate": "1988-05-30"
		};
		let loginUser ={"email": "holddda@gmail.com",
			"password": "123456"};
		//axios.post('http://erp.delicores.com/api/guest/users', {"user":users })
		//.then((res)=>{
			//console.log(res);
		//})
		if(!localStorage.clientToken){
			axios.post('http://erp.delicores.com/api/guest/users/login', {"user":loginUser })
			.then((res)=>{
				console.log(res.data.data.user.auth.access_token);
				localStorage.clientToken = res.data.data.user.auth.access_token
			})
		}
		axios.delete('http://erp.delicores.com/api/categories/Zr3BDg4Gn2zB4dXPaEb8VK76/subcategories/'+'RybaJpmDv2wZWz57GxBk9l6g')
			.then((res)=>{
				console.log('delete',res.data.data);
				localStorage.clientToken = res.data.data
			})
		//axios.post('http://erp.delicores.com/api/categories', {"category":{"name":'Espumantes', "slug":'espumantes'}})
			//.then((res)=>{
				//console.log('post',res.data.data);
				//localStorage.clientToken = res.data.data
			//})
		//axios.post('http://erp.delicores.com/api/categories/'+'Zr3BDg4Gn2zB4dXPaEb8VK76'+'/subcategories', {"subcategory":{"name":'Barato', "slug":'barato'}})
			//.then((res)=>{
				//console.log('post',res.data.data);
				//localStorage.clientToken = res.data.data
	//		})
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		mouseSubmenu(key){
			this.categorieIdx = key;
			console.log(key);
			//this.activeSubmenu = !this.activeSubmenu;
		}
		//-ctnActive(event, currentItem, lastActiveItem){
		//-	// Add your items
		//-},
		//-openMenu(){
		//-	let element = document.querySelectorAll("header nav ul");
		//-	if (element[0].classList.contains('active_menu_responsive')) {
		//-		element[0].classList.remove('active_menu_responsive');
		//-	}else{
		//-		element[0].classList.add('active_menu_responsive');
		//-	}
		//-}
	}
}
</script>

<style lang="stylus">
@require './../../stylus/base/base.styl'
.menu_responsive
	display none
	margin-top 32px
	&.icon-close
	&.icon-menu
		font-size 28px
header
	height 102px
	width 100%
	background #ffffff
	position fixed
	top 0
	z-index 99
	box-shadow -1px -1px 11px 0px #ccc
	//padding 0 50px
	.box_center
		padding 0 10px
		.el-menu--horizontal
			border-bottom none
			>.el-menu-item
				height auto
				margin 0
				border-bottom none
				line-height normal
				border-right 1px solid #dbdbdb
				&:last-child
					border-right none
				a
					color #303646
					line-height 1.7
					font-size 16px
				i
					display none
.principal_search
	position relative
	input
		width 100%
		padding 0 12px
		max-width 642px
		height 42px
		border none
		outline none
		background-color #f9f9f9
		border-radius 15px
	i
		position absolute
		right 7px
		top 7px
		color white
		height 30px
		width 30px
		text-align center
		background-color #dbdbdb
		line-height 1.8
		border-radius 50%
.logo
	width 100%
	max-width 240px
	margin-top 20px
	min-width 150px
nav
	width 100%
	text-align left
	>ul
		background $PrimaryColor
		list-style-type none
		padding 0
		display flex
		flex-direction row
		flex-wrap nowrap
		justify-content space-around
		&:hover + .sub_menu
			display flex
		li
			margin 0
			position relative
		a
			color #f9f9f9
			text-align center
			display block
			font-size 18px
			EncodeSans(200)
			line-height 3.5
			padding 0 12px
			&:hover
				font-weight 800
			&.active_nav
				color #eb0528
			&.router-link-exact-active
				border-bottom 3px solid #ffffff
				color #ffffff
	ul.sub_menu
		width 100%
		backgroundRGBASecondary(.9)
		padding 15px 0
		display none
		a
			border-radius 17px
			background-color $SecondaryColor
			line-height 2
	.sub_menu:hover
		display flex
@media only screen and (max-width: 1060px)
	.menu_responsive
		display block
		text-align right
		position absolute
		right 10px
		top 0
	.logo
		width 300px
</style>
