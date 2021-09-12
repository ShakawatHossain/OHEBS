<template>
  <div class="home">
    <Signup v-if="!is_login && !name" @signin='signin'/>
    <Login v-if="!is_login && name" :params="{email:email,pass:pass}" @login='login'
    @register='register'/>
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
			name:'',
			email:'',
			pass:''
		}
	},
	methods:{
		signin(params){
			this.name = params.name;
			this.email = params.email;
			this.pass = params.pass;
		},
		login(){
			console.log("Login");
			this.$router.push({name: 'About'});
		},
		register(){
			this.name = '';
			this.email = '';
			this.pass = '';
		}
	}
}
</script>
