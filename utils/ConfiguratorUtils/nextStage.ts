const selectedProductsStore = useSelectedProductsStore();
const visitedStore = useVisitedStore();
const { getRemainingIndoorNeeded, getRemainingOutdoorNeeded } = storeToRefs(
  selectedProductsStore
);
export function weiter(gotoStage: Function) {
  if (
    getRemainingIndoorNeeded.value == 0 &&
    getRemainingOutdoorNeeded.value == 0
  ) {
    gotoStage("Übersicht");
    if (!visitedStore.visited.includes("Übersicht"))
      visitedStore.visited.push("Übersicht");
  }
}
