<template>
	<div class="home">
		<div class="row">
			<div class="col-md-3">
			<img alt="Vue logo" src="@/assets/onehealth.png" style="max-width:50%" >
		</div>
		<div class="col-md-9">
			<h1>One Health Event Based System Dashboard</h1>
		</div>
		</div>
		<Signup v-if="is_login" @signin='signin'/>
		<Login v-if="!is_login" @login='login' @register='register'/>
	</div>
</template>

<script>
// @ is an alias to /src
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Signup,Login
  },
  data(){
		return{
			is_login:false,
		}
	},
	methods:{
		signin(){
			this.is_login=false;
		},
		login(){
			console.log("Login");
			this.$router.push({name: 'About'});
		},
		register(){
			this.is_login=true;
		}
	},mounted(){
		if(localStorage.token){
			this.$router.push ({ name: 'About' })
		}
	}
}
</script>
