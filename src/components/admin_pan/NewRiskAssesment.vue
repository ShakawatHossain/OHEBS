<template>
	<h3>Initiate prior investigation</h3>
	<label>Event details</label>
	<p>{{events.ev_des}}</p>
	<form @submit.prevent="record_prior">
		<label>Outbreak title </label> (time, place and person)
		<input type="text" class="form-control" v-model="title" placeholder="Please follow time place person rule to initiate name">
		<label>Outbreak origin</label>
		<select class="form-control" v-model="origin">
			<option>Human</option>
			<option>Animal</option>
			<option>Wildlife</option>
		</select>
		<label>Date of outbreak notification</label>
		<input type="date" class="form-control" v-model="notification_date">
		<label>Date of investigation started</label>
		<input type="date" class="form-control" v-model="inv_st_date">
		<h3>Index case</h3>
		<table class="table">
			<thead>
				<th>Human</th>
				<th>Animal</th>
			</thead>
			<tbody>
				<tr>
					<td>
						<label>Suspected disease / provisional diagnosis</label>
						<input type="text" class="form-control" v-model="hu_suspect_dis">
						<p><b>Hint</b> NA = not infected or related <br/> UN = under investigation <br/> UNK = unkonwn</p>
					</td>
					<td>
						<label>Suspected disease / provisional diagnosis</label>
						<input type="text" class="form-control" v-model="an_suspect_dis">
						<p><b>Hint</b> NA = not infected or related <br/> UN = under investigation <br/> UNK = unkonwn</p>
					</td>
				</tr>
				<tr>
					<td>
						<label>Number of suspected cases</label>
						<input type="number" class="form-control" v-model="hu_suspect_case">
					</td>
					<td>
						<label>Number of suspected cases</label>
						<input type="number" class="form-control" v-model="an_suspect_case">
					</td>
				</tr>
				<tr>
					<td>
						<label>Number of lab confirmed cases</label>
						<input type="number" class="form-control" v-model="hu_lab_confm_case">
					</td>
					<td>
						<label>Number of lab confirmed cases</label>
						<input type="number" class="form-control" v-model="an_lab_confm_case">
					</td>
				</tr>
				<tr>
					<td>
						<label>Number of death cases</label>
						<input type="number" class="form-control" v-model="hu_death">
					</td>
					<td>
						<label>Number of death cases</label>
						<input type="number" class="form-control" v-model="an_death">
					</td>
				</tr>
				<tr>
					<td>
						<label>Source of infection</label>
						<input type="text" class="form-control" v-model="hu_infec_src">
						<p><b>Hint</b> NA = not infected or related <br/> UN = under investigation <br/> UNK = unkonwn</p>
					</td>
					<td>
						<label>Source of infection</label> 
						<input type="text" class="form-control" v-model="an_infec_src">
						<p><b>Hint</b> NA = not infected or related <br/> UN = under investigation <br/> UNK = unkonwn</p>
					</td>
				</tr>
			</tbody>
		</table>
		<img src="@/assets/loading.gif" width="200" v-if="is_loading"> <br/>
		<SuccessMsg :alerts="msg"/>
		<WrongAlert :alerts="alerts"/>
		<input type="submit" class="btn btn-primary">
	</form>
</template>
<script>
import WrongAlert from '../WrongAlert.vue';
import SuccessMsg from '../SuccessMsg.vue';
import axios from 'axios';
export default{
	name: 'NewRiskAssesment',
	components:{
		WrongAlert,SuccessMsg
	},
	props:[
		'events'
	],
	data(){
		return{
			api:'http://localhost:3000/eventprior',
			alerts:'',
			msg:'',
			tile:'',
			origin:'',
			notification_date:'',
			inv_st_date:'',
			hu_suspect_dis:'',
			hu_suspect_case:0,
			hu_lab_confm_case:0,
			hu_death:0,
			hu_infec_src:'',
			an_suspect_dis:'',
			an_suspect_case:0,
			an_lab_confm_case:0,
			an_death:0,
			an_infec_src:''
		}
	},
	methods:{
		record_prior(){
			this.alerts = "";
			this.msg = "";
			let config = {
					header : {
					'Content-Type' : 'multipart/form-data',
					'Authorization': localStorage.token
					}
				};
			axios.post(this.api,{
				verified_id: this.events.id,
				title: this.title,
				origin: this.origin,
				notification_date: this.notification_date,
				inv_st_date: this.inv_st_date,
				hu_suspect_dis: this.hu_suspect_dis,
				hu_suspect_case: this.hu_suspect_case,
				hu_lab_confm_case: this.hu_lab_confm_case,
				hu_death: this.hu_death,
				hu_infec_src: this.hu_infec_src,
				an_suspect_dis: this.an_suspect_dis,
				an_suspect_case: this.an_suspect_case,
				an_lab_confm_case: this.an_lab_confm_case,
				an_death: this.an_death,
				an_infec_src: this.an_infec_src,
				Authorization: localStorage.token
			},config)
				.then((response) => {
					this.is_loading=false;
					console.log(response.data.msg);
					if(response.data.data){
						console.log(response.data.msg);
						this.msg = "Event Verified successfull";
					}else {
						this.alerts = response.data.msg;
					}
				});
		}
	}
}
</script>