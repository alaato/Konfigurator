import { defineStore } from "pinia";
import { type DeviceData } from "@/utils/interfaces";

export const useSelectedProductsStore = defineStore({
  id: "SelectedProductsStore",
  state: () => {
    return {
      filter: {
        funktion: "",
        technologie: "",
        Video: false,
        Audio: false,
      },
      selectedProducts: {
        indoorProducts: {
          neededQuantity: 0,
          SelectedQuantity: 0,
          products: [] as DeviceData[],
        },
        outdoorProducts: {
          neededQuantity: 1,
          SelectedQuantity: 0,
          products: [] as DeviceData[],
        },
        accessories: {
          quantity: 0,
          products: [] as DeviceData[],
          SelectedQuantity: 0,
        },
        extensions: {
          neededQuantity: 0,
          SelectedQuantity: 0,
          products: [] as DeviceData[],
        },
        controlUnit: null as DeviceData | null,
      },
    };
  },
  getters: {
    getAllSelectedProducts: (state) => {
      const products: DeviceData[] = [];
      Object.values(state.selectedProducts).forEach((category) => {
        if (category.products) {
          products.push(...category.products);
        }
      });
      return products;
    },
    getRemainingOutdoorNeeded: (state) =>
      state.selectedProducts.outdoorProducts.neededQuantity -
      state.selectedProducts.outdoorProducts.SelectedQuantity,
    getRemainingIndoorNeeded: (state) =>
      state.selectedProducts.indoorProducts.neededQuantity -
      state.selectedProducts.indoorProducts.SelectedQuantity,
  },
  actions: {
    incrementOutdoorNeededQuantity(quantity: number) {
      this.selectedProducts.outdoorProducts.neededQuantity += quantity;
    },
    decrementOutdoorNeededQuantity(quantity: number) {
      this.selectedProducts.outdoorProducts.neededQuantity -= quantity;
    },
    resetOutdoorNeededQuantity() {
      this.selectedProducts.outdoorProducts.neededQuantity = 1;
    },
    incrementIndoorNeededQuantity(quantity: number) {
      this.selectedProducts.indoorProducts.neededQuantity += quantity;
    },
    decrementIndoorNeededQuantity(quantity: number) {
      this.selectedProducts.indoorProducts.neededQuantity -= quantity;
    },
    resetIndoorNeededQuantity() {
      this.selectedProducts.indoorProducts.neededQuantity = 0;
    },
    setNeededProductsQuantity(
      indoorQuanitity: number,
      outdoorQuanitity: number,
      extensionsQuantity?: number
    ) {
      this.selectedProducts.indoorProducts.neededQuantity = indoorQuanitity;
      this.selectedProducts.outdoorProducts.neededQuantity = outdoorQuanitity;
      this.selectedProducts.extensions.neededQuantity = extensionsQuantity
        ? extensionsQuantity
        : 0;
    },
    setNeededExtensions(extensionsQuantity) {
      this.selectedProducts.extensions.neededQuantity = extensionsQuantity;
    },
    addIndoorProducts(product, quantity: number) {
      for (let i = 0; i < quantity; i++) {
        this.selectedProducts.indoorProducts.products.push(product);
      }
      this.selectedProducts.indoorProducts.SelectedQuantity += quantity;
    },
    addOutdoorProducts(product: DeviceData, quantity: number) {
      const AddedProduct = this.selectedProducts.outdoorProducts.products.find(
        (p) => p.MNR === product.MNR
      );
      if (AddedProduct) AddedProduct.quantity += quantity;
      else {
        for (let i = 0; i < quantity; i++) {
          this.selectedProducts.outdoorProducts.products.push(product);
        }
      }
      this.selectedProducts.outdoorProducts.SelectedQuantity += quantity;
    },
    addExtension(product, quantity) {
      const AddedProduct = this.selectedProducts.extensions.products.find(
        (p) => p.MNR === product.MNR
      );
      if (AddedProduct) AddedProduct.quantity += quantity;
      else {
        for (let i = 0; i < quantity; i++) {
          this.selectedProducts.extensions.products.push(product);
        }
      }

      this.selectedProducts.extensions.SelectedQuantity += quantity;
    },
    addOneOutdoorProduct(product, quantity) {
      const AddedProduct = this.selectedProducts.outdoorProducts.products.find(
        (p) => p.MNR === product.MNR
      );
      if (AddedProduct) AddedProduct.quantity++;
      else this.selectedProducts.outdoorProducts.products.push(product);
      this.selectedProducts.outdoorProducts.SelectedQuantity += quantity;
    },
    addAccessories(product) {
      this.selectedProducts.accessories.products.push(product);
      this.selectedProducts.accessories.quantity += product.quantity;
    },
    addControlUnit(product) {
      this.selectedProducts.controlUnit = { ...product, quantity: 1 };
    },
    removeIndoorProducts(indoorStation: DeviceData) {
      const index =
        this.selectedProducts.indoorProducts.products.indexOf(indoorStation);
      if (index !== -1) {
        const indoor = this.selectedProducts.indoorProducts.products[index];
        const ZubeIsSelected = indoor.HatZubehoer.forEach((zube) => {
          const zubeIndex =
            this.selectedProducts.accessories.products.findIndex(
              (product) => product.id === zube.id
            );
          if (zubeIndex == -1) return;
          const foundZube =
            this.selectedProducts.accessories.products[zubeIndex];
          if (foundZube && foundZube.quantity >= indoorStation.quantity) {
            foundZube.quantity -= indoorStation.quantity;
          } else if (foundZube && foundZube.quantity < indoorStation.quantity) {
            foundZube.quantity = 0;
          }
          if (foundZube && foundZube.quantity == 0) {
            this.selectedProducts.accessories.products.splice(zubeIndex, 1);
          }
        });
        this.selectedProducts.indoorProducts.SelectedQuantity -=
          indoorStation.quantity;
        this.selectedProducts.indoorProducts.products.splice(index, 1);
      }
    },
    removeExtension(product) {
      const index = this.selectedProducts.extensions.products.indexOf(product);
      if (index !== -1) {
        this.selectedProducts.extensions.products.splice(index, 1);
        this.selectedProducts.extensions.SelectedQuantity -= product.quantity;
      }
    },
    removeOutdoorProducts(product) {
      const index: number =
        this.selectedProducts.outdoorProducts.products.indexOf(product);
      if (index !== -1) {
        this.selectedProducts.outdoorProducts.products.splice(index, 1);
        this.selectedProducts.outdoorProducts.SelectedQuantity -=
          product.quantity;
      }
    },
    removeAccessories(product) {
      const index = this.selectedProducts.accessories.products.indexOf(product);
      if (index !== -1) {
        this.selectedProducts.accessories.products.splice(index, 1);
      }
    },
    replaceExtension(oldProduct, newProduct) {
      const indexOld =
        this.selectedProducts.extensions.products.indexOf(oldProduct);
      if (indexOld !== -1) {
        this.selectedProducts.extensions.SelectedQuantity -=
          oldProduct.quantity;
        this.selectedProducts.extensions.products[indexOld] = newProduct;
        this.selectedProducts.extensions.SelectedQuantity +=
          newProduct.quantity;
      }
    },
    resetControlUnit() {
      this.selectedProducts.controlUnit = null;
    },
    resetIndoorProducts() {
      this.selectedProducts.indoorProducts.products = [];
      this.selectedProducts.indoorProducts.SelectedQuantity = 0;
    },
    resetAccessories() {
      this.selectedProducts.accessories.products = [];
      this.selectedProducts.accessories.quantity = 0;
    },
    resetOutdoorProducts() {
      this.selectedProducts.outdoorProducts.products = [];
      this.selectedProducts.outdoorProducts.SelectedQuantity = 0;
    },
    resetExtension() {
      this.selectedProducts.extensions.products = [];
      this.selectedProducts.extensions.SelectedQuantity = 0;
    },
    resetSelectedProducts() {
      this.resetIndoorProducts();
      this.resetOutdoorProducts();
      this.resetExtension();
      this.resetAccessories();
    },
    resetAllProducts() {
      this.resetIndoorProducts();
      this.resetOutdoorProducts();
      this.resetControlUnit();
      this.resetExtension();
      this.resetAccessories();
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
