<template>
	<h3>Influenza subtype weekly distribution</h3>
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
		</table>
		<apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
	</div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts'
export default{
	name:'SubWeek',
	components: {
      apexchart: VueApexCharts,
    },
    data() {
		return{
			series: [
				{
				name: 'Victoria',
				data: [0, 2, 1, 0, 9, 5],
				color: '#ffee38'
				}, {
				name: 'Yamagata',
				data: [6, 46, 14, 25, 74, 33],
				color: '#f5e8b0'
				}, {
				name: 'AH3',
				data: [11, 17, 15, 15, 21, 14],
				color: '#93eced'
				}
				// {
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
						horizontal: false,
						borderRadius: 10
					}
				},
				xaxis: {
					type: 'category',
					categories: ['17 week', '18 week', '19 week', '20 week',
					'21 week', '22 week']
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