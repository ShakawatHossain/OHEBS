<template>
	<form @submit.prevent="record_capture" enctype="multipart/form-data">
	<h2 >Record an event</h2>
	<label>Contact person name and designation *</label> (Details of contact person)
	<input type="text" v-model="c_name" class="form-control" data-toggle="tooltip" data-placement="right" title="Details of contact person Ex: CS Madaripur" placeholder="CS Madaripur, Dr. XYZ"  required>
	<label>Contact person mobile no *</label>
	<vue-tel-input mode="international" @input="telChanged"></vue-tel-input>

	<br/>
	<label>Description of the event *</label>
	<textarea class="form-control" v-model="ev_des" rows="6" placeholder="Brief description" required></textarea>
	<label>Upload file if needed</label>
	<WrongAlert :alerts="alerts"/>
	<input type="file" class="form-control" ref="file" v-on:change="handleFileUpload">
	<label>Select Division *</label>
	<Skills :skills="s_div" @delSkill="delSkill" data-toggle="tooltip" class="row" data-placement="right" title="Click to delete division"/>
	<select class="form-control" @change="addSkill($event)" placeholder="Please select a division" required>
		<option value="">Please select</option>
		<option v-for="d in div" :key="d.id">{{ d }}</option>
	</select>
	<label>Select District *</label>
	<Skills :skills="s_dis" @delSkill="deldis" data-toggle="tooltip" class="row" data-placement="right" title="Click to delete district"/>
	<select class="form-control" @change="addDis($event)" required>
		<option value="">Please select</option>
		<option v-for="d in dis" :key="d.id">{{ d }}</option>
	</select>
	<label>Select Thana/upazila *</label>
	<Skills :skills="s_upz" @delSkill="delupz" data-toggle="tooltip" class="row" data-placement="right" title="Click to delete Upazila"/>
	<select class="form-control" @change="addUpz($event)" required>
		<option value="">Please select</option>
		<option v-for="u in upz" :key="u.id">{{ u }}</option>
	</select>
	<label for="name">Address</label> (Event location)
	<input type="text" v-model="adds" class="form-control" placeholder="Name of the area or where to investigate">
	<label for="name">Data uploaded by *</label>
	<input type="text" v-model="u_name" class="form-control" placeholder="Name of the event captured person recorded into system" required>
	<br/>
	<SuccessMsg :alerts="sm"/>
	<input type="submit" value="submit" class="btn btn-primary">
	</form>
</template>
<script>
import Skills from '../Skills.vue'
import WrongAlert from '../WrongAlert.vue'
import SuccessMsg from '../SuccessMsg.vue'
import AdminLevel from '@/admin_level/data.json'
import axios from 'axios'

import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
export default{
	components:{
		Skills,WrongAlert,SuccessMsg,VueTelInput
    },
    data() {
		return {
			is_loading:false,
			api:'http://localhost:3000/event_capture',
			c_name:'',
			c_num:'',
			ev_des:'',
			alerts:null,
			sm:null,
			s_div:[],
			s_dis:[],
			s_upz:[],
			adds:'',
			u_name:'',
			AdminLevel,
			div:[],
			dis:[],
			upz:[],
			file:''
		}
    },
    methods:{
		telChanged(phone){
			if(typeof phone === 'string'){
				this.c_num = phone;
			}
		},
		addSkill(event){		//Division add
			if (!event.target.value) {
				return
			}
			if(!this.s_div.includes(event.target.value)){
				this.s_div.push(event.target.value);
			}
			var adss = this.AdminLevel.Sheet1;
			adss.forEach((ads) =>{
				if(ads.div == event.target.value){
					if(!this.dis.includes(ads.district)){
						this.dis.push(ads.district);
					}
				}
			});

		},
		delSkill(dskill){		//Division delete
			this.s_div = this.s_div.filter((item) => {
				return dskill!==item;
			});
			var adss = this.AdminLevel.Sheet1;
			adss.forEach((ads) =>{
				if(ads.div == dskill){
					this.dis = this.dis.filter((item)=>{
						return ads.district!==item;
					});
					this.s_dis = this.s_dis.filter((item)=>{
						return ads.district!==item;
					});
					this.s_upz = this.s_upz.filter((item)=>{
						return ads.upz_name!==item;
					});
				}
			});
		},
		addDis(event){			//District add
			if (!event.target.value) {
				return
			}
			if(!this.s_dis.includes(event.target.value)){
				this.s_dis.push(event.target.value);
			}
			var adss = this.AdminLevel.Sheet1;
			adss.forEach((ads) =>{
				if(ads.district == event.target.value){
					if(!this.upz.includes(ads.upz_name)){
						this.upz.push(ads.upz_name);
					}
				}
			});
		},
		deldis(dskill){			//District delete
			this.s_dis = this.s_dis.filter((item) => {
				return dskill!==item;
			});
			var adss = this.AdminLevel.Sheet1;
			adss.forEach((ads) =>{
				if(ads.district == dskill){
					this.upz = this.upz.filter((item)=>{
						return ads.upz_name!==item;
					});
					this.s_upz = this.s_upz.filter((item)=>{
						return ads.upz_name!==item;
					});
				}
			});
		},
		addUpz(event){			//Upazila add
			if (!event.target.value) {
				return
			}
			if(!this.s_upz.includes(event.target.value)){
				this.s_upz.push(event.target.value);
			}
		},
		delupz(dskill){			//Upazila delete
			this.s_upz = this.s_upz.filter((item) => {
				return dskill!==item;
			});
		},
		getAdminLevel(){
			// console.log(this.AdminLevel.Sheet1);
			var adss = this.AdminLevel.Sheet1;
			adss.forEach((ads) =>{
				if(!this.div.includes(ads.div)){
					this.div.push(ads.div);
				}
			});
		},
		record_capture(){
			this.sm=null;
			if(this.alerts){
				console.log("File Error");
				return;
			}
			let config = {
					header : {
					'Content-Type' : 'multipart/form-data',
					'Authorization': localStorage.token
					}
				};
			this.is_loading = true;
			const formdata = new FormData();
			formdata.append('c_name', this.c_name);
			formdata.append('c_num', this.c_num);
			formdata.append('ev_des', this.ev_des);
			formdata.append('file', this.file);
			formdata.append('s_div', this.s_div);
			formdata.append('s_dis', this.s_dis);
			formdata.append('s_upz', this.s_upz);
			formdata.append('adds', this.adds);
			formdata.append('u_name', this.u_name);
			formdata.append('u_id', localStorage.id);
			axios.post(this.api,formdata,config)
				.then((response) => {
					this.is_loading=false;
					console.log(response);
					if(response.status==200){
						this.sm = "Event captured successfull";
					}
				})
		},
		handleFileUpload(){
			this.alerts = null;
			console.log("Handle File upload!");
			this.file = this.$refs.file.files[0];
			if (!this.file.type.match("image.*|pdf") ) {
				this.alerts = "File mismatch type";
			}else if(this.file.size>=5242880){
				this.alerts = "File size beyond limit";
			}
		}
    },
    mounted(){
		this.getAdminLevel();
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>