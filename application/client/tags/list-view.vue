
<template>
  <v-list>
    <v-list-tile v-for="(item, index) in items" @click="select(index)">
      <v-list-tile-action>
        <v-icon>stars</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
	module.exports = {
		data: function() {
			return {
				items: application.list
			}
		},
		methods: {
			select: function(index) {
				Broadcast.publish('edit', {
					item : application.list[index]
				});
			}
		}
	}
</script>

<style>
</style>
