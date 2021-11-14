<template>
	<h3>Event investigation of "{{event.title}}"</h3>
	<form @submit.prevent="record_invest" enctype="multipart/form-data">
	<label>Date of investigation ended</label>
	<input type="Date" class="form-control" required v-model="investigation_end">
	<h3>Index case</h3>
	<table class="table">
		<thead>
			<th>Human</th>
			<th>Animal</th>
		</thead>
		<tbody>
			<tr>
				<td>
					<label>confirmed disease / provisional diagnosis</label>
					<input type="text" class="form-control" v-model="hu_con_dis" required>
					<p><b>Hint</b> NA = not infected or related <br/> UN = under investigation <br/> UNK = unkonwn</p>
				</td>
				<td>
					<label>confirmed disease / provisional diagnosis</label>
					<input type="text" class="form-control" v-model="an_con_dis" required>
					<p><b>Hint</b> NA = not infected or related <br/> UN = under investigation <br/> UNK = unkonwn</p>
				</td>
			</tr>
			<tr>
				<td>
					<label>Number of confirmed cases</label>
					<input type="number" class="form-control" v-model="hu_sus_case">
				</td>
				<td>
					<label>Number of confirmed cases</label>
					<input type="number" class="form-control" v-model="an_sus_case" required>
				</td>
			</tr>
			<tr>
				<td>
					<label>Number of lab confirmed cases</label>
					<input type="number" class="form-control" v-model="hu_lab_case" required>
				</td>
				<td>
					<label>Number of lab confirmed cases</label>
					<input type="number" class="form-control" v-model="an_lab_case" required>
				</td>
			</tr>
			<tr>
				<td>
					<label>Number of mortality</label>
					<input type="number" class="form-control" v-model="hu_mortal" required>
				</td>
				<td>
					<label>Number of mortality</label>
					<input type="number" class="form-control" v-model="an_mortal" required>
				</td>
			</tr>
			<tr>
				<td>
					<label>Source of infection</label>
					<input type="text" class="form-control" v-model="hu_src_infec" required>
					<p><b>Hint</b> NA = not infected or related <br/> UN = under investigation <br/> UNK = unkonwn</p>
				</td>
				<td>
					<label>Source of infection *</label>
					<input type="text" class="form-control" v-model="an_src_infec" required>
					<p><b>Hint</b> NA = not infected or related <br/> UN = under investigation <br/> UNK = unkonwn</p>
				</td>
			</tr>
		</tbody>
	</table>
	<table class="table">
		<thead>
			<th>Event response institute *</th>
		</thead>
		
		<tr v-for="inst in inst_list" :key="inst.id">
			<td><input type="checkbox" v-model="res_ins" :value="inst.id"/> <label>{{inst.name}}</label></td>
		</tr>
		
	</table>
	<label>Event details </label>
	<textarea class="form-control"  rows="6" v-model="evt_details" required></textarea>
	<label>Upload file</label>(.pdf format only with max size 5MB)
	<WrongAlert :alerts="file_alerts"/>
	<input type="file" class="form-control" ref="file" v-on:change="handleFileUpload">
	<label>Findings </label> (High risk group)
	<table class="table">
		<tbody>
			<tr>
				<td>Age group</td>
				<td><input type="text" class="form-control" v-model="risk_age_grp" required></td>
			</tr>
			<tr>
				<td>Gender</td>
				<td><input type="text" class="form-control" v-model="risk_gender" required></td>
			</tr>
			<tr>
				<td>Behavior</td>
				<td><input type="text" class="form-control" v-model="risk_behav"  required></td>
			</tr>
			<tr>
				<td>Others (optional)</td> 
				<td><input type="text" class="form-control" v-model="risk_oth"></td>
			</tr>
		</tbody>
	</table>
	<label>Intervention *</label> (Short term measures)
	<textarea class="form-control"  rows="6" v-model="short_inter" required></textarea>
	<label>Intervention *</label> (Long term measures)
	<textarea class="form-control"  rows="6" v-model="long_inter" required></textarea>
	<label>Outcome *</label> 
	<textarea class="form-control"  rows="6" v-model="outcome" required></textarea>
	<label>Recommendation *</label> 
	<textarea class="form-control"  rows="6" v-model="recommendation" required></textarea>
	<label>Limitation *</label> 
	<textarea class="form-control"  rows="6" v-model="limitation" required></textarea>
	<WrongAlert :alerts="alerts"/>
	<SuccessMsg :alerts="sm"/>
	<img src="@/assets/loading.gif" width="200" v-if="is_loading"> <br/>
	<input type="submit" class="btn btn-primary">
	</form>
