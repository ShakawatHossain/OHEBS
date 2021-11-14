<template>
<div class="sidenav">
	<div v-for="side in sidenav_num" :key="side">
		<a @click='dup' v-if="side==70">Data Upload</a>
		<a @click='dvd' v-if="side==20">Data Validation</a>
		<a @click='um' v-if="side==5">User management</a>
		<a @click='vp' v-if="side==6">Dashboard management</a>
		<a @click='ec' v-if="side==1">Event capture</a>
		<a @click='ev' v-if="side==2">Event verification</a>
		<a @click='ir' v-if="side==4">Event investigation</a>
		<a @click='ra' v-if="side==3">Prior to event investigation</a>
		<a @click='vipe' v-if="side==7">Visual permission</a>
		<a @click='cn' v-if="side==8">Conclusion</a>
	</div>
	<a @click='logout' >Logout</a>
</div>
</template>
<script >
	export default{
		name:'SideNav',
		props:['sidenav_num'],
		methods:{
			dup(){
				this.$emit('navto',70);
			},
			dvd(){
				this.$emit('navto',20);	
			},
			um(){
				this.$emit('navto',5);	
			},
			vp(){
				this.$emit('navto',30);
			},
			ec(){
				this.$emit('navto',1);
			},
			ev(){
				this.$emit('navto',2);
			},
			ir(){
				this.$emit('navto',4);
			},
			ra(){
				this.$emit('navto',3);
			},
			cn(){
				this.$emit('navto',8);
			},
			vipe(){
				this.$emit('navto',7);
			},
			logout(){
				this.$emit('navto',0);
			}
		}
	}
</script>
<style scoped>
.sidenav {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}
.active {
  color: #f1f1f1;
}

.sidenav a:hover {
  color: #f1f1f1;
}
</style>