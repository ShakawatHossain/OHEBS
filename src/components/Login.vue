<template>
	<div class="col-md-4"></div>
	<div class="col-md-4">
		<h3>Login page</h3>
		<label>Email *</label>
		<input type="email" v-model="emails" class="form-control" required />
		<label>Password *</label>
		<input type="password" v-model="pass" class="form-control" required />
		<div class="row">
			<div class="col-md-6">
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
				v-on:updated="updateDataURL($event)"
				data-toggle="tooltip"
				data-placement="right"
				title="please write the result below after Calculation"/>
			</div>
			<div class="col-md-6 col-text-center">
				<button @click="genCal" class="btn"><img src="../assets/reload.png" style="height:50px" data-toggle="tooltip" data-placement="right" title="Reload the Captcha"/></button>
			</div>
		</div>
		<input type="text" v-model="sum" class="form-control" placeholder="captcha result" data-toggle="tooltip" data-placement="right" title="Calculation result of above captcha" required />
		<WrongAlert :alerts="alerts" />
		<img src="../assets/loading.gif" width="200" v-if="is_loading"> <br/>
		<button class="btn btn-primary" @click="login">Login</button>
		<p>Don't have any account please <a @click="register">register</a></p>
		<p>Forget password? <a @click="isforget=!isforget">Click here</a></p>
		<br/>
		<div v-if="isforget" >
			<label>Email address* </label>(The email used at the time of registration)
			<input type="email" v-model="f_emails" class="form-control"/>
			<WrongAlert :alerts="fp_alerts" />
			<SuccessMsg :alerts="fp_msg" />
			<img src="../assets/loading.gif" width="200" v-if="is_forget_loading"> <br/>
			<button class="btn btn-primary" @click="fp_send_email"> submit </button>
		</div>
	</div>
</template>

<script>
import SuccessMsg from './SuccessMsg.vue';
import WrongAlert from './WrongAlert.vue';
import MyCaptcha from './MyCaptcha.vue';
import axios from 'axios'
	export default{
		name:'Login',
		props:['params'],
		components: {WrongAlert,MyCaptcha,SuccessMsg},
		data(){
			return{
				is_loading:false,
				is_forget_loading:false,
				api:'http://localhost:3000/',
				emails:'',
				pass:'',
				sum:'',
				result:0,
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
					text: "5+3=",
					textSize: 32
				},
				isforget: false,
				fp_msg:"",
				fp_alerts:"",
				f_emails:""
			}
		},
		mounted(){
			this.genCal();
		},
		methods:{
			login(){
				this.alerts='';
				if(this.emails == '' || this.pass == ''){
					this.alerts = "Email and Password required!";
					return;
				}else if (this.sum != this.result) {
					this.alerts = "Invalid Captcha!";
					return;
				}
				this.is_loading=true;
				axios.post(this.api+"login",{email:this.emails,pass:this.pass})
				.then((response) => {
					this.is_loading=false;
					if(response.data.data){
						console.log(response.data.data);
						console.log(response.data.token);
						localStorage.data = response.data.data;
						localStorage.name = response.data.data.name;
						localStorage.id = response.data.data.id;
						localStorage.token = response.data.token;
						this.$router.push ({ name: 'About' })
					}else{
						this.alerts = response.data.msg;
					}
				})
			},
			register(){
				this.$emit('register');
			},
			updateDataURL(ev){
				this.dataURL=ev;
			},
			genCal(){
				var v1 = Math.round(Math.random()*10);
				var v2 = Math.round(Math.random()*10);
				console.log("v1 "+v1+" v2 "+v2);
				this.image.text = "   "+v1+" + "+v2+" =";
				this.result = v1+v2;
			},
			fp_send_email(){
				this.is_forget_loading=true;
				this.fp_msg = "";
				this.fp_alerts = "";
				if(!this.f_emails){
					this.fp_alerts= "Please write email address above";
				}
				axios.get(this.api+"forgetpass",{params:{'email':this.f_emails}})
				.then((response)=>{
					this.is_forget_loading=false;
					console.log(response.data.data);
					if(response.data.data){
						this.fp_msg = response.data.msg;
					}else{
						this.fp_alerts = response.data.msg;
					}
				})
				.catch((err)=>{
					this.is_forget_loading=false;
					console.log(err);
					this.fp_alerts= "Internet error!";
				})
			}
		}
	}
</script>