</template>
<script>
import WrongAlert from '../WrongAlert.vue'
import SuccessMsg from '../SuccessMsg.vue'
import axios from 'axios'
export default{
	name: 'NewInvestigation',
	props:[
		'event'
	],
	components:{
		WrongAlert,SuccessMsg
	},
	data(){
		return{
			is_loading:false,
			api:"http://localhost:3000/eventinvest",
			investigation_end:"",
			hu_con_dis:"",
			hu_sus_case:0,
			hu_lab_case:0,
			hu_mortal:0,
			hu_src_infec:"",
			an_con_dis:"",
			an_sus_case:0,
			an_lab_case:0,
			an_mortal:0,
			an_src_infec:"",
			res_ins:[],
			evt_details:"",
			evt_file:"",
			risk_age_grp:"",
			risk_gender:"",
			risk_behav:"",
			risk_oth:"",
			short_inter:"",
			long_inter:"",
			outcome:"",
			recommendation:"",
			limitation:"",
			sm:"",
			alerts:"",
			file_alerts:"",
			file:'',
			inst_list:''
		}
	},
	methods:{
		record_invest(){
			this.is_loading=true;
			this.sm=null;
			this.alerts=null;
			if(this.file_alerts){
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
			formdata.append('Authorization', localStorage.token);
			formdata.append('prior_id', this.event.id);
			formdata.append('investigation_end', this.investigation_end);
			formdata.append('hu_con_dis', this.hu_con_dis);
			formdata.append('hu_sus_case', this.hu_sus_case);
			formdata.append('hu_lab_case', this.hu_lab_case);
			formdata.append('hu_mortal', this.hu_mortal);
			formdata.append('hu_src_infec', this.hu_src_infec);
			formdata.append('an_con_dis', this.an_con_dis);
			formdata.append('an_sus_case', this.an_sus_case);
			formdata.append('an_lab_case', this.an_lab_case);
			formdata.append('an_mortal', this.an_mortal);
			formdata.append('an_src_infec', this.an_src_infec);
			formdata.append('res_ins', this.res_ins);
			formdata.append('evt_details', this.evt_details);
			formdata.append('file', this.file);
			formdata.append('risk_age_grp', this.risk_age_grp);
			formdata.append('risk_gender', this.risk_gender);
			formdata.append('risk_behav', this.risk_behav);
			formdata.append('risk_oth', this.risk_oth);
			formdata.append('short_inter', this.short_inter);
			formdata.append('long_inter', this.long_inter);
			formdata.append('outcome', this.outcome);
			formdata.append('recommendation', this.recommendation);
			formdata.append('limitation', this.limitation);
			formdata.append('u_id', localStorage.id);
			axios.post(this.api,formdata,config)
				.then((response) => {
					this.is_loading=false;
					console.log(response);
					if(response.status==200){
						if (response.data.data) {
							this.sm = "Event captured successfull";
						}
						else{
							this.alerts = "Event can't captured";	
						}
					}
				})
		},
		handleFileUpload(){
			this.file_alerts = null;
			console.log("Handle File upload!");
			this.file = this.$refs.file.files[0];
			if (!this.file.type.match("image.*|pdf") ) {
				this.file_alerts = "File mismatch type";
			}else if(this.file.size>=5242880){
				this.file_alerts = "File size beyond limit";
			}
		}
	},
	mounted(){

		this.hu_con_dis = this.event.hu_suspect_dis;
		this.hu_sus_case = this.event.hu_suspect_case;
		this.hu_lab_case = this.event.hu_lab_confm_case;
		this.hu_mortal = this.event.hu_death;
		this.hu_src_infec = this.event.hu_infec_src;
		this.an_con_dis = this.event.an_suspect_dis;
		this.an_sus_case = this.event.an_suspect_case;
		this.an_lab_case = this.event.an_lab_confm_case;
		this.an_mortal = this.event.an_death;
		this.an_src_infec = this.event.an_infec_src;
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
					this.inst_list = response.data.data;	
				}
				
			}
		})
	}
}
</script>