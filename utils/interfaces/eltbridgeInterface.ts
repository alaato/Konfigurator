export interface ItemMIME {
  UDX_EDXF_MIME_SOURCE: string;
  UDX_EDXF_MIME_CODE: string;
  UDX_EDXF_MIME_FILENAME: string;
  UDX_EDXF_MIME_DESIGNATION?: string;
  UDX_EDXF_MIME_ALT?: string;
  UDX_EDXF_MIME_ISSUE_DATE?: string; // format: YYYY-MM-DD
  UDX_EDXF_MIME_EXPIRY_DATE?: string; // format: YYYY-MM-DD
}

export interface Item {
  SUPPLIER_ID_GLN?: string; // maxLength: 13, pattern: /^[0-9]*$/
  SUPPLIER_ID_DUNS?: string; // maxLength: 9, pattern: /^[0-9]*$/
  MANUFACTURER_PID?: string; // maxLength: 50
  MANUFACTURER_TYPE_DESCR?: string; // maxLength: 50
  INTERNATIONAL_PID?: string; // maxLength: 14, pattern: /^[0-9]*$/
  DESCRIPTION_SHORT: string; // maxLength: 150
  PRICE_AMOUNT?: string; // pattern: /^[0-9]{1,18}(\.[0-9]{2})?$/
  CURRENCY?: string; // pattern: currency regex
  PRICE_QUANTITY?: string; // pattern: /^[0-9]{1,18}$/
  UDX_EDXF_DISCOUNT_GROUP_MANUFACTURER?: string; // maxLength: 20
  QUANTITY: string; // pattern: /^[0-9]{1,18}(\.[0-9]{2})?$/
  ORDER_UNIT: string; // pattern: unit regex
  VALIDITY_END?: string; // format: YYYY-MM-DD
  MIME?: ItemMIME[]; // minItems: 1
}

interface ItemWithRefConfig extends Item {
  REFNUMBER_CONFIG: string; // maxLength: 255
}


export interface ConfigurationSchema {
  CONFIGURATION_URL?: string; // maxLength: 250
  ITEM: Item[]; // minItems: 1
}
