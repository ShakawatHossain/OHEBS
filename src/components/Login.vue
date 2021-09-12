<template>
	<div class="col-md-4"></div>
	<div class="col-md-4">
		<h3>Login page updated</h3>
		<label>Email *</label>
		<input type="email" v-model="emails" class="form-control" required />
		<label>Password *</label>
		<input type="password" v-model="pass" class="form-control" required />
		<MyCaptcha
			:height="parseInt(image.size.height)"
			:width="parseInt(image.size.width)"
			:foregroundColor="image.color.foreground"
			:backgroundColor="image.color.background"
			:text="image.text"
			:size="parseInt(image.textSize)"
			:font="image.font"
			:baseline="image.baseline"
			:angle="parseInt(image.angle)"
			:isTransparent="image.isTransparent"
			:blur="image.filter.blur"
			:contrast="image.filter.contrast"
			:grayscale="image.filter.grayscale"
			:hueRotate="image.filter.hueRotate"
			v-on:updated="updateDataURL($event)"/>
		<input type="text" v-model="sum" class="form-control" placeholder="captcha result" required />
		<WrongAlert :alerts="alerts" />
		<button class="btn btn-primary" @click="login">Login</button>
		<p>Don't have any account please <a @click="register">register</a></p>
		<p>Forget password? <a @click="register">Click here</a></p>
	</div>
</template>

<script>
import WrongAlert from './WrongAlert.vue';
import MyCaptcha from './MyCaptcha.vue';

	export default{
		name:'Login',
		props:['params'],
		components: {WrongAlert,MyCaptcha},
		data(){
			return{
				emails:'',
				pass:'',
				sum:'',
				alerts:'',
				dataURL: '',
				image: {
					angle: 0,
					baseline: 'middle',
					color: {
						foreground: '#000000',
						background: '#ffffff'
					},
					filter: {
						blur: 0,
						contrast: 100,
						grayscale: 0,
						hueRotate: 0
					},
					font: 'sans-serif',
					isTransparent: false,
					size: {
						height: 80,
						width: 150
					},
					text: '5+3',
					textSize: 64
				}
			}
		},
		methods:{
			login(){
				this.alerts='';
				if(this.emails === this.params.email && this.pass === this.params.pass){
					console.log(this.sum);						
					if (this.sum==8) {
						this.$emit('login');
						console.log("emit Login");	
					}else{
						this.alerts = "Invalid Captcha!";
					}
				}else{
					this.alerts = "Email or password mismatch!";
				}
			},
			register(){
				this.$emit('register');
			},
			updateDataURL(ev){
				this.dataURL=ev;
			}
		}
	}
</script>