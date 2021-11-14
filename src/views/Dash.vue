<template>
	<div id="nav">
		<router-link to="/">login</router-link>
	</div>
	<div class="dash">
		<div class="row">
			<div class="col-md-3">
				<img alt="Vue logo" src="@/assets/onehealth.png" style="max-width:50%" >
			</div>
			<div class="col-md-9">
				<h1>One Health Event Based System Dashboard</h1>
			</div>
		</div>
		<br>
		<div class="row">
			<p>One Health Event Based Surveillance Data Visualization
			(Management) Dashboard is a web based program aimed to help One Health stakeholders by improving the organization and access to local disease prevalence information. Timely and reliable disease information improves adequate recognition and reaction to high impact infections, such as emerging zoonosis, and promotes prevention and a progressive strategy to control. 
			</p>
		</div>
		<!-- 
		// Menu for dashboard navigaton
		<div class="row">
			<p>Please select topics to visualize in dashboard</p>
			<div>
				<div class="form-check-inline">
					<label for="outbreak" class="form-check-label">
						<input type="radio" id="outbreak" name="d_cls" value="1" class="form-check-input" @change="onChange($event)" :checked="st_topic==1">Outbreak
					</label>
				</div>
				<div class="form-check-inline">
					<label for="influenza" class="form-check-label">
						<input type="radio" id="influenza" name="d_cls" value="2" class="form-check-input" @change="onChange($event)" :checked="st_topic==2">Influenza
					</label>
				</div>
				<div class="form-check-inline">
					<label for="nipah" class="form-check-label">
						<input type="radio" id="nipah" name="d_cls" value="3" class="form-check-input" @change="onChange($event)" :checked="st_topic==3">Nipah
					</label>
				</div>
			</div>
		</div> -->
		<div v-if="st_topic==1">
			<Outbreaks/>
		</div>
		<div v-if="st_topic==2">
			<SubWeek />
			<SubAge />
		</div>
		<div v-if="st_topic==3">
			<Nipah/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import SubWeek from '@/components/SubWeek'
import SubAge from '@/components/SubAge'
import Outbreaks from '@/components/outbreak/Outbreaks.vue'
import Nipah from '@/components/Nipah'
export default {
  name: 'Dash',
  components: {
    SubWeek,SubAge,Outbreaks,Nipah
  },
  data(){
	return{
		st_topic:1
	}
  },
  methods:{
	onChange(event){
		this.st_topic = event.target.value;
	}
  }
}
</script>
