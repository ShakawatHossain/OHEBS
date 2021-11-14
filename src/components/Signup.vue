<template>
	<div class="col-sm-4"></div>
	<div class="col-sm-4">
		<form @submit.prevent="signin">
		<h3>Registration page</h3>
		<p>Already have an account please <a @click="forcedsign">sign in</a></p>
		<label>Full name *</label>
		<input type="text" v-model="name" class="form-control" placeholder="Full Name" required />
		<label>Email ID*</label>
		<input type="email" v-model="emails" class="form-control" data-toggle="tooltip" data-placement="right" title="This email address will be used to login into system" required />
		<label>Mobile Number *</label>
		<vue-tel-input mode="international" @input="telChanged"></vue-tel-input>
		<label>Designation *</label>
		<input type="text" v-model="desg" class="form-control" required />
		<label> Select Institution *</label>
		<select v-model="ins" class="form-control">
			<option v-for="inst in ins_list" :key="inst.id" :value="inst.id">{{inst.name}}</option>
			<!-- <option value="iedcr">Institute of Epidemiology Disease Control and Research</option>
			<option value="dls">Department of Live Stock</option>
			<option value="fdb">Forest department, Bangladesh</option>
			<option value="blri">Bangladesh live Stock Research Institute</option> -->
		</select>
		<label>Password * (atleast 6 char)</label>
		<input type="password" v-model="pass" class="form-control" required />
		<label>Re-type Password *</label>
		<input type="password" v-model="rpass" class="form-control" required />
		<label>Working sectors (Press space to add multiple skills)</label>
		<input type="text" class="form-control" v-model="skl" @keyup.space="addSkill">
		<Skills :skills="skls" @delSkill="delSkill" data-toggle="tooltip" data-placement="right" title="Click to delete skills"/>
		<WrongAlert :alerts="alerts" />
		<SuccessMsg :alerts="sm" />
		<img src="../assets/loading.gif" width="200" v-if="is_loading"> <br/>
		<input type="submit" class="btn btn-primary" value="Create Account">
		</form>
	</div>
</template>
<script>
import WrongAlert from './WrongAlert.vue'
import SuccessMsg from './SuccessMsg.vue'
import Skills from './Skills.vue'

import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import axios from 'axios'
	export default{
		name:'Signup',
		components: {WrongAlert,Skills,SuccessMsg,VueTelInput},
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
				sm:'',
				skl:'',
				skls:[],
				is_loading:false,
				ins_list:[]
			}
		},
		methods:{
			telChanged(phone){
				if(typeof phone === 'string'){
					this.phn = phone;
				}
			},
			signin(){
				this.alerts="";
				this.sm="";
				if(!this.name)
					this.alerts="Name is mandatory";
				else if(!this.emails)
					this.alerts="Email is mandatory";
				else if(!this.phn)
					this.alerts="Phone number is mandatory";
				else if(!this.desg)
					this.alerts="Designation is mandatory";
				else if(!this.ins)
					this.alerts="Please select an Institution";
				else if(!this.pass || this.pass.length<6)
					this.alerts="Password must be 6 char long";
				else if(this.pass !== this.rpass || !this.rpass){
					this.alerts="Password not same";
				}else{
					this.is_loading=true;
					axios.post('http://localhost:3000/registration',{
						name:this.name,
						email:this.emails,
						mob:this.phn,
						desg:this.desg,
						ins:this.ins,
						pass:this.pass,
						skls:this.skls
					})
					.then((response) => {
						this.is_loading=false;
						console.log(response);
						if(response.status == 500){
							this.alerts="response";
						}else if(response.status == 200){
							if(!response.data.data){
								this.alerts=response.data.msg;
							}else{
								this.sm = response.data.msg;	
							}
							
						}
					})						
				}
			},
			forcedsign(){
				this.$emit('signin');
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
		},
		mounted(){
			this.is_loading=true;
			axios.get('http://localhost:3000/getins')
			.then((response) => {
				this.is_loading=false;
				console.log(response);
				if(response.status == 500){
					this.alerts="response";
				}else if(response.status == 200){
					if(!response.data.data){
						this.alerts=response.data.msg;
					}else{
						this.ins_list = response.data.data;	
					}
					
				}
			})
		}
	}
</script>

