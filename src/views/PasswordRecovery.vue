<template>
	<div class="row">
		<div class="col-md-3">
		<img alt="Vue logo" src="@/assets/onehealth.png" style="max-width:50%" >
	</div>
	<div class="col-md-9">
		<h1>One Health Event Based System Dashboard</h1>
	</div>
	</div>
	<div class="col-md-4"></div>
	<div class="col-md-4">
	<h3>Welcome to password reset page!</h3>
	<p>Don't reset want to Go sign in page <a @click="forcedsign">sign in</a></p>
	<form @submit.prevent="forgetpass">
		<input type="hidden" v-model="whole">
		<label>Password * (atleast 6 char)</label>
		<input type="password" v-model="pass" class="form-control" required />
		<label>Re-type Password *</label>
		<input type="password" v-model="rpass" class="form-control" required />
		<img src="@/assets/loading.gif" width="200" v-if="is_loading"> <br/>
		<WrongAlert :alerts="alerts" />
		<SuccessMsg :alerts="msg" />
		<input type="submit" class="btn btn-primary" value="Set new password">
	</form>
	</div>
</template>
<script>
import WrongAlert from '@/components/WrongAlert.vue'
import SuccessMsg from '@/components/SuccessMsg.vue'
import axios from 'axios'
export default{
	name: 'PasswordRecovery',
	components: {WrongAlert,SuccessMsg},
	data(){
		return{
			api:'http://localhost:3000/',
			whole:"Holla",
			is_loading:false,
			pass:'',
			rpass:'',
			alerts:'',
			msg:''
		}
	},
	methods:{
		forgetpass(){
			this.alerts="";
			this.msg="";
			if(!this.pass || this.pass.length<6)
				this.alerts="Password must be 6 char long";
			else if(this.pass !== this.rpass || !this.rpass){
				this.alerts="Password not same";
			}else{
				axios.post(this.api+"forgetpass",{'tkn':this.whole,'pass':this.pass})
				.then((response)=>{
					this.is_forget_loading=false;
					console.log(response.data.data);
					if(response.data.data){
						this.msg = response.data.msg;
					}else{
						this.alerts = response.data.msg;
					}
				})
				.catch((err)=>{
					this.is_forget_loading=false;
					console.log(err);
					this.alerts= "Internet error!";
				})
			}
		},
		forcedsign(){
			this.$router.push ({ name: 'Home' })
		}
	},
	mounted(){
		this.whole = this.$route.query.q;
		console.log(this.$route.query);
	}
}
</script>