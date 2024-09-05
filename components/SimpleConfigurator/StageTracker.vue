<template>
  <div class="stage-tracker flex gap-5">
    <Button
      v-for="stage in stages"
      :key="stage"
      class="stage-item"
      :disabled="!visitedStore.visited.includes(stage)"
      @click="$emit('goToStage', stage)"
    >
      {{ stage }}
    </Button>
  </div>
</template>

<script setup>
const props = defineProps(["currentStage", "stages"]);
const visitedStore = useVisitedStore();
const goToStage = inject(`goToStage`)
const steps = [
  {
    step: 1,
    title: props.stages[0],
    description: 'Objektdetails angeben',
  },
  {
    step: 2,
    title: props.stages[1],
    description: 'Aussenstation auswählen',
  },
  {
    step: 3,
    title: props.stages[2],
    description: 'Innenstation auswählen',

  },
  {
    step: 4,
    title: props.stages[3],
    description: 'Bestellung Bestätigen',
  }
]

</script>

<style>
.stage-item {
  position: relative;
}
.stage-item:disabled {
  background-color: gray;
  transition: 0;
}
.stage-item::after {
  content: " ";
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: black;
  transform: translateX(19px) translateY(10px);
}
.dark .stage-item::after{
	background-color: white;
}
.stage-item:last-of-type::after {
  width: 0;
  height: 0;
}
.stage-item:disabled:hover,
.stage-item:disabled:focus,
.stage-item:disabled:focus-visible {
  cursor: default;
  border: solid 1px gray;
} */
</style>
