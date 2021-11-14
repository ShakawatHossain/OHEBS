<template>
	<h3>Lists of events</h3>
	<img src="@/assets/loading.gif" width="200" v-if="is_loading"> <br/>
	<WrongAlert :alerts="alerts"/>
	<table v-if="events.length>0" class="table">
		<thead>
			<th>Event title</th>
			<th>Investigation start</th>
			<th>Investigation end</th>
			<th>Event location</th>
			<th>Conduct organization</th>
			<th>Action</th>
		</thead>
		<tbody>
			<tr v-for="event in events" :key="event.pri_id">
				<td>{{event.title}}</td>
				<td>{{changeformat(event.inv_st_date)}}</td>
				<td>{{changeformat(event.investigation_end)}}</td>
				<td>{{event.adds}}</td>
				<td>{{getInsList(event.res_ins)}}</td>
				<td>
					<button v-if="event.is_visualized==0" class="btn btn-success" @click="altervisual(1,event)">visual publicly</button>
					<button v-if="event.is_visualized==1" class="btn btn-danger" @click="altervisual(0,event)">block publicly</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>

import axios from 'axios';
import moment from 'moment';
import WrongAlert from '../WrongAlert.vue';
export default{
	name: "VisualPermission",
	components:{
		WrongAlert
	},
	data(){
		return{
			is_loading:false,
			events:[],
			alerts:'',
			ins_list:[]
		}

	},
	methods:{
		changeformat(value){
			return moment(String(value)).format('DD/MM/YYYY');
		},
		altervisual(value,event){
			this.is_loading=true;
			axios.post("http://localhost:3000/visualpermission",{
				Authorization:localStorage.token,
				visual:value,
				pri_id:event.pri_id
			})
			.then((response) => {
				this.is_loading=false;
				if(response.data.data == null){
					this.alerts = response.data.msg;
					
				}else{
					event.is_visualized=value;
				}

			});
			
		},
		getInsList(values){
			var v_arr = values.split(",");
			var result = "";
			v_arr.forEach((v_element)=>{
				this.ins_list.forEach((ins) => {
					console.log("v_element "+v_element+" ins "+ins);
					if(Number(v_element) === Number(ins.id)){
						result += ins.name+",";
					}
				})
			});
			return result.substring(0, result.length - 1);
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
					axios.get("http://localhost:3000/visualpermission",{
						headers: {
							'Authorization': localStorage.token
						}
					})
					.then((response) => {
						this.is_loading=false;
						if(response.data.data == null){
							this.alerts = "No List to populate";
							
						}else{
							this.events = response.data.data;
							// console.log(response.data.data);
						}
					});
				}
			}
		});
	}
}
</script>