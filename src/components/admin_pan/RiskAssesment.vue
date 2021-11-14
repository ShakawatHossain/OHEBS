<template>
	<h3>Prior to event investigation</h3>
	<p>List of verified event</p>
	<WrongAlert :alerts="alerts" />
	<table class="table" v-if="verified_events.length>0">
		<thead>
			<th>Events</th>
			<th>Verify from</th>
			<th>Mode of verify</th>
			<th>Verified date</th>
			<th>Action</th>
		</thead>
		<tbody>
			<tr v-for="event in verified_events" :key="event.id">
				<td>{{event.ev_des}}</td>
				<td>{{event.inf_src}}</td>
				<td>{{event.veri_mod}}</td>
				<td>{{changeformat(event.veri_end)}}</td>
				<td v-if="event.is_priorinvestigate==0" ><button @click="initPrior(event)" >Initiate prior investigation</button></td>
				<td v-if="event.is_priorinvestigate==1"><p >Investigation started</p></td>
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
			api: "http://localhost:3000/eventprior",
			verified_events:[],
			alerts:''
		}
	},
	methods:{
		changeformat(value){
			return moment(String(value)).format('DD/MM/YYYY');
		},
		initPrior(event){
			this.$emit('initPrior',event);
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