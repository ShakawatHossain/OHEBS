<template>
	<h2 >Record an event</h2>
	<label>Contact person name *</label>
	<input type="text" name="name" class="form-control">
	<label>Contact person mobile no *</label>
	<input type="text" name="mobile" class="form-control">
	<br/>
	<label>Description of the event</label>
	<textarea class="form-control" rows="6"></textarea>
	<label>Upload file if needed</label>
	<input type="file" class="form-control">
	<label>Division</label>
	<select class="form-control">
		<option>Dhaka</option>
		<option>Rajshahi</option>
	</select>
	<label>District</label>
	<select class="form-control">
		<option>Dhaka</option>
		<option>Munshigonj</option>
	</select>
	<label>Thana/upazila</label>
	<select class="form-control">
		<option>Ramna</option>
		<option>Mohammadpur</option>
	</select>
	<label for="name">Address</label>
	<input type="text" id="name" class="form-control">
	<label for="name">Data uploaded by</label>
	<input type="text" id="name" class="form-control">
	<br/>
	<button class="btn btn-primary">Submit</button>
</template>