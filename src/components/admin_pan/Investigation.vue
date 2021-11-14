<template>
	<h3>Investigation report</h3>
	<p>List of verified event</p>
	<WrongAlert :alerts="alerts" />
	<table class="table" v-if="verified_events.length>0">
		<thead>
			<th>Event title</th>
			<th>Investigation start date</th>
			<th>Origin</th>
			<th>Suspected</th>
			<th>Action</th>
		</thead>
		<tbody>
			<tr v-for="event in verified_events" :key="event.id">
				<td>{{event.title}}</td>
				<td>{{changeformat(event.inv_st_date)}}</td>
				<td>{{event.origin}}</td>
				<td>Human: {{event.hu_suspect_dis}} <br/>Animal: {{event.an_suspect_dis}}</td>
				<td v-if="event.is_investigate==0" ><button @click="initPrior(event)" >Initiate investigation</button></td>
				<td v-if="event.is_investigate==1"><p >Investigation done</p></td>
			</tr>
		</tbody>
	</table>
</template>
<script>
import WrongAlert from '../WrongAlert.vue';
import axios from 'axios'
import moment from 'moment'
export default{
	name: 'RiskAssesment',
	components:{
		WrongAlert
	},
	props:[],
	data(){
		return{
			api: "http://localhost:3000/eventinvest",
			verified_events:[],
			alerts:''
		}
	},
	methods:{
		changeformat(value){
			return moment(String(value)).format('DD/MM/YYYY');
		},
		initPrior(event){
			this.$emit('initInvest',event);
		}
	},
	mounted(){
		axios.get(this.api,{
				headers: {
					'Authorization': localStorage.token
				}
			})
			.then((response) => {
				if(response.status==500){
					this.alerts = "response error";
				}
				else if(response.data.data == null){
					this.alerts = "No List to populate";
				}else{
					this.verified_events = response.data.data;
				}

			})
	}

}
</script>