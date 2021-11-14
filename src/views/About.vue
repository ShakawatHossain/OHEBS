<template>
<div id="nav">
<router-link to="/">Logout</router-link> |
<router-link to="/dash">Public Dashboard</router-link>
</div>
<div class="row">
	<div class="col-md-3">
		<SideNav :sidenav_num="sidenav_num" @navto="navto"/>
	</div>
	<div class="col-md-9">
		<img src="../assets/loading.gif" width="200" v-if="is_loading"> <br/>
		<div v-if="nav_index==10">
			<h2 >Please upload the data file here</h2>
			<input type="file" class="form-control">
			<label for="yrs">Year</label>
			<input type="text" id="yrs" placeholder="2021" class="form-control">
			<label for="name">Data uploaded by</label>
			<input type="text" id="name" class="form-control">
			<br/>
			<button class="btn">Submit</button>
		</div>
		<div v-if="nav_index==20">
			<h2 >Please validate the data files below</h2>
			<p>please select year </p>
			<select class="form-control">
				<option selected>2021</option>
				<option>2020</option>
				<option>2019</option>
			</select>
			<table class="table">
				<thead>
					<th>no</th>
					<th>Date of upload</th>
					<th>uploaded by</th>
					<th>Data of years</th>
					<th>Action</th>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>2021-01-29</td>
						<td>Md. Touhidur Rahman</td>
						<td>2021</td>
						<td>validated</td>
					</tr>
					<tr>
						<td>1</td>
						<td>2021-02-21</td>
						<td>Md. Touhidur Rahman</td>
						<td>2021</td>
						<td>validated</td>
					</tr>
					<tr>
						<td>1</td>
						<td>2021-03-21</td>
						<td>Md. Touhidur Rahman</td>
						<td>2021</td>
						<td>validated</td>
					</tr>
					<tr>
						<td>2</td>
						<td>2021-04-17</td>
						<td>Md. Touhidur Rahman</td>
						<td>2021</td>
						<td>
							<button class="btn">Download</button>
							<button class="btn">Upload</button>
							<button class="btn">validated</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="nav_index==30">
			<h2>Give permission to visualize the data files below</h2>
			<p>please select year </p>
			<select class="form-control">
				<option selected>2021</option>
				<option>2020</option>
				<option>2019</option>
			</select>
			<table class="table">
				<thead>
					<th>no</th>
					<th>Date of upload</th>
					<th>uploaded by</th>
					<th>Data of years</th>
					<th>Last action</th>
					<th>Action</th>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>2021-01-29</td>
						<td>Md. Touhidur Rahman</td>
						<td>2021</td>
						<td>Published</td>
						<td>
							<button class="btn">Download</button>
							<button class="btn btn-danger">Blocked</button>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>2021-02-21</td>
						<td>Md. Touhidur Rahman</td>
						<td>2021</td>
						<td>Published</td>
						<td>
							<button class="btn">Download</button>
							<button class="btn btn-danger">Blocked</button>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>2021-03-21</td>
						<td>Md. Touhidur Rahman</td>
						<td>2021</td>
						<td>Pending</td>
						<td>
							<button class="btn">Download</button>
							<button class="btn btn-success">Published</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="nav_index==1">
			<EventCapture/>
		</div>
		<div v-if="nav_index==2">
			<EventVerify @verify="verify"/>
		</div>
		<div v-if="nav_index==21">
			<NewEventVerify :events="events"/>
		</div>
		<div v-if="nav_index==3">
			<RiskAssesment @initPrior="initPrior"/>
		</div>
		<div v-if="nav_index==31">
			<NewRiskAssesment :events="events"/>
		</div>
		<div v-if="nav_index==4">
			<Investigation @initInvest="initInvest"/>
		</div>
		<div v-if="nav_index==41">
			<NewInvestigation :event="events"/>
		</div>
		<div v-if="nav_index==7">
			<VisualPermission/>
		</div>
		<div v-if="nav_index==8">
			<Conclusion/>
		</div>
		<div v-if="nav_index==5">
			<Users  @editRole="editRole"/>
		</div>
		<div v-if="nav_index==51">
			<UserRole :usr="edit_role_person"/>
		</div>
	</div>
</div>
</template>
<script>
import SideNav from '@/components/SideNav.vue'
import EventCapture from '@/components/admin_pan/EventCapture.vue'
import EventVerify from '@/components/admin_pan/EventVerify.vue'
import NewEventVerify from '@/components/admin_pan/NewEventVerify.vue'
import RiskAssesment from '@/components/admin_pan/RiskAssesment.vue'
import NewRiskAssesment from '@/components/admin_pan/NewRiskAssesment.vue'
import Investigation from '@/components/admin_pan/Investigation.vue'
import NewInvestigation from '@/components/admin_pan/NewInvestigation.vue'
import Conclusion from '@/components/admin_pan/Conclusion.vue'
import Users from '@/components/users_pan/Users.vue'
import UserRole from '@/components/users_pan/UserRole.vue'
import VisualPermission from '@/components/admin_pan/VisualPermission.vue'
import axios from 'axios'
export default {
  name: 'About',
  components: {
    SideNav,
    EventCapture,
    EventVerify,
    RiskAssesment,
    NewRiskAssesment,
    Investigation,
    NewInvestigation,
    VisualPermission,
    Conclusion,
    NewEventVerify,
    Users,
    UserRole
  },
  data(){
		return{
			sidenav_num:[],
			nav_index:1,
			is_loading:false,
			events:null,
			edit_role_person:null
		}
	},
	methods:{
		navto(index){
			if(index === 0){
				localStorage.removeItem('data');
				localStorage.removeItem('token');
				localStorage.removeItem('id');
				localStorage.removeItem('name');
				this.$router.push ({ name: 'Home' })
			}
			this.nav_index=index;
		},
		authorization(obj){
			this.is_loading=true;
			axios.get('http://localhost:3000/access',{
				headers: {
					'Authorization': obj.auth
				},
				obj
			})
			.then((response) => {
				this.is_loading=false;
				if(response.status == 500){
					this.$router.push ({ name: 'Home' })
				}else if(response.status == 200){
					if(!response.data){
						console.log("No data");
						return;
					}else{
						console.log(response.data.data);
						this.sidenav_num = response.data.data;
						this.nav_index = this.sidenav_num[0];
						return;
					}
				}
			})
		},
		verify(value){
			this.events = value;
			this.nav_index=21;
		},
		editRole(value){
			console.log("About edit role clicked "+value.name);
			this.edit_role_person = value;
			this.nav_index=51;
		},
		initPrior(event){
			this.nav_index=31;
			this.events = event;
			console.log("Event prior investigation of "+event.id);
		},
		initInvest(event){
			this.nav_index=41;
			this.events = event;
			console.log("Initiate event"+event.id);
		}
	},
	mounted(){
		if(localStorage.token){
			var obj = {auth:localStorage.token,name:localStorage.name,id:localStorage.id};
			this.authorization(obj);
		}else{
			this.$router.push ({ name: 'Home' })
		}
	}
}
</script>
<style>
button{
	margin: 0px 10px;
}
</style>
