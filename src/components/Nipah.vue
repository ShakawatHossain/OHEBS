<template>
	<h1>Identified infected cases and deaths from Nipah virus </h1>
	<div id="chart">
		<apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
	</div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts'
export default{
	name:'Nipah',
	components: {
      apexchart: VueApexCharts,
    },
    data() {      
		return{
			series: [{
				name: 'Identified case',
				type: 'column',
				data: [13, 0, 12, 67, 13, 0, 18, 11, 4, 18, 42, 18, 26, 38, 18, 0, 3, 4, 8, 6],
			}, {
				name: 'Death',
				type: 'line',
				data: [9, 8, 0, 50, 11, 0, 9, 9, 0, 16, 36, 13, 22, 15, 11, 0, 2, 3, 7, 4],
				color: '#ff1605'
			}],
			chartOptions: {
				chart: {
					height: 350,
					type: 'line',
				},
				stroke: {
					width: [0, 4]
				},
				title: {
					text: 'Traffic Sources'
				},
				dataLabels: {
					enabled: true,
					enabledOnSeries: [1]
				},
				labels: ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2017', '2018', '2019', '2020'],
				xaxis: {
					type: 'category'
				},
				yaxis: [{
					title: {
					text: 'Identified case',
					},
				}, {
					opposite: true,
					title: {
					text: 'Death'
					}
				}]
			}
		}
    }
}
</script>