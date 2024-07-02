<script setup>
import { getCategoryUrl } from "@shopware-pwa/helpers-next";
const { loadNavigationElements, navigationElements } = useNavigation();
await loadNavigationElements({ depth: 1 });
console.log(navigationElements.value);
</script>

<template>
  <ul>
    <li v-for="element in navigationElements">
      <RouterLink :to="getCategoryUrl(element)" :target="element.externalLink || element.linkNewTab
        ? '_blank'
        : ''
        ">
        {{ element.translated.name }}
      </RouterLink>
    </li>
  </ul>
</template>


<style></style>