<template>
  <div class="">
    <form @submit.prevent="submitConfig" class="flex gap-5 text-center flex-col justify-center content-center">
      <fieldset class="flex gap-1 flex-wrap justify-center content-center text-xl ">
        <legend class="my-2">Wohnungen:</legend>
        <div v-for="n in 20" :key="n" class="apartments min-w-[80px] " role="group">
          <input :id="n" type="radio" v-model="numberOfApartments" :value="n" class="peer hidden" />
          <label :for="n"
            class="button-80 w-full text-center peer-checked:bg-dark-blue-900 peer-checked:font-bold peer-checked:text-white ">
            {{ n }}
          </label>
        </div>
      </fieldset>

      <fieldset class="flex gap-1 flex-wrap justify-center content-center text-xl">
        <legend class="my-2">Funktion:</legend>
        <div class="w-max ">
          <input class="peer hidden" type="radio" id="Audio" name="Funktion" v-model="funktion" value="Audio" />
          <label
            class="button-80 text-center peer-checked:bg-dark-blue-900 peer-checked:font-bold peer-checked:text-white"
            for="Audio">Audio</label>
        </div>
        <div class="w-max">
          <input class="peer hidden" n type="radio" id="Video" name="Funktion" v-model="funktion" value="Video" />
          <label
            class="button-80 w-full text-center peer-checked:bg-dark-blue-900 peer-checked:font-bold peer-checked:text-white"
            for="Video">Video</label>
        </div>
      </fieldset>

      <fieldset class="flex gap-1 -flex-wrap justify-center content-center text-xl" v-if="funktion == 'Video'">
        <legend class="my-2">Technologie:</legend>
        <div class="w-max">
          <input class="peer hidden" n type="radio" id="Video-6-Draht" name="Technologie" v-model="technologie"
            value="Video-6-Draht" />
          <label
            class="button-80 w-full text-center peer-checked:bg-dark-blue-900 peer-checked:font-bold peer-checked:text-white"
            for="Video-6-Draht">Video-6-Draht</label>
        </div>
        <div class="w-max">
          <input class="peer hidden" n type="radio" id="Video-2-Draht" name="Technologie" v-model="technologie"
            value="Video-2-Draht" />
          <label
            class="button-80 w-full text-center peer-checked:bg-dark-blue-900 peer-checked:font-bold peer-checked:text-white"
            for="Video-2-Draht">Video-2-Draht</label>
        </div>
      </fieldset class="flex gap-1 flex-wrap justify-center content-center ">
      <div>
        <button class="grow text-center bg-dark-blue-900 hover:bg-slate-900 w-1/2" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
//imports and props
const {stages} = defineProps(['stages'])
// variables
  const numberOfApartments = ref(1);
  const funktion = ref("");
  const technologie = ref("");
// stores
  const visitedStore = useVisitedStore();
  console.log(stages)
// functions
  const goToStage = inject('goToStage')
  const submitConfig = async () => {
    goToStage(stages[1])
    if(!visitedStore.visited.includes(stages[1]))
      visitedStore.visited.push(stages[1])
};
</script>

<style src="../../styles/StageOne.css">
/* CSS */
</style>
