<template>
	<h3>User role management</h3>
	<img src="@/assets/loading.gif" width="200" v-if="is_loading"> <br/>
	<p>List of assigned roles of {{usr.name}}</p>
	<p>{{alerts}}</p>
	<p v-if="user_roles.length==0">No role assigned</p>
	<table class="table" v-if="user_roles.length>0">
		<thead>
			<th>Role name</th>
			<th>Assigned date</th>
			<th>Action</th>
		</thead>
		<tbody>
			<tr v-for="ur in user_roles" :key="ur.id">
				<td>{{ur.role_name}}</td>
				<td>{{changeformat(ur.created_at)}}</td>
				<td><i class="fas fa-times" @click="delUsrRole(ur.id)"></i></td>
			</tr>
		</tbody>
	</table>
	<p>Add new role to {{usr.name}}</p>
	<form @submit.prevent="addNewRole">
		<select @change="st_newrole($event)">
			<option value="0">Please select</option>
			<option v-for="role in roles" :key="role.id"  v-bind:value="role.id">{{role.role_name}}</option>
		</select>
		<input type="submit" class="btn btn-primary" value="add">
	</form>
</template>
<script>
import axios from 'axios';
import moment from 'moment'
export default{
	name:"UserRole",
	props:[
		"usr"
	],
	data(){
		return{
			is_loading:false,
			alerts:'',
			user_roles:[],
			roles:[],
			newRole:0
		}
	},
	mounted(){
		console.log("From the mount of Edit Role of "+this.usr.name);
		this.get_user_role();
		axios.get("http://localhost:3000/user_role",{
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
				this.roles = response.data.data;
				// console.log(response.data.data);
			}

		});

	},
	methods:{
		get_user_role(){
				axios.get("http://localhost:3000/users/"+this.usr.id,{
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
					this.user_roles = response.data.data;
					// console.log(response.data.data);
				}

			});
		},
		delUsrRole(value){
			axios.post("http://localhost:3000/users/"+this.usr.id,{
			'id':value,
			'Authorization': localStorage.token
			})
			.then((response) => {
				if(response.status==500){
					this.alerts = "response error";
				}
				else if(response.data.data == null){
					this.alerts = "Can't delete roll";
					
				}else{
					this.user_roles = this.user_roles.filter((ur)=>
						{return ur.id!==value} );
				}

			})
		},
		changeformat(value){
			return moment(String(value)).format('DD/MM/YYYY');
		},
		addNewRole(){
			if (this.newRole>0) {
			axios.post("http://localhost:3000/user_role",{
			'usrid':this.usr.id,
			'roleid':this.newRole,
			'Authorization': localStorage.token
			})
			.then((response) => {
				if(response.status==500){
					this.alerts = "response error";
				}
				else if(response.data.data == null){
					this.alerts = "Can't add roll";
					
				}else{
					console.log(response);
					this.get_user_role();
				}

			})
			}
		},
		st_newrole(event){
			this.newRole = event.target.value;
		}
	}
}
</script>
