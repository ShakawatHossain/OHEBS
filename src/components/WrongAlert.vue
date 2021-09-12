<template>
		<p>{{ alerts }}</p>
</template>
<script>
	export default{
		name:'WrongAlert',
		props:{
			alerts:String
		}
	}
</script>
<style scoped>
p{
	background:red;
	color:white;
}
</style>
