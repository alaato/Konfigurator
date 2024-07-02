import { defineStore } from 'pinia'

export const useProductsSet = defineStore('currentStage', ()=>{
  const productsSet = ref({
    IndoorStation:null,
    OutdoorStation: null,
    ControlUnit:null, 

  });
  function updateProductsSet(product, type){

  }
  return {productsSet, updateProductsSet}
})
