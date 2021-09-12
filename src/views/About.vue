<template>
<div class="row">
	<div class="col-md-4">
		<SideNav :sidenav_num="sidenav_num" @navto="navto"/>
	</div>
	<div class="col-md-8">
		<div v-if="nav_index==1">
			<h2 >Please upload the data file here</h2>
			<input type="file" class="form-control">
			<label for="yrs">Year</label>
			<input type="text" id="yrs" placeholder="2021" class="form-control">
			<label for="name">Data uploaded by</label>
			<input type="text" id="name" class="form-control">
			<br/>
			<button class="btn">Submit</button>
		</div>
		<div v-if="nav_index==2">
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
		<div v-if="nav_index==3">
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
		<div v-if="nav_index==4">
			<EventCapture/>
		</div>
		<div v-if="nav_index==5">
			<EventVerify/>
		</div>
		<div v-if="nav_index==6">
			<RiskAssesment/>
		</div>
		<div v-if="nav_index==7">
			<Investigation/>
		</div>
		<div v-if="nav_index==8">
			<Conclusion/>
		</div>
	</div>
</div>
</template>
<script>
import SideNav from '@/components/SideNav.vue'
import EventCapture from '@/components/admin_pan/EventCapture.vue'
import EventVerify from '@/components/admin_pan/EventVerify.vue'
import RiskAssesment from '@/components/admin_pan/RiskAssesment.vue'
import Investigation from '@/components/admin_pan/Investigation.vue'
import Conclusion from '@/components/admin_pan/Conclusion.vue'
export default {
  name: 'About',
  components: {
    SideNav,
    EventCapture,
    EventVerify,
    RiskAssesment,
    Investigation,
    Conclusion
  },
  data(){
		return{
			sidenav_num:1,
			nav_index:1
		}
	},
	methods:{
		navto(index){
			this.nav_index=index;
			this.sidenav_num=index;
		}
	}
}
</script>
<style>
button{
	margin: 0px 10px;
}
</style>
