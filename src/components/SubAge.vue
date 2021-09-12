<template>
	<h3>Influenza subtype age distribution</h3>
	<div id="chart">
		<table class="table">
			<tr>
				<td>Select year</td>
				<td>
					<select class="form-control">
						<option>2021</option>
						<option>2020</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>Select subtypes</td>
				<td>
					<select class="form-control">
						<option>All</option>
						<option>Victoria</option>
						<option>Yamagata</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>Select age group</td>
				<td>
					<select class="form-control">
						<option>All</option>
						<option>Less than 1</option>
						<option>1 to &lt;5</option>
						<option>5 to &lt;15</option>
						<option>15 to &lt;25</option>
						<option>25 to &lt;40</option>
						<option>40 to &lt;60</option> 
						<option>More than 60</option>
					</select>
				</td>
			</tr>
		</table>
		<apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
	</div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts'
export default{
	name:'SubAge',
	components: {
      apexchart: VueApexCharts,
    },
    data() {
		return{
			series: [
				{
				name: 'Victoria',
				data: [3,	4,	6,	3,	0,	0,	1],
				color: '#ffee38'
				}, {
				name: 'Yamagata',
				data: [25,	23,	34,	29,	29,	36,	22],
				color: '#f5e8b0'
				
				}
				// {
				// name: 'PRODUCT C',
				// data: [11, 17, 15, 15, 21, 14]
				// }, {
				// name: 'PRODUCT D',
				// data: [21, 7, 25, 13, 22, 8]}
			],
			chartOptions: {
				chart: {
					type: 'bar',
					height: 350,
					stacked: true,
					toolbar: {
						show: true
					},
					zoom: {
						enabled: true
					}
				},
				responsive: [{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0
						}
					}
				}],
				plotOptions: {
					bar: {
						horizontal: true,
						borderRadius: 10
					}
				},
				xaxis: {
					type: 'category',
					categories: ['<1', '<5', '<15', '<25',
					'<40', '<60', '>60']
				},
				legend: {
					position: 'right',
					offsetY: 40
				},
				fill: {
					opacity: 1
				}
			}
		}
    }
}
</script>