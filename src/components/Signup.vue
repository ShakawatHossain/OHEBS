<template>
	<div class="col-sm-4"></div>
	<div class="col-sm-4">
		<h3>Registration page</h3>
		<p>Already have an account please <a @click="forcedsign">sign in</a></p>
		<label>Name *</label>
		<input type="text" v-model="name" class="form-control" required />
		<label>Email *</label>
		<input type="email" v-model="emails" class="form-control" required />
		<label>Phone Number</label>
		<input type="text" v-model="phn" class="form-control"/>
		<label>Designation</label>
		<input type="text" v-model="desg" class="form-control"/>
		<label > Select Institution</label>
		<select v-model="ins" class="form-control">
			<option value="iedcr">Institute of Epidemiology Disease Control and Research</option>
			<option value="dls">Department of Live Stock</option>
		</select>
		<label>Password *</label>
		<input type="password" v-model="pass" class="form-control" required />
		<label>Re-type Password *</label>
		<input type="password" v-model="rpass" class="form-control" required />
		<label>Working sectors</label>
		<input type="text" class="form-control" v-model="skl" @keyup.enter="addSkill">
		<Skills :skills="skls" @delSkill="delSkill"/>
		<WrongAlert :alerts="alerts" />
		<button class="btn btn-primary" @click="signin">Create Account</button>
	</div>

</template>
<script>
import WrongAlert from './WrongAlert.vue'
import Skills from './Skills.vue'
	export default{
		name:'Signup',
		components: {WrongAlert,Skills},
		data(){
			return{
				name:'',
				emails:'',
				phn:'',
				desg:'',
				ins:'',
				pass:'',
				rpass:'',
				alerts:'',
				skl:'',
				skls:[]
			}
		},
		methods:{
			signin(){
				this.alerts='';
				if(this.pass !== this.rpass || !this.rpass){
					this.alerts="Password not same";
				}else if(!this.emails){
					this.alerts="Email is mandatory";
				}else if(!this.name){
					this.alerts="Name is mandatory";
				}else{

					this.$emit('signin',{name:this.name,email:this.emails,pass:this.pass});
				}
			},
			forcedsign(){
				this.$emit('signin',{name:"John Doe",email:"doe@gmail.com",pass:"abc123"});
			},
			addSkill(){
				if(!this.skls.includes(this.skl)){
					this.skls.push(this.skl);
				}
				this.skl='';
			},
			delSkill(dskill){
				this.skls = this.skls.filter((item) => {
					return dskill!==item;
				});
			}
		}
	}
</script>

