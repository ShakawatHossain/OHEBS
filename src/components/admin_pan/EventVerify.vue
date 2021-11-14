<template>
	<h3>Verify an event</h3>
	<WrongAlert :alerts="alerts" />
	<table class="table">
		<thead c-if="captures.length>0">
			<th>Description</th>
			<th>Uploaded file</th>
			<th>Entry date</th>
			<th>Upazila</th>
			<th>Action</th>
		</thead>
		<tbody>
			<tr v-for="cap in captures" :key="cap.id">
				<td>{{cap.ev_des}}</td>
				<td><a v-bind:href="'http://localhost:3000' + cap.file_link" target="blank" v-if="cap.file_link">File</a></td>
				<td>{{ changeformat(cap.created_at) }}</td>
				<td>{{ cap.s_upz }}</td>
				<td v-if="cap.is_verified==0"><button class="btn" @click="verify(cap)">Verify</button></td>
				<td v-if="cap.is_verified==1">Verified</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
import WrongAlert from '../WrongAlert.vue';
import axios from 'axios'
import moment from 'moment'
export default{
	name: 'EventVerify',
	components: {WrongAlert},
	data(){
		return {
			api:"http://localhost:3000/eventverify",
			captures:[],
			alerts:null,
			options:{day: 'numeric', month: 'long', year: 'numeric'}
		}
	},
	methods:{
		syncCaptures(){
			this.alerts='';
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
					this.captures = response.data.data;
				}

			})
		},
		changeformat(value){
			return moment(String(value)).format('DD/MM/YYYY');
		},
		verify(value){
			this.$emit('verify',value);
		}
	},
	mounted(){
		this.syncCaptures();
	}
}
</script>