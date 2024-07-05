<template>
  <div>
    <h4>Innenstation auswählen</h4>
    <div v-for="station in stations" :key="station.id" @click="selectStation(station)">
      <img :src="station.image" :alt="station.name" />
      <p>{{ station.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stations: [
        { id: 1, name: 'Audio mit Hörer', image: 'path-to-image1' },
        { id: 2, name: 'Audio mit Hörer', image: 'path-to-image2' },
        // Add more stations as needed
      ]
    };
  },
  methods: {
    selectStation(station) {
      this.$emit('stationSelected', station);
    }
  }
};
</script>
