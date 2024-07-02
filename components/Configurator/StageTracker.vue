<template>
  <div class="stage-tracker flex gap-5">
    <button v-for="stage in stages" :key="stage" class="stage-item bg-dark-blue-950" :disabled="!visitedStore.visited.includes(stage)" @click="$emit('goToStage', stage)">
      {{stage}}
    </button>
  </div>
</template>

<script setup>
const props = defineProps(['currentStage', 'stages'])
const visitedStore = useVisitedStore();
console.log(visitedStore.visited);
</script>

<style>
.stage-item{
  position: relative;
}
.stage-item:disabled{
background-color: gray;
transition: 0;
}
.stage-item::after{
  position: absolute;
  content: "";
  width: 16px;
  height: 2px;
  background-color: black;
  transform: translateY(12px) translateX(22px)
}
.stage-item:last-of-type::after{
  width: 0;
  height: 0;
}
.stage-item:disabled:hover, .stage-item:disabled:focus, .stage-item:disabled:focus-visible{
  cursor:default;
  border: solid 1px gray;
}
</style>