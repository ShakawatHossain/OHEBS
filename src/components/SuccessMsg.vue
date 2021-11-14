<template>
		<p>{{ alerts }}</p>
</template>
<script>
	export default{
		name:'SuccessMsg',
		props:{
			alerts:String
		}
	}
</script>
<style scoped>
p{
	background:green;
	color:white;
	text-align:center;
}
</style>
