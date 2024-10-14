import outdoorsStations from "@/data/aussenstationen.json";
import extensions from "@/data/Funktionserweiterung.json";
import units from "@/data/steuer.json";
export interface ProductsFilter {
  AnzhalTatsen: string;
  funktion: string;
  technologie: string | null;
}
function addAsiPack(products: Pack<DeviceData>[], video: boolean = false) {
  const packTCU: Pack<DeviceData> = {
    station: {
      ...outdoorsStations.find((product) => product.MNR.includes(`ASI12000`)),
      quantity: 1,
    } as DeviceData,
    extension: {
      ...outdoorsStations.find((product) =>
        product.MNR.includes(`ASI21000-0000`)
      ),
      quantity: 1,
    } as DeviceData,
  };
  if (video) {
    packTCU.camera = {
      ...extensions.find((ext) => ext.MNR.includes(`FVK2202`)),
      quantity: 1,
    } as DeviceData;
  }
  products.push(packTCU);
}

function addPesPackAudio(
  extButtonNumber,
  productsFilter: ProductsFilter,
  products: Pack<DeviceData>[]
) {
  const PETPES = outdoorsStations.find(
    (product) => product.MNR == `PET${extButtonNumber}-EN/04`
  ) as DeviceData;
  const PETPESPRO = outdoorsStations.find((product) =>
    product.MNR.includes(`AEA5302${extButtonNumber}`)
  ) as DeviceData;
  const pesButtons = parseInt(productsFilter.AnzhalTatsen) - extButtonNumber;
  const evenPesButtons = pesButtons + (pesButtons % 2);
  const pesModel = evenPesButtons < 10 ? `0${evenPesButtons}` : evenPesButtons;

  const PES = outdoorsStations.find((product) =>
    product.MNR.includes(`PES${pesModel}`)
  ) as DeviceData;
  const PESPRO =
    PETPESPRO &&
    (outdoorsStations.find(
      (product) =>
        product.MNR.includes(`${pesModel}`) && product.parent.MNR == "PES PRO"
    ) as DeviceData);

  const packPES: Pack<DeviceData> = {
    station: { ...PES, quantity: 1 },
    extension: { ...PETPES, quantity: 1 },
  };
  const packPESPRO: Pack<DeviceData> = {
    station: PESPRO,
    extension: PETPESPRO,
  };
  if (packPESPRO.extension) products.push(packPESPRO);
  if (packPES) products.push(packPES);
}

function addPesPackVideo(
  extButtonNumber,
  productsFilter: ProductsFilter,
  products: Pack<DeviceData>[]
) {
  const PETPESPRO = outdoorsStations.find((product) =>
    product.MNR.includes(`AEA5302${extButtonNumber}`)
  ) as DeviceData;
  const pesButtons = parseInt(productsFilter.AnzhalTatsen) - extButtonNumber;
  const evenPesButtons = pesButtons + (pesButtons % 2);
  const pesModel = evenPesButtons < 10 ? `0${evenPesButtons}` : evenPesButtons;

  const PESPRO =
    PETPESPRO &&
    (outdoorsStations.find(
      (product) =>
        product.MNR.includes(`AVA6102${pesModel}`) &&
        product.parent.MNR == "PES PRO"
    ) as DeviceData);

  const packPESPRO: Pack<DeviceData> = {
    station: PESPRO,
    extension: PETPESPRO,
  };
  if (packPESPRO.extension) products.push(packPESPRO);
}

export function FindOutdoorProducts(productsFilter: ProductsFilter, filter) {
  let products: DeviceData[] = outdoorsStations
    ?.filter((product) => {
      if (product.parent.MNR == "PET") return false;
      if (
        product.AnzhalTatsen >= productsFilter.AnzhalTatsen &&
        product.MNR == "ASI12000-0000"
      )
        return true;
      if (
        filter.value.funktion == "Video" &&
        product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
        product.Video2
      ) {
        if (filter.value.technologie == "TCS:BUS" && product.TCSBUS)
          return true;
        else if (filter.value.technologie == "Video-2-Draht" && product.V2D)
          return true;
      }
      if (
        filter.value.funktion == "Audio" &&
        product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
        !product.Video2
      )
        return true;
      if (
        filter.value.funktion == "Beide" &&
        product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
        !product.Video2 &&
        product.Audio1
      )
        return true;
      if (
        filter.value.funktion == "Beide" &&
        product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
        (product.Video2 || product.Audio1)
      )
        return true;
    })
    .sort((a, b) => {
      if (a.parent.MNR == "PES PRO") return -1;
      if (a.Video2 && !b.Video2) return -1;
      if (!a.Video2 && b.Video2) return 1;
      if (a.Video2 && b.Video2) return 0;
    }) as DeviceData[];
  return products;
}

export function findOutDoorProductsWithEtexensions(
  productsFilter: ProductsFilter
) {
  const products = [] as Pack<DeviceData>[];

  if (productsFilter.funktion == "Video") addAsiPack(products, true);
  else if (productsFilter.funktion == "Beide") {
    addAsiPack(products, true);
    addAsiPack(products, false);
  } else addAsiPack(products, false);

  if (
    parseInt(productsFilter.AnzhalTatsen) > 20 &&
    parseInt(productsFilter.AnzhalTatsen) <= 32 &&
    productsFilter.funktion == "Audio"
  )
    addPesPackAudio(12, productsFilter, products);
  else if (
    parseInt(productsFilter.AnzhalTatsen) > 20 &&
    parseInt(productsFilter.AnzhalTatsen) <= 32 &&
    productsFilter.funktion == "Video"
  )
    addPesPackVideo(12, productsFilter, products);
  else if (
    parseInt(productsFilter.AnzhalTatsen) > 32 &&
    parseInt(productsFilter.AnzhalTatsen) <= 48 &&
    productsFilter.funktion == "Audio"
  )
    addPesPackAudio(28, productsFilter, products);
  else if (
    parseInt(productsFilter.AnzhalTatsen) > 32 &&
    parseInt(productsFilter.AnzhalTatsen) <= 48 &&
    productsFilter.funktion == "Video"
  )
    addPesPackVideo(28, productsFilter, products);

  return products;
}

export function SetSearchFilters(selectedProducts, filter) {
  const productsFilter: ProductsFilter = {
    AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
    funktion: filter.value.funktion,
    technologie: null,
  };
  if (filter.value.funktion != "Audio")
    productsFilter.technologie = filter.value.technologie;
  return productsFilter;
}
