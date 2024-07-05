<template>
  <Card class="apartment-card shadow-transparent h-44">
    <CardHeader>
      <CardTitle>Wohnung {{ apartment.id }}</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <button class="bg-transparent text-black" @click="selectStation">Innenstation auswählen</button>
    </CardContent>
  </Card>

    <!-- <img :src="apartment.stationImage" alt="Selected Station" v-if="apartment.stationImage" /> -->
    <!-- <button @click="selectStation">Innenstation auswählen</button>
    <IndoorStationSelector v-if="showSelector" @stationSelected="stationSelected" /> -->

</template>

<script>
import IndoorStationSelector from './IndoorStationSelector.vue';

export default {
  components: {
    IndoorStationSelector
  },
  props: {
    apartment: Object
  },
  data() {
    return {
      showSelector: false
    };
  },
  methods: {
    selectStation() {
      this.showSelector = true;
    },
    stationSelected(station) {
      this.showSelector = false;
      this.$emit('selectStation', this.apartment.id, station);
    }
  }
};
</script>
