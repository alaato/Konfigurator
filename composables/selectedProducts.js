import { defineStore } from 'pinia'

export const useProductsSet = defineStore('productsSet', ()=>{
  const productsSet = ref({
    IndoorStation:null,
    OutdoorStation: null,
    ControlUnit:null, 

  });

  function updateProductsSet(product, type){
    if(type == "Innenstation")
      productsSet.value.IndoorStation = product;
    else if (type == "Ausenstation")
      productsSet.value.OutdoorStation = product;
  }

  return {productsSet, updateProductsSet}
})
