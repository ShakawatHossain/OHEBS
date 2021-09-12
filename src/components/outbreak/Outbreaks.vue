<template>
	<div class="col-md-6">
		<BDMap @polyClicked="polyClicked"/>
	</div>
	<div class="col-md-6">
		<Details :ddata="{name:div_name,dat:ex_data}"/>
	</div>
</template>
<script>
import BDMap from './BDMap.vue'
import Details from './Details.vue'
export default{
	name:'Outbreaks',
	components:{
		BDMap,Details
	},
	data(){
		return{
			div_name:'',
			ex_data:[]
		}
	},
	methods:{
		polyClicked(name){
			console.log("clicked"+name);
			this.div_name = name;
			if(name==='Dhaka'){
				this.ex_data = [
				{dis:'kishoreganj',upz:'Itna',inc:'Puffer fish poisoning',date:'2021'},
				{dis:'Rajbari',upz:'Goalondo',inc:'Suspected encephalitis',date:'2021'},
				{dis:'Faridpur',upz:'Saltha',inc:'Suspected Encephalitis',date:'2020'},
				{dis:'Faridpur',upz:'Nagarkanda',inc:'Suspected Encephalitis',date:'2020'},
				{dis:'Faridpur',upz:'',inc:'Unknown deaths ',date:'2020'},
				{dis:'Gopalganj',upz:'Gopalganj Sadar',inc:'Suspected Encephalitis',date:'2020'},
				{dis:'Munshiganj',upz:'Louhajang',inc:'Unknown deaths ',date:'2020'},
				{dis:'Munshiganj',upz:'',inc:'Covid-19',date:'2020'},
				{dis:'Dhaka',upz:'Mirpur',inc:'Suspected Encephalitis',date:'2020'},
				{dis:'Dhaka',upz:'Dohar',inc:'Covid-19',date:'2020'},
				{dis:'Madaripur',upz:'',inc:'Covid-19',date:'2020'},
				{dis:'Madaripur',upz:'',inc:'Covid-19',date:'2020'},
				{dis:'Gazipur',upz:'Gazipur Sadar',inc:'Mass Psychogenic Illness',date:'2019'},
				{dis:'Narayanganj',upz:'Narayanganj Sadar',inc:'Covid-19',date:'2019'},
				{dis:'Shariatpur',upz:'Nuria',inc:'Covid-19',date:'2019'},
				{dis:'Gazipur',upz:'Gazipur Sadar',inc:'Acute Watery Diarrhoea',date:'2019'},
				{dis:'Gazipur',upz:'Gazipur Sadar',inc:'Acute Watery Diarrhoea',date:'2019'},
				{dis:'Dhaka',upz:'New Market',inc:'Measles',date:'2019'},
				{dis:'Dhaka',upz:'New Market',inc:'Acute Watery Diarrhoea',date:'2019'},
				{dis:'Dhaka',upz:'Dhaka North City Corporation',inc:'Measles',date:'2019'}
				];
			}else if(name==='Rajshahi'){
				this.ex_data = [
				{dis:'Naogaon',upz:'Patnitala',inc:'Suspected encephalitis',date:'2021'},
				{dis:'Pabna',upz:' ',inc:'Unknown deaths ',date:'2020'},
				{dis:'Bogura',upz:'',inc:'Covid-19',date:'2020'},
				{dis:'Rajshahi',upz:'',inc:'Influenza Like Illness (ILI)',date:'2019'},
				{dis:'Rajshahi',upz:'Charghat',inc:'Suspected Encephalitis',date:'2019'},
				{dis:'Rajshahi',upz:'Tanore',inc:'Unknown deaths',date:'2019'},
				{dis:'Naogaon',upz:'Dhamoirhat',inc:'Suspected Encephalitis',date:'2019'},
				{dis:'Natore',upz:'Naldanga',inc:'Suspected Encephalitis',date:'2019'}

				];
			}
		}
	}
}
</script>