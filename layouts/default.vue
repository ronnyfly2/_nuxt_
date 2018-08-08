<template lang="pug">
	section.container
		headerMenu
		nuxt
		Footer
</template>

<script>
import headerMenu from '~/components/layouts/headerMenu.vue';
import Footer from '~/components/layouts/Footer.vue';

export default{
	components:{
		headerMenu,
		Footer
	}
}
</script>

<style lang="stylus">
html
	font-family 'Encode Sans Expanded', sans-serif
	font-size 16px
	word-spacing 1px
	-ms-text-size-adjust 100%
	-webkit-text-size-adjust 100%
	-moz-osx-font-smoothing grayscale
	-webkit-font-smoothing antialiased
	box-sizing border-box

body
	text-align center
	width 100%
	height 100%
	position relative
	padding-top 102px

*, *:before, *:after
	box-sizing border-box
	margin 0
</style>
