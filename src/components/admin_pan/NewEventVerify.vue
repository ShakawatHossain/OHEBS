<template>
	<h3>New event verification</h3>
	<form @submit.prevent="record_verify" enctype="multipart/form-data">
		<label>Source of information *</label> (Event verfied person/s )
		<input type="text" class="form-control" v-model="inf_src" placeholder="Person whom contact with" required>
		<label>Select mode of verification *</label>
		<select class="form-control" v-model="veri_mod" required>
			<option>Phone call</option>
			<option>Email</option>
			<option>Investigation team visit</option>
			<option>Verified locally and reported</option>
			<option>Whats'app or Messenger</option>
		</select>
		<label>Date of verification started</label>
		<input type="date" class="form-control" v-model="veri_start" required>
		<label>Date of verification end</label>
		<input type="date" class="form-control" v-model="veri_end" required>
		<label>Division *</label>
		<Skills :skills="s_div" @delSkill="delSkill" data-toggle="tooltip" class="row" data-placement="right" title="Click to delete division"/>
		<select class="form-control" @change="addSkill($event)" placeholder="Please select a division" >
			<option value="">Please select</option>
			<option v-for="d in div" :key="d.id">{{ d }}</option>
		</select>
		<label>District *</label>
		<Skills :skills="s_dis" @delSkill="deldis" data-toggle="tooltip" class="row" data-placement="right" title="Click to delete district"/>
		<select class="form-control" @change="addDis($event)">
			<option value="">Please select</option>
			<option v-for="d in dis" :key="d.id">{{ d }}</option>
		</select>
		<label>Thana/upazila *</label>
		<Skills :skills="s_upz" @delSkill="delupz" data-toggle="tooltip" class="row" data-placement="right" title="Click to delete Upazila"/>
		<select class="form-control" @change="addUpz($event)">
			<option value="">Please select</option>
			<option v-for="u in upz" :key="u.id">{{ u }}</option>
		</select>
		<label for="name">Address</label> (Event location)
		<input type="text" v-model="adds" class="form-control">
		<label>Description of the event *</label> (Brief description)
		<textarea class="form-control" v-model="ev_des" rows="6" required></textarea>
		<label>Upload file if needed</label>
		<a v-bind:href="'http://localhost:3000' + events.file_link" target="blank" v-if="events.file_link"> Prev. file</a>

		<WrongAlert :alerts="alerts"/>
		<input type="file" class="form-control" ref="file" v-on:change="handleFileUpload">
		<br/>
		<table class="table">
			<thead>
				<th>Select institution to share this event (Organization/s need/s to be informed)</th>
			</thead>
			
			<tr v-for="inst in ev_team_list" :key="inst.id">
				<td><input type="checkbox" v-model="ev_team" :value="inst.id"/> <label>{{inst.name}}</label></td>
			</tr>
			
		</table>
		
		<label>Suggestion to facilitate investigation *</label>
		<textarea class="form-control" v-model="ev_fac" rows="6" required></textarea>
		<WrongAlert :alerts="mismatch"/>
		<SuccessMsg :alerts="sm"/>
		<input type="submit" class="btn btn-primary">
	</form>
</template>
<script>
import WrongAlert from '../WrongAlert.vue';
import SuccessMsg from '../SuccessMsg.vue';
import Skills from '../Skills.vue';
import AdminLevel from '@/admin_level/data.json';
import axios from 'axios'
export default{
	name: 'NewEventVerify',
	components:{
		WrongAlert,SuccessMsg,Skills
	},
	props:[
		'events'
	],
	data(){
		return{
			AdminLevel,
			inf_src:'',
			veri_mod:'',
			veri_start:'',
			veri_end:'',
			s_div:[],
			s_dis:[],
			s_upz:[],
			adds:'',
			ev_des:'',
			file:'',
			ev_team:[],
			ev_team_list:[],
			ev_fac:'',
			div:[],
			dis:[],
			upz:[],
			alerts:'',
			mismatch:'',
			sm:''
		}
	},
	methods:{
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
		handleFileUpload(){
			this.alerts = null;
			console.log("Handle File upload!");
			this.file = this.$refs.file.files[0];
			if (!this.file.type.match("image.*|pdf") ) {
				this.alerts = "File mismatch type";
			}else if(this.file.size>=5242880){
				this.alerts = "File size beyond limit";
			}
		},
		record_verify(){
			this.msg=null;
			this.mismatch=null;
			if(this.ev_team_list.length==0){
				this.mismatch = "Please check atleast one organization to share event";
				return;
			}
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
			console.log(this.file);
			const formdata = new FormData();
			formdata.append('Authorization',localStorage.token);
			formdata.append('capture_id',this.events.id);
			formdata.append('inf_src',this.inf_src);
			formdata.append('veri_mod',this.veri_mod);
			formdata.append('veri_start',this.veri_start);
			formdata.append('veri_end',this.veri_end);
			formdata.append('ev_des',this.ev_des);
			formdata.append('ev_team',this.ev_team);
			formdata.append('ev_fac',this.ev_fac);
			formdata.append('file', this.file);
			formdata.append('s_div', this.s_div);
			formdata.append('s_dis', this.s_dis);
			formdata.append('s_upz', this.s_upz);
			formdata.append('adds', this.adds);
			formdata.append('u_id', localStorage.id);
			axios.post("http://localhost:3000/eventverify",formdata,config)
				.then((response) => {
					this.is_loading=false;
					console.log(response);
					if(response.status==200){
						console.log(response);
						this.sm = "Event Verified successfull";
					}else{
						this.mismatch = response.data.msg;
					}
				})
		}
	},
	mounted(){
		this.s_div = this.events.s_div.split(",");
		this.s_dis = this.events.s_dis.split(",");
		this.s_upz = this.events.s_upz.split(",");
		this.ev_des = this.events.ev_des;
		this.adds = this.events.adds;
		this.getAdminLevel();
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
					this.ev_team_list = response.data.data;	
				}
				
			}
		})
	}
}
</script>

