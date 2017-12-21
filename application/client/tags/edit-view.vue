
<template>
  <v-card class="ma-3">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Constant Definition</h3>
        <div>Select a constant to edit from the list of constants on the left. You may edit the value and the comment. Press the button "Save all changes" when you're finished editing.</div>
      </div>
    </v-card-title>
    <v-card-text>
	    <form>
        <v-text-field
          label="Name"
          v-model="item.name"
          readonly
        ></v-text-field>
        <v-text-field
          label="Type"
          v-model="item.type"
          readonly
        ></v-text-field>
        <v-text-field
          label="Value"
          v-model="item.value"
          required
        ></v-text-field>
        <v-text-field
          label="Comment"
          v-model="item.comment"
        ></v-text-field>
        <v-btn color="success" @click="submit">Save All Changes</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
	
	Broadcast.subscribe('edit', function(properties) {
		this.data.item = properties.item;
	}.bind(this));
	
	module.exports = {
		data: function() {
			return this.data = {
				item : {}
			};
		}.bind(this),
		methods: {
			submit: function() {
				application.data.message = 'Saving all changes.';
				application.data.snackbar = true;
				application.write();
			}
		}
	}
	
</script>

<style>

</style>
