<template lang="pug">
	main.main
		section(id="section-1" class="slider_banner")
			el-carousel(:interval="5000" arrow="always")
				el-carousel-item(v-for="(item, index) in slider" :key="index")
					img(:src="item.src" @load="resizeImg" :title="item.title" :alt="item.description")
		section.brand_section
			.box_center
				h3.brand_text Marcas:
				.brand_box(data-aos="fade-rigth" data-aos-delay="300" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/1_johnnie_walker_delicores.png")
				.brand_box(data-aos="fade-left" data-aos-delay="800" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/2_chivas_delicores.png")
				.brand_box(data-aos="fade-up" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/3_something_special_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="380" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/4_navarro_correas_delicores.png")
				.brand_box(data-aos="fade-left" data-aos-delay="380" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/5_rutini_wines_delicores.png")
				.brand_box(data-aos="fade-down" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/6_finca_las_moras_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="2100" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/7_absolute_vodka_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="800" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/8_smirnoff_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="2400" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/9_danzka_vodka_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="3000" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/10_jose_cuervo_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="2500" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/11_cazadores_delicores.png")
				.brand_box(data-aos="fade-top" data-aos-delay="3500" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/12_the_patron_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="2000" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/13_baileys_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="3200" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/14_tanqueray_delicores.png")
				.brand_box(data-aos="fade-down" data-aos-delay="1500" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/15_cuatro_gallos_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="200" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/16_demonio_de_los_andes_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/17_miller_delicores.png")
				.brand_box(data-aos="fade-rigth" data-aos-delay="2500" data-aos-offset="70")
					img(src="~/assets/img/logo_marcas_delicores/18_cusquena_delicores.png")
		section.contact_section(id="section-5" v-loading="loadingMap")
			.contact_section_form(v-loading="loadingForm")
				h3 Contáctenos
				span ¿Tienes alguna duda o sugerencia?
				el-form(:model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" id="el-form")
					el-form-item(prop="name")
						el-input(v-model="ruleForm.name" placeholder="Nombre")
					el-form-item(prop="email")
						el-input(v-model="ruleForm.email" placeholder="Correo Electronico")
					el-form-item(prop="celphone")
						el-input(v-model="ruleForm.celphone" placeholder="Telefono")
					el-form-item(prop="message")
						el-input(type="textarea" v-model="ruleForm.message" placeholder="Mensaje")
					fieldset
						button.btn(type="button" @click="sendContact") Enviar
			#mapDelicores
</template>
<script>
//- import axios from 'axios'
//- import config from '../../../config'
//import firebaseDat from 'firebase';
import { ListContacts } from '~/fire/contact-firebase';
import 'aos/dist/aos.css'
//window.emailjs = window.emailjs;

export default {
	name: 'Landing',
	mounted () {
		//- config.domain= (config.isProd) ? location.origin : config.domain;
		let self = this;
		self.onResize();
		document.addEventListener("keydown", (e) => {
			if(e.keyCode == 13) {
				self.sendContact()
				e.preventDefault()
			}
		});
		self.getMap();
	},
	data () {
		return {
			ruleForm: {
				name: '',
				email:'',
				celphone:'',
				message:''
			},
			rules: {
				name: [
					{ required: true, message: 'Este campo es obligatorio', trigger: 'blur' }
				],
				email: [
					{ required: true, message: 'Este campo es obligatorio', trigger: 'blur' },
					{ type: 'email', message: 'Debe de escribir un email válido', trigger: 'blur,change' }
				]
				//-celphone:[
				//-	{ type: 'number', message: 'debe ser un número válido', trigger: 'blur'},
				//-	{ min: 6, max: 11, message: 'Al menos debe tener min 6 max 11', trigger: 'blur' }
				//-]
			},
			loading: false,
			loadingMap:false,
			loadingForm:false,
			ctnActive:'',
			marketsPlacesDelicores:[
				["Delicores", "-12.065682", "-76.953452", "pinDelicores", "<div>Delicores Distribuidora</div>"],
				["El Quijote", "-12.061098", " -76.941679", "pinDelicores", "<div>El Quijote</div>"],
				["El Quijote II Surco", "-12.137776", "-76.995065", "pinDelicores", "<div>El Quijote II Surco</div>"],
			],
			slider:[
				{
					'src' :'https://placeimg.com/1400/434/tech',
					'title': 'Jack Daniels',
					'description':'Esta es un whisky'
				},
				{
					'src' :'https://placeimg.com/1400/434/any',
					'title': 'Jack Daniels 2',
					'description':'Esta es un whisky 2'
				},
				{
					'src' :'https://placeimg.com/1400/434/people',
					'title': 'Jack Daniels 2',
					'description':'Esta es un whisky 2'
				},
				{
					'src' : 'https://picsum.photos/1400/434',
					'title': 'Jack Daniels 2',
					'description':'Esta es un whisky 2'
				}
			]
		}
	},
	methods: {
		sendContact(){
			let self=this;
			let service_id = "default_service";
			let template_id = "template_bgfRAJMp";
			var formContact = {
				name: self.ruleForm.name,
				email: self.ruleForm.email,
				celphone: self.ruleForm.celphone,
				message: self.ruleForm.message,
			};
			self.loadingForm=true;
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					//-this.$firebaseRefs.ListContactsLocal.push(formContact).then(()=>{
					ListContacts.push(formContact).then(()=>{
						self.loadingForm=false;
						window.emailjs.init('user_k9npnRKSuqvriv3NA5A58');
						window.emailjs.send(service_id, template_id, formContact)
							.then(function(){
								self.ruleForm.name = ''
								self.ruleForm.email = ''
								self.ruleForm.celphone = ''
								self.ruleForm.message = ''
								self.$notify({
									title: 'Enviado',
									message: 'Tus datos fueron enviados correctamente',
									type: 'success'
								});
								self.loadingForm=false;
							}, function(err) {
								alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
						});
					})
				}else{
					self.loadingForm=false;
					return false;
				}
			});
		},
		sendMail(){
			let self=this;
			let emailjs = window.emailjs;
		},
		emailjs(){
			let self=this;
			window.emailjs.init('user_k9npnRKSuqvriv3NA5A58');
		},
		getMap(){
			let self=this;
			let initializeMapAdd = window.google.maps;
			self.loadingMap=true;
			initializeMapAdd = self.initializeMap;
			initializeMapAdd()
		},
		initializeMap(){
			let self=this;
			let lat = parseFloat(-12.110605348025604);
			let lng = parseFloat(-77.02907404656986);
			let mapOptions = {
				zoom: 12,
				center: new google.maps.LatLng(lat, lng),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: [
					{
						stylers: [
							{
								hue: '#C0C0C0'
							}, {
								saturation: -98
							}, {
								lightness: 2
							}
						]
					}
				],
			}
			let map = new google.maps.Map(document.getElementById("mapDelicores"), mapOptions);
			self.setDelicoresMarkers(map, self.marketsPlacesDelicores);
		},
		setDelicoresMarkers(map, locations) {
			let self=this;
			let markers = Array();
			let infoWindow = false;
			let pinDelicores = new google.maps.MarkerImage(
				"https://delicores.com/imgs/pin_delicores.png",
				new google.maps.Size(28, 35)
			);
			for(var i=0; i<locations.length; i++) {
				var elPunto = locations[i];
				var myLatLng = new google.maps.LatLng(elPunto[1], elPunto[2]);

				markers[i]=new google.maps.Marker({
					position: myLatLng,
					map: map,
					icon: eval(elPunto[3]),
					title: elPunto[0]
				});
				markers[i].infoWindow=new google.maps.InfoWindow({
					content: elPunto[4]
				});
				google.maps.event.addListener(markers[i], 'click', function(){
					if(infoWindow)
						infoWindow.close();
					infoWindow = this.infoWindow;
					infoWindow.open(map, this);
				});
			}
			self.loadingMap=false;
		},
		resizeImg(callback){
			this.loading = true;
			var preview = document.querySelectorAll('.el-carousel__item > img');
			var ctnImg = document.getElementById('section-1');
			ctnImg.style.height = preview[0].clientHeight+ 'px';
			//-$('.el-carousel__container').css('height', preview[0].clientHeight);
		},
		onResize(){
			let self = this;
			window.addEventListener('resize', this.resizeImg)
		}
	}
}
</script>
<style lang="stylus">
.el-notification__content
	text-align left !important
section
	position relative
	&.presentation_ctn
		z-index 2
	&.about_us
		z-index 1
		margin-top -43px
		font-size 0
.contact_section
	position relative
	&_form
		position absolute
		top 0
		left 0
		z-index 2
		width 100%
		max-width 552px
		min-width 320px
		padding 0 20px
		padding-top 35px
		height 700px
		background-color #080d2d
		text-align center
		h3
			font-family 'Encode Sans Expanded', sans-serif
			font-size 30px
			font-stretch expanded
			color #ffffff
			padding-top 35px
		span
			font-size 20px
			font-stretch expanded
			color #6d6d6d
			padding 20px 0
			display block
		.el-form-item__content
			margin 0 auto !important
		.el-input
		.el-textarea
			max-width 393px
			margin 0 auto !important
		.el-form-item__error
			width 100%
			text-align center
		input
			max-width 393px
			height 43px
			border-radius 100px
			background-color #141835
			border 1px solid transparent
			padding-left 10px
			text-align center
			color #ffffff
		textarea
			max-width 393px
			height 115px
			border-radius 31px
			background-color #141835
			border 0
			text-align center
			resize none
			color #ffffff
		fieldset
			max-width 393px
			margin 0 auto
		button
			margin 0 auto
			width 183px
			color white
			height 49px
			border-radius 100px
			background-color #eb0528
			line-height 1
#mapDelicores
	width 100%
	height 700px
	margin 0 auto
	position relative
	overflow hidden
	z-index 1
.about_us
	&_box
		background white
	.box_center
		>div
			display inline-block
			vertical-align middle
			width 50%
			text-align center
			h3
				font-size 60px
				font-stretch expanded
				color #080d2d
				max-width 516px
				margin 0 auto
				margin-bottom 45px
				position relative
				&:before
					content ''
					width 253px
					height 5px
					border-radius 100px
					background-color #080d2d
					position absolute
					bottom -4px
					left 25%
			span
				font-family 'Encode Sans Expanded', sans-serif
				color #080d2d
				font-size 20px
				&.color_red
					color #eb0528
	&_bg_bottom
		background rgba(0,0,0,0) url('~/assets/img/bg_3.png') no-repeat
		height 60px
	&_text
		font-family 'Encode Sans Expanded', sans-serif !important
		color #846868 !important
		font-stretch expanded
		max-width 513px
		display block
		margin 0 auto
		margin-top 32px
	&_right
		img
			margin-bottom 16px
	&_left
		img
			max-width 563px
			width 100%
.vission
.mission
	z-index 0
	background #080d2d
	margin-top -60px
	>div
		width 50%
		display inline-block
		vertical-align middle
	.drinks
		margin-top 40px
	&_left
		background rgba(0,0,0,0) url('~/assets/img/bar_delicores.jpg') no-repeat
		height 676px
		background-position -27px
		text-align center
	&_right
		text-align center
		h3
			width 198px
			font-size 60px
			font-stretch expanded
			color #d5011b
			margin 0 auto
			position relative
			&:after
				content ''
				width 106px
				height 5px
				border-radius 100px
				background-color #d5011b
				position absolute
				bottom -4px
				left 25%
		p
			max-width 453px
			font-family 'Encode Sans Expanded', sans-serif
			font-size 18px
			font-stretch expanded
			margin 0 auto
			margin-top 36px
			color #6c6f80
.vission
	background #d5011b
	&_left
		background rgba(0,0,0,0) url('~/assets/img/bar_delicores_2.jpg') no-repeat
	&_right
		h3
			color white
			&:after
				background-color #ffffff
		p
			color #e5e5e5
.app_delivery
	z-index 1
	margin-top -116px
	>div
		display inline-block
		vertical-align middle
		width 50%
	h3
		width 398px
		height 150px
		font-size 60px
		font-stretch expanded
		color #080d2d
		margin 0 auto
		position relative
		&:before
			content ''
			width 174px
			height 5px
			border-radius 100px
			background-color #080d2d
			position absolute
			bottom -5px
			left 28%
	p
		width 453px
		font-size 20px
		font-weight 300
		font-family 'Encode Sans Expanded', sans-serif
		color #846868
		margin 0 auto
		margin-top 32px
	.download
		margin 0 auto
		margin-top 32px
		text-align center
		img
			margin 0 11px
.web_delivery
	padding 47px
	background white
	margin-top -4px
	z-index 1
	box-shadow -1px 1px 25px rgba(162, 162, 162, 0.5)
	&:after
		content ''
		position absolute
		top -150px
		right 0
		width 0
		height 0
		border-left 122em solid transparent
		border-bottom 150px solid #ffffff
	>div
		display inline-block
		vertical-align middle
		width 50%
	&_right
		img
			width 100%
	h3
		width 398px
		font-size 60px
		font-stretch expanded
		text-align center
		color #d5011b
		&:before
			content ''
			width 145px
			height 5px
			border-radius 100px
			background-color #d5011b
			position absolute
			bottom -5px
			left 0
	p
		width 100%
		font-family 'Encode Sans Expanded', sans-serif
		font-size 20px
		font-stretch expanded
		text-align left
		color #af9d9d
		margin-top 35px
	a
		width 183px
		height 49px
		border-radius 100px
		background-color #080d2d
		display block
		color white
		font-size 17px
		font-family 'Encode Sans Expanded', sans-serif
		line-height 2.68
		margin-top 35px
.brand_section
	background white
	padding 80px 0
	h3
		width 121px
		font-family 'Encode Sans Expanded', sans-serif
		font-size 30px
		font-stretch expanded
		text-align left
		color #080d2d
		margin-bottom 15px
.brand_box
	display inline-block
	vertical-align top
	width 15.5%
	margin .4% .5%
	img
		width 100%
.presentation
	background #fc0224
	background -moz-linear-gradient(top, #fc0224 42%, #e90129 66%, #e90129 66%)
	background -webkit-linear-gradient(top, #fc0224 42%,#e90129 66%,#e90129 66%)
	background linear-gradient(to bottom, #fc0224 42%,#e90129 66%,#e90129 66%)
	//- filter progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc0224', endColorstr='#e90129',GradientType=0 )
	padding 15px 0
	text-align center
	h3
		color white
		font-size 40px
		max-width 441px
		margin 0 auto
		font-family 'Encode Sans Expanded', sans-serif
	&_footer
		height 60px
		background rgba(0,0,0,0) url('~/assets/img/bg_2.png') no-repeat
		background-position center right
#section-1
	height 604px
	position relative
	.el-carousel
		height 100%
		&__container
			height 100%
		&__item
			img
				width 100%
		&__indicators
			display none
	.bg_tranparent
		width 100%
		height 132px
		background rgba(0,0,0,0) url('~/assets/img/bg_1.png')
		position absolute
		bottom 0
		background-size cover
		z-index 2

@media only screen and (max-width: 1060px)
	.about_us
		.box_center
			>div
				width 100%
				padding-top 35px
				padding-bottom 10px
				&.about_us_left
					display none
	.mission
	.vission
		margin-top 0
		>div
			width 100%
			padding 25px 0
@media only screen and (max-width: 1005px)
	.contact_section_form
		position relative
		max-width none
@media only screen and (max-width: 944px)
	#section-1
		.bg_tranparent
			display none
	.app_delivery
		margin-top 0
		padding-bottom 60px
		.app_delivery_left
			display none
		.app_delivery_right
			width 100%
	.web_delivery:after
		top -64px
		border-left 80em solid transparent
		border-bottom 70px solid #fff
@media only screen and (max-width: 870px)
	.brand_box
		width 21%
	.web_delivery
		.web_delivery_right
			display none
		.web_delivery_left
			width 100%
@media only screen and (max-width: 620px)
	.about_us
		.box_center
			>div
				h3
					&:before
						display none
	.presentation
		h3
			font-size 25px
	.presentation_footer
		height 45px
		background none
	.app_delivery
		h3
			width 100%
			height initial
			font-size 48px
		p
			width 96%
	.web_delivery
		h3
			width 100%
			&:before
				width 100%
				height 3px
		p
			text-align center
	.brand_box
		width 40%
</style>
