import { defineStore } from "pinia";

export const useVisitedStore = defineStore(
  "visited",
  () => {
    const visited = ref(["Anforderungen"]);
    function resetVisited() {
      visited.value = ["Anforderungen"];
    }
    return { visited, resetVisited };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.sessionStorage(),
    },
  }
);
