import outdoorsStations from "@/data/aussenstationen.json";
import extensions from "@/data/Funktionserweiterung.json";
interface Filter {
  funktion: string;
  technologie: string;
  Video: boolean;
  Audio: boolean;
  color: string;
  material: string;
  anzahlTasten: number;
}
function addAsiPack(
  products: Pack<DeviceData>[],
  video: boolean = false,
  extension: boolean = false
) {
  const packTCU: Pack<DeviceData> = {
    station: {
      ...outdoorsStations.find((product) => product.MNR.includes(`ASI12000`)),
      quantity: 1,
    } as DeviceData,
    extension: null,
  };
  if (extension) {
    packTCU.extension = {
      ...outdoorsStations.find((product) =>
        product.MNR.includes(`ASI21000-0000`)
      ),
      quantity: 1,
    } as DeviceData;
  }
  if (video) {
    packTCU.camera = {
      ...extensions.find((ext) => ext.MNR.includes(`FVK2202`)),
      quantity: 1,
    } as DeviceData;
  }
  products.push(packTCU);
}

function addPesPackAudio(
  extButtonNumber: number,
  filter: Filter,
  products: Pack<DeviceData>[]
) {
  const PETPES = outdoorsStations.find(
    (product) => product.MNR == `PET${extButtonNumber}-EN/04`
  ) as DeviceData;
  const PETPESPRO = outdoorsStations.find((product) =>
    product.MNR.includes(`AEA5302${extButtonNumber}`)
  ) as DeviceData;
  const pesButtons = filter.anzahlTasten - extButtonNumber;
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
  extButtonNumber: number,
  filter: Filter,
  products: Pack<DeviceData>[]
) {
  const PETPESPRO = outdoorsStations.find((product) =>
    product.MNR.includes(`AEA5302${extButtonNumber}`)
  ) as DeviceData;
  const pesButtons = filter.anzahlTasten - extButtonNumber;
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

export function FindOutdoorProducts(filter : Filter) {
  console.log(filter);
  const products: DeviceData[] = outdoorsStations
    ?.filter((product) => {
      if (product.parent.MNR == "PET") return false;
      if (
        parseInt(product.AnzhalTatsen) >= filter.anzahlTasten &&
        product.MNR == "ASI12000-0000" &&
        filter.funktion == "Audio"
      )
        return true;
      if (
        filter.funktion == "Video" &&
        parseInt(product.AnzhalTatsen) == filter.anzahlTasten &&
        product.Video2
      ) {
        if (filter.technologie == "TCS:BUS" && product.TCSBUS)
          return true;
        else if (filter.technologie == "Video-2-Draht" && product.V2D)
          return true;
      }
      if (
        filter.funktion == "Audio" &&
        parseInt(product.AnzhalTatsen) == filter.anzahlTasten &&
        !product.Video2
      )
        return true;
      if (
        filter.funktion == "Beide" &&
        parseInt(product.AnzhalTatsen) == filter.anzahlTasten &&
        !product.Video2 &&
        product.Audio1
      )
        return true;
      if (
        filter.funktion == "Beide" &&
        parseInt(product.AnzhalTatsen) == filter.anzahlTasten &&
        (product.Video2 || product.Audio1)
      )
        return true;
    })
    .sort((a, b) => {
      if (a.parent.MNR == "PES PRO") return -1;
      if (b.parent.MNR == "PES PRO") return 1;
      if (a.Video2 && !b.Video2) return -1;
      if (!a.Video2 && b.Video2) return 1;
      if ((a.Video2 && b.Video2) || (a.Audio1 && b.Audio1))
        return a.PERIODE1 - b.PERIODE1;
    }) as DeviceData[];

  return products;
}
export function findPackNoextensions() {
  const pack = [] as Pack<DeviceData>[];
  addAsiPack(pack, true, false);
  return pack;
}
export function findOutDoorProductsWithEtexensions(
  filter : Filter
) {
  const products = [] as Pack<DeviceData>[];

  if (filter.funktion == "Video") addAsiPack(products, true, true);
  else if (filter.funktion == "Beide") {
    addAsiPack(products, true, true);
    addAsiPack(products, false, true);
  } else addAsiPack(products, false, true);

  if (
    filter.anzahlTasten > 20 &&
    filter.anzahlTasten <= 32 &&
    filter.funktion == "Audio"
  )
    addPesPackAudio(12, filter, products);
  else if (
    filter.anzahlTasten > 20 &&
    filter.anzahlTasten <= 32 &&
    filter.funktion == "Video"
  )
    addPesPackVideo(12, filter, products);
  else if (
    filter.anzahlTasten > 32 &&
    filter.anzahlTasten <= 48 &&
    filter.funktion == "Audio"
  )
    addPesPackAudio(28, filter, products);
  else if (
    filter.anzahlTasten > 32 &&
    filter.anzahlTasten <= 48 &&
    filter.funktion == "Video"
  )
    addPesPackVideo(28, filter, products);

    console.log(products);
  return products;
}

export function SetSearchFilters(filter) {
  const productsFilter = {
    AnzahlTasten: filter.value.anzahlTasten,
    funktion: filter.value.funktion,
    technologie: null,
  }
  if (filter.value.funktion != "Audio")
    productsFilter.technologie = filter.value.technologie;
  return productsFilter;
}
