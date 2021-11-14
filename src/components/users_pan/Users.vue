<template>
	<h3>List of users</h3>
	<table class="table" v-if="users.length>0">
		<thead>
			<th>Name</th>
			<th>Contact no</th>
			<th>Email</th>
			<th>Affiliation</th>
			<th>Sectors</th>
			<th>Registration Date</th>
			<th>Action</th>
		</thead>
		<tbody>
			<tr v-for="usr in users" :key="usr.id" @click="usredit(usr)">
				<td>{{usr.name}}</td>
				<td>{{usr.mob}}</td>
				<td>{{usr.email}}</td>
				<td>{{usr.designation}} ,{{usr.ins_name}}</td>
				<td>{{usr.sectors}}</td>
				<td>{{ changeformat(usr.created_at) }}</td>
				
				<td v-if="usr.is_approved===1"><button @click="alterUser(0,usr.id)" class="btn btn-danger">Block user</button></td>
				<td v-if="usr.is_approved===0"><button @click="alterUser(1,usr.id)" class="btn btn-success">Approve user</button>  </td>
			</tr>
		</tbody>
	</table>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default{
	name: 'Users',
	props:[],
	components:{

	},
	data(){
		return{
			api: "http://localhost:3000/users",
			users:[]
		}
	},
	methods:{
		changeformat(value){
			return moment(String(value)).format('DD/MM/YYYY');
		},
		getUsers(){
			axios.get(this.api,{
				headers: {
					'Authorization': localStorage.token
				},
				body:{
					'ins_id' :localStorage.data.institute
				}
			})
			.then((response) => {
				if(response.status==500){
					this.alerts = "response error";
				}else if(response.data.data == null){
					this.alerts = "No List to populate";
				}else{
					this.users = response.data.data;
				}
			})
		},
		alterUser(action,usrid){
			axios.post(this.api,{
				action:action,
				usrid:usrid,
				user_id:localStorage.token
			})
			.then((response) => {
				if(response.status==500){
					this.alerts = "response error";
				}
				else if(response.status==200){
					this.users.forEach((usr) =>{
						if(usr.id == usrid)
							usr.is_approved = action;
					});
				}

			})
		},
		usredit(usr){
			this.$emit("editRole",usr);
		}
	},
	mounted(){
		this.getUsers();
	}
}
</script>