import { defineStore } from 'pinia'

export const useCurrentStageStore = defineStore('currentStage', ()=>{
  const currentStage = ref("Anforderungen");
  function updateCurrentStage(stage){
    currentStage.value = stage;
  }
  return {currentStage, updateCurrentStage}
})
