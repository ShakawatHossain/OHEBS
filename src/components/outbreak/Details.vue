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
		<p>The divisions has been coloured according to the number of outbreak. The more outbreak occured in the district it turns more red. The less outbreak turns it to green.  </p>
	</div>
	<div v-if="ddata.name">
		<h3>Distribution of {{ddata.name}} </h3>

		<table class="table">
			<thead>
				<th>District</th>
				<th>Upazila</th>
				<th>Incident</th>
				<th>Year</th>
			</thead>
			<tbody>
				<tr v-for="d in ddata.dat" :key="d.id">
					<td>{{d.dis}}</td>
					<td>{{d.upz}}</td>
					<td>{{d.inc}}</td>
					<td>{{d.date}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default{
	name:'Details',
	props:{
		ddata:Object
	}
}
</script>