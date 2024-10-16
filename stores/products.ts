import { defineStore } from "pinia";
import { type DeviceData, type Pack, type Packet } from "@/utils/interfaces";

export const useSelectedProductsStore = defineStore({
  id: "SelectedProductsStore",
  state: () => {
    return {
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
      packs: [] as Pack<string>[],
      packets: [] as Packet[],
    };
  },
  getters: {
    getAllSelectedProducts: (state) => {
      const products: DeviceData[] = [];
      Object.values(state.selectedProducts).forEach((category) => {
        if (category.products) {
          products.push(...category.products);
        } else products.push(category as DeviceData);
      });
      return products;
    },

    getAllOutdoorProducts: (state) => {
      const products: DeviceData[] = [];
      state.selectedProducts.outdoorProducts.products.forEach((product) => {
        products.push(product);
      });
    },
    getAllIndoorProducts: (state) => {
      const products: DeviceData[] = [];
      state.selectedProducts.indoorProducts.products.forEach((product) => {
        products.push(product);
      });
    },
    getAllExtensions: (state) => {
      const products: DeviceData[] = [];

      state.selectedProducts.extensions.products.forEach((product) => {
        products.push(product);
      });
      return products;
    },
    getAllAccessories: (state) => {
      const products: DeviceData[] = [];
      state.selectedProducts.accessories.products.forEach((product) => {
        products.push(product);
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
    addPack(pack: Pack<DeviceData>, quantity?: number) {
      const foundPack = this.packs.find(
        (thisPack) => thisPack.station === pack?.station?.id? pack.station.id : null
      );
      let id;
      if (foundPack) {
        id = foundPack.id;
        foundPack.quantity += quantity || 1;
      } else {
        id = this.packs.length.toString();
        const packToAdd: Pack<string> = {
          id: id,
          quantity: quantity ? quantity : 1,
          station: pack?.station.id || null,
          extension: pack?.extension?.id || null,
          camera: pack?.camera?.id || null,
        };
        this.packs.push(packToAdd);
      }

      if (pack.camera) {
        pack.camera.packID = id;
        this.addExtension(pack.camera, quantity || 1);
      }
      if (pack.extension) {
        pack.extension.packID = id;
        this.addExtension(pack.extension, quantity || 1);
      }
      if (pack.station) {
        pack.station.packID = id;
        this.addOutdoorProducts(pack.station, quantity || 1);
      }
    },
    addPaket(paket : Packet) {
      this.packets.push(paket);
    },

    removePack(id: string) {
      const pack = this.packs.find((pack) => pack.id === id);
      if (pack) {
        const outdoorIndex =
          this.selectedProducts.outdoorProducts.products.findIndex(
            (product) => product.id === pack.station
          );
        const extensionIndex =
          this.selectedProducts.extensions.products.findIndex(
            (product) => product.id === pack.extension
          );
        const cameraIndex =
          this.selectedProducts.indoorProducts.products.findIndex(
            (product) => product.id === pack.camera
          );
        this.selectedProducts.outdoorProducts.products.splice(
          outdoorIndex,
          pack.quantity
        );
        this.selectedProducts.outdoorProducts.SelectedQuantity -= pack.quantity;

        this.selectedProducts.extensions.products.splice(
          extensionIndex,
          pack.quantity
        );
        this.selectedProducts.extensions.SelectedQuantity -= pack.quantity;

        this.selectedProducts.extensions.products.splice(
          cameraIndex,
          pack.quantity
        );
        this.selectedProducts.extensions.SelectedQuantity -= pack.quantity;

        this.packs = this.packs.filter((pack) => pack.id !== id);
      }
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
    replaceControlUnit(unit) {
      this.selectedProducts.controlUnit = unit;
    },
    resetControlUnit() {
      this.selectedProducts.controlUnit = null;
    },
    editOutdoorProduct(
      property: string,
      value: number,
      outdoorProduct?: DeviceData,
      Index?: number
    ) {
      let index;
      if (outdoorProduct)
        index =
          this.selectedProducts.outdoorProducts.products.indexOf(
            outdoorProduct
          );
      else index = Index;

      if (index !== -1) {
        this.selectedProducts.outdoorProducts.products[index][property] = value;
      }
    },
    editIndoorProduct(property, value, indoorProduct?, Index?) {
      let index;
      if (indoorProduct)
        index =
          this.selectedProducts.indoorProducts.products.indexOf(indoorProduct);
      else index = Index;
      if (index !== -1) {
        this.selectedProducts.indoorProducts.products[index][property] = value;
      }
    },
    editControlUnit(property, value) {
      if (this.selectedProducts.controlUnit) {
        this.selectedProducts.controlUnit[property] = value;
      }
    },
    editPaket(property, value, packet?, Index?) {
      let index;
      if (packet)
        index = this.packets.findIndex((p) => p.MNR === packet.MNR);
      else index = Index;
      if (index !== -1) {
        this.packets[index][property] = value;
      }
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
      this.packs = [];
    },
    resetAllProducts() {
      this.resetIndoorProducts();
      this.resetOutdoorProducts();
      this.resetControlUnit();
      this.resetExtension();
      this.resetAccessories();
      this.packs = [];
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
