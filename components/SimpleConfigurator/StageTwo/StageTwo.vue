<template>
  <ProductSelection :selectedProducts="selectedProducts.outdoorProducts" @resetSelection="reset" :products="products"
    v-model="remainingoutdoorProducts" />
  <p v-if="products?.length == 0">
    Keine Aussenstation verfügbar. versuchen Sie eine mit
    {{ selectedProducts?.indoorProducts?.neededQuantity + 1 }} tasten anstatt
    oder Kontaktieren Sie uns
    <a href="mailto:verkauf@tcsag.de" class="underline text-blue-600">verkauf@tcsag.de</a>
  </p>
</template>

<script setup>
//imports

import ProductSelection from "../general/ProductSelection.vue";
import outdoorsStations from "@/data/aussenstationen.json";

//consts
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore);
const remainingoutdoorProducts = computed(() => {
  return (
    selectedProducts.value.outdoorProducts.neededQuantity -
    selectedProducts.value.outdoorProducts.SelectedQuantity
  );
});

const productsFilter = SetSearchFilters();
const products = FindOutdoorProducts();
console.log(filter.value.technologie);
function FindOutdoorProducts() {
  let products = outdoorsStations?.filter((product) => {
    if (
      filter.value.funktion == "Video" &&
      filter.value.technologie == "TCS:BUS" &&
      product.AnzhalTatsen > productsFilter.AnzhalTatsen &&
      product.MNR == "ASI12000-0000"
    )
      return true;
    if (
      filter.value.funktion == "Video" &&
      product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
      product.Video2
    ) {
      if (filter.value.technologie == "TCS:BUS" && product.TCSBUS) return true;
      else if (filter.value.technologie == "Video-2-Draht" && product.V2D)
        return true;
    } else if (
      filter.value.funktion == "Audio" &&
      product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
      !product.Video2
    )
      return true;
    else if (
      filter.value.funktion == "Beide" &&
      product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
      !product.Video2 &&
      product.Audio1
    )
      return true;
    else if (
      filter.value.funktion == "Beide" &&
      product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
      (product.Video2 || product.Audio1)
    )
      return true;
  }).sort((a, b) => {
    if(a.parent.MNR == "PES PRO") return -1
    if (a.Video2 && !b.Video2) return -1
    if (!a.Video2 && b.Video2) return 1
    if (a.Video2 && b.Video2) return 0
  })
  return products;
}
function SetSearchFilters() {
  const productsFilter = {
    AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
    funktion:
      filter.value.funktion == "Video"
        ? "Video-Außenstation"
        : filter.value.funktion == "Audio"
          ? "Audio-Außenstation"
          : "",
  };
  if (filter.value.funktion != "Audio")
    productsFilter.technologie = filter.value.technologie;
  return productsFilter;
}

// functions
function reset() {
  selectedProductsStore.resetOutdoorProducts();
}
</script>
