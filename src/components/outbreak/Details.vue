<template>
	<div v-if="!ddata.name">
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<p>The divisions has been coloured according to the number of outbreak. The outbreak frequency turns the division colour from green to red.  </p>
	</div>
	<div v-if="ddata.name">
		<h3>Events distribution of {{ddata.name}} division</h3>

		<table class="table">
			<thead>
				<th>District</th>
				<th>Upazila</th>
				<th>Incident</th>
				<th>Notification date</th>
			</thead>
			<tbody>
				<tr v-for="d in ddata.dat" :key="d.id">
					<td>{{d.dis}}</td>
					<td>{{d.upz}}</td>
					<td>{{d.inc}}</td>
					<td>{{changeformat(d.date)}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import moment from 'moment'
export default{
	name:'Details',
	props:{
		ddata:Object
	},
	methods:{
		changeformat(value){
			return moment(String(value)).format('DD/MM/YYYY');
		}
	}
}
</script>