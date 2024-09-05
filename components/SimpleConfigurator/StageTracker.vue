<template>
  <div class="stage-tracker flex gap-5">
    <Button v-for="stage in stages" :key="stage" class="stage-item" :disabled="!visitedStore.visited.includes(stage)" @click="$emit('goToStage', stage)">
      {{stage}}
    </Button>
  </div>
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
console.log(visitedStore.visited);
</script>


<style>
.stage-item {
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
  transform: translateX(18px) translateY(10px);
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
}
</style>

