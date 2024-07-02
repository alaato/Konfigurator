
export  const goToStageTwo = (funktion, outdoorProducts, visited, products) => {
    outdoorProducts.value = products.value.filter((product) => product.type === "outdoor" && product.funktion.includes(funktion))
    console.log(outdoorProducts.value);
    goToStage(stages.value[1]);
    visited.value.push(stages.value[1])
};

export const goToStageThree = (product, selectedProducts, indoorProducts, visited, products) => {
    selectedProducts.value.outdoorProduct = product;
    indoorProducts.value = products.value.filter((product) => product.type === "indoor" && product.funktion == selectedProducts.value.outdoorProduct.funktion)
    console.log(selectedProducts.value.outdoorProduct);
    visited.value.push(stages.value[2])
    goToStage(stages.value[2]); // Transition to Stage Three
};

export const goToStageFour = (product, visited, selectedProducts, products) => {
    selectedProducts.value.indoorProduct = product;
    console.log(selectedProducts.value)
    visited.value.push(stages.value[3])
    goToStage(stages.value[3])
};

export const goToStage = (targetStage) => {
    if (targetStage < 1 || targetStage > 4) {
        console.warn("Invalid stage:", targetStage);
        return;
    }
    currentStage.value = targetStage;
}