<template>
	<div class="row" v-for="skill in skills" :key="skill">
		<div class="pills" @click="delSkill(skill)" >{{ skill }}</div>
	</div>
</template>
<script>
	export default{
		name:'Skill',
		props:['skills'],
		methods:{
			delSkill(skill){
				this.$emit('delSkill',skill);
			}
		}
	}
</script>
<style>
.pills{
	display: inline-block;
	margin: 20px 10px 0xp 0px;
	padding: 6px 12px;
	background: #eee;
	border-radius: 20px;
	font-size: 12px;
	letter-spacing: 1px;
	font-weight: bold;
	color: #777;
	pointer: cursor;
}
</style>