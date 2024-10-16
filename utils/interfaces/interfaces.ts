export interface House {
  floors?: Floor[];
  outdoorStations: Station[] | any[];
}
export interface Floor {
  apartments: Apartment[];
  outdoorStations: Station[] | any[];
}

export interface Apartment {
  indoorStations: Station[];
}
export interface Station {
  station: DeviceData;
  accsessories: DeviceData[];
}
export interface SelectedProducts {
  indoorProducts: {
    neededQuantity: number;
    SelectedQuantity: number;
    products: Array<DeviceData>;
  };
  outdoorProducts: {
    neededQuantity: number;
    SelectedQuantity: number;
    products: Array<DeviceData>;
  };
  accessories: {
    quantity: number;
    products: Array<DeviceData>;
  };
  controlUnit: {
    quantity: number;
    product: DeviceData;
  };
}
export type Product = {
  id: string;
  MNR: string;
  Geraeteart4077: string;
  Kommunikationstechnologie4164: string;
  Audio1: string;
  Video2: string;
  IP1: string;
  TEXT: string;
  KTXT: string;
  V2D: boolean;
  TCSBUS: boolean;
  PERIODE1: string;
  Aufputz: boolean;
  Unterputz: boolean;
  FrontalAnsichtFrei: {
    id: number;
    assetThumb: string;
  };
  parent: {
    MNR: string;
  };
  Audio: object;
  AnzhalTatsen: number;
};
interface DeviceFeature {
  name: string;
  text?: string | null;
  selection?: string | null;
}

interface DeviceModule {
  features?: DeviceFeature[];
}

interface FrontalAnsicht {
  id: string;
  assetThumb: string;
}

interface NecessaryAccessory {
  id: string;
}

interface DisplayProperty {
  name: string;
  description?: string | null;
}

interface Parent {
  MNR: string;
}

export interface DeviceData {
  quantity?: number;
  id: string;
  MNR: string;
  TEXT?: string;
  KTXT?: string;
  Geraeteart4077?: string;
  Kommunikationstechnologie4164?: string;
  Audio1?: boolean;
  Video2?: boolean | null;
  V2D?: boolean;
  TCSBUS?: boolean;
  Aufputz?: boolean;
  Unterputz?: boolean | null;
  VON1: string;
  VON2?: string;
  VON3?: string;
  VON4?: string;
  BIS1?: string;
  BIS2?: string;
  BIS3?: string;
  BIS4?: string;
  PERIODE1: number;
  PERIODE2?: number | null;
  PERIODE3?: number | null;
  PERIODE4?: number | null;
  PIWebsiteLink?: string | null;
  DBWebsiteLink?: string | null;
  parent: Parent;
  Gehaeuse?: DeviceModule[];
  Frontplatte?: DeviceModule[];
  NotwendigesZubehoerAudio?: NecessaryAccessory[];
  NotwendigesZubehoerVideo?: NecessaryAccessory[] | null;
  Erweiterung?: { id: string }[] | null;
  DisplayEigenschaften?: DisplayProperty[];
  FrontalAnsichtFrei?: FrontalAnsicht;
  Audio?: DeviceModule[];
  HatZubehoer?: { id: string }[];
  AnzhalTatsen?: string | number;
  TexteTK?: DeviceModule;
  packID?: string;
  Paket?: { MNR: string }[];
  PREISKNZ?: number;
}
export interface Pack<type> {
  id?: string;
  quantity?: number;
  camera?: type;
  station: type;
  extension?: type;
}

export interface Packet {
  AnzahlISPaket: string;
  MNR: string;
  KTXT: string;
  PERIODE1: number;
  PREISKNZ: number;
  quantity: number;
  Paket: { MNR: string }[];
}