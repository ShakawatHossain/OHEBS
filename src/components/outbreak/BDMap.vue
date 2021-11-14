<template>
	<h3>Countrywide Outbreaks</h3>
	<div class="row">
		<div class="col-md-3"><p>Filter according to year</p></div>
		<div class="col-md-9">
			<select class="form-control" v-model="year" @change="onChange">
				<option value="0">All</option>
				<option v-for="yr in year_list" :key="yr">{{yr}}</option>
				
			</select>
		</div>
	</div>
	<div id="chartdiv" ></div>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_bangladesh from "@amcharts/amcharts4-geodata/bangladeshHigh";
import axios from 'axios';
export default{
	name:'BDMap',
	data(){
		return{
			year:'',
			year_list:[],
			all_data:[],
			pdata : [{
			"id": "BD-A",
			"name": "Barisal",
			"value": 0
			// "fill": am4core.color("#ff8000")
			}, {
				"id": "BD-B",
				"name": "Chattogram",
				"value": 0
				// "fill": am4core.color("#ff6a00")
			}, {
				"id": "BD-C",
				"name": "Dhaka",
				"value": 0
				// "fill": am4core.color("#ff1100")
			}, {
				"id": "BD-D",
				"name": "Khulna",
				"value": 0
				// "fill": am4core.color("#ff8000")
			}, {
				"id": "BD-E",
				"name": "Rajshahi",
				"value": 0
				// "fill": am4core.color("#ff4400")
			}, {
				"id": "BD-F",
				"name": "Rangpur",
				"value": 0
				// "fill": am4core.color("#ffbb00")
			}, {
				"id": "BD-G",
				"name": "Shylet",
				"value": 0
				// "fill": am4core.color("#ffbb00")
			}, {
				"id": "BD-H",
				"name": "Mymensingh",
				"value": 0
				// "fill": am4core.color("#eaff00")
			}]
		}
	},
	mounted(){
		this.crt_chart(this.pdata);
		this.getEventList();
	},
	unmounted() {
		if (this.chart) {
			this.chart.dispose();
		}
	},
	methods:{
		crt_chart(ppdata){
			var chart = am4core.create("chartdiv", am4maps.MapChart);
			chart.geodata = am4geodata_bangladesh;
			chart.projection = new am4maps.projections.Projection();
			var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
			polygonSeries.useGeodata = true;
			polygonSeries.data = ppdata;
			var polygonTemplate = polygonSeries.mapPolygons.template;
			polygonTemplate.tooltipText = "{name} : {value}";
			var m = this;
			var all_data_collection = this.all_data;
			polygonTemplate.events.on("hit", function(ev) {
				console.log(ev.target.dataItem.dataContext.name);
				m.$emit('polyClicked',ev.target.dataItem.dataContext.name,all_data_collection);
				// custom_emit(ev.target.dataItem.dataContext.name);
				
			});
			var hs = polygonTemplate.states.create("hover");
			hs.properties.fill = am4core.color("#001eff");
			polygonSeries.heatRules.push({
				"property": "fill",
				"target": polygonSeries.mapPolygons.template,
				"max": am4core.color("#ff0000"),
				"min": am4core.color("#00ff1a")
			});
			let heatLegend = chart.createChild(am4maps.HeatLegend);
			heatLegend.series = polygonSeries;
			heatLegend.width = am4core.percent(100);
			polygonSeries.mapPolygons.template.events.on("over", function(ev) {
				if (!isNaN(ev.target.dataItem.value)) {
					heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
				}
				else {
					heatLegend.valueAxis.hideTooltip();
				}
			});

			polygonSeries.mapPolygons.template.events.on("out", function(ev) {
				if(!isNaN(ev.target.dataItem.value))
					heatLegend.valueAxis.hideTooltip();
			});
		},
		onChange(ev){
			console.log(ev.target.value);
			// var cpdata = [{
			// "id": "BD-A",
			// "name": "Barisal",
			// "value": 6
			// // "fill": am4core.color("#ff8000")
			// }, {
			// 	"id": "BD-B",
			// 	"name": "Chattogram",
			// 	"value": 5
			// 	// "fill": am4core.color("#ff6a00")
			// }, {
			// 	"id": "BD-C",
			// 	"name": "Dhaka",
			// 	"value": 4
			// 	// "fill": am4core.color("#ff1100")
			// }, {
			// 	"id": "BD-D",
			// 	"name": "Khulna",
			// 	"value": 3
			// 	// "fill": am4core.color("#ff8000")
			// }, {
			// 	"id": "BD-E",
			// 	"name": "Rajshahi",
			// 	"value": 2
			// 	// "fill": am4core.color("#ff4400")
			// }, {
			// 	"id": "BD-F",
			// 	"name": "Rangpur",
			// 	"value": 1
			// 	// "fill": am4core.color("#ffbb00")
			// }, {
			// 	"id": "BD-G",
			// 	"name": "Shylet",
			// 	"value": 2
			// 	// "fill": am4core.color("#ffbb00")
			// }, {
			// 	"id": "BD-H",
			// 	"name": "Mymensingh",
			// 	"value": 1
			// 	// "fill": am4core.color("#eaff00")
			// }];
			// this.crt_chart(this.pdata);
			console.log(this.pdata.value);
			this.getEventList();
		},
		getEventList(){
			axios.get("http://localhost:3000/event_list",{
				params:{year: this.year}
			})
			.then((response) => {
				if(response.data.data == null){
					this.alerts = "No List to populate";
				}else{
					this.clearValue();
					// console.log(response.data.data);
					this.all_data = response.data.data; 
					var rec_data = response.data.data;
					rec_data.forEach((rd)=>{
						
						if(!this.year_list.includes(new Date(rd.notification_date).getFullYear()))
							this.year_list.push(new Date(rd.notification_date).getFullYear());
						this.pdata.forEach((pd)=>{
							if(pd.name == rd.s_div){
								console.log("Name matched");
								pd.value++;
							}
						});
					});
					this.crt_chart(this.pdata);
				}

			});
		},
		clearValue(){
			this.pdata.forEach((pd)=>{
					pd.value=0;
			});
		}
	}
}
</script>
<style scoped>
#chartdiv{
	height:500px;
}
</style>