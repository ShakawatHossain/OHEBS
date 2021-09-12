<template>
<div class="sidenav">
	<a @click='dup' v-bind:class="{active : sidenav_num==1}">Data Upload</a>
	<a @click='dvd' v-bind:class="{active : sidenav_num==2}">Data Validation</a>
	<a @click='vp' v-bind:class="{active : sidenav_num==3}">Visual permission</a>
	<a @click='ec' v-bind:class="{active : sidenav_num==4}">Event capture</a>
	<a @click='ev' v-bind:class="{active : sidenav_num==5}">Event verification</a>
	<a @click='ir' v-bind:class="{active : sidenav_num==6}">Investigation Report</a>
	<a @click='ra' v-bind:class="{active : sidenav_num==7}">Risk assessment</a>
	<a @click='cn' v-bind:class="{active : sidenav_num==8}">Conclusion</a>
</div>
</template>
<script >
	export default{
		name:'SideNav',
		props:['sidenav_num'],
		methods:{
			dup(){
				this.$emit('navto',1);
			},
			dvd(){
				this.$emit('navto',2);	
			},
			vp(){
				this.$emit('navto',3);
			},
			ec(){
				this.$emit('navto',4);
			},
			ev(){
				this.$emit('navto',5);
			},
			ir(){
				this.$emit('navto',6);
			},
			ra(){
				this.$emit('navto',7);
			},
			cn(){
				this.$emit('navto',8);
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