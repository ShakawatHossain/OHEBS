<template>
	<div class="myblock" @click="stopGame" v-if="isVisible">
		<p>Click Me</p>
	</div>
</template>
<script>
export default {
  name: 'Block',
  props: ['timers'],
  data() {
    return {
      isVisible: false,
      time_elapse:0,
      interval_ref:null
    }
  },
  methods:{
	stopGame(){
		this.$emit('stopGame',this.time_elapse);
		clearInterval(this.interval_ref);
	}
  },
  mounted(){
	setTimeout(() =>{
		this.isVisible=true;
		this.interval_ref = setInterval(()=>{this.time_elapse+=10;},10);
	},this.timers);
  }
}
	
</script>
<style>
	.myblock{
		width: 200px;
		height:200px;
		background: #a1e85f;
		color: #ffffff;
		text-align: center;
	}
</style>