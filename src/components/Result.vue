<template>
	<h1>{{speed}}</h1>
</template>
<script >
	export default{
		name:'Result',
		props:{
			time_elapse:Number
		},
		data(){
			return{
				speed:null
			}
		},
		mounted(){
			if(this.time_elapse<300){
				this.speed="Superv";
			}else if(this.time_elapse<500){
				this.speed="Moderate";
			}else {
				this.speed="you miss :O";
			}
		}
	}
</script>