/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AssetConnection = {
  __typename?: 'AssetConnection';
  edges?: Maybe<Array<Maybe<AssetEdge>>>;
  /** The total count of all queryable assets for this schema listing */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type AssetEdge = {
  __typename?: 'AssetEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Asset_Tree>;
};

export type ElementProperty = Property_Asset | Property_Checkbox | Property_Object | Property_Select | Property_Text;

export type InputQuantityValue = {
  __typename?: 'InputQuantityValue';
  toString?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<QuantityValueUnit>;
  value?: Maybe<Scalars['String']['output']>;
};


export type InputQuantityValueToStringArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  edges?: Maybe<Array<Maybe<ProductEdge>>>;
  /** The total count of all queryable objects for this schema listing */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Object_Product>;
};

export type QuantityValue = {
  __typename?: 'QuantityValue';
  toString?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<QuantityValueUnit>;
  value?: Maybe<Scalars['Float']['output']>;
};


export type QuantityValueToStringArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

export type QuantityValueUnit = {
  __typename?: 'QuantityValueUnit';
  abbreviation?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  longname?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAsset?: Maybe<Asset>;
  getAssetListing?: Maybe<AssetConnection>;
  getProduct?: Maybe<Object_Product>;
  getProductListing?: Maybe<ProductConnection>;
};


export type QueryGetAssetArgs = {
  defaultLanguage?: InputMaybe<Scalars['String']['input']>;
  fullpath?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAssetListingArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  defaultLanguage?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  fullpaths?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sortOrder?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryGetProductArgs = {
  defaultLanguage?: InputMaybe<Scalars['String']['input']>;
  fullpath?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetProductListingArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  defaultLanguage?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  fullpaths?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sortOrder?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags?: InputMaybe<Scalars['String']['input']>;
};

export type Asset = Element & {
  __typename?: 'asset';
  _siblings?: Maybe<Array<Maybe<Asset_Tree>>>;
  children?: Maybe<Array<Maybe<Asset_Tree>>>;
  creationDate?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<Dimensions>;
  duration?: Maybe<Scalars['Float']['output']>;
  embeddedMetaInfo?: Maybe<Array<Maybe<Asset_EmbeddedMetaInfo_Item>>>;
  filename?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['Int']['output']>;
  fullpath?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  metadata?: Maybe<Array<Maybe<Asset_Metadata_Item>>>;
  mimetype?: Maybe<Scalars['String']['output']>;
  modificationDate?: Maybe<Scalars['Int']['output']>;
  parent?: Maybe<Asset_Tree>;
  properties?: Maybe<Array<Maybe<ElementProperty>>>;
  resolutions?: Maybe<Array<Maybe<Resolutions>>>;
  srcset?: Maybe<Array<Maybe<Srcset>>>;
  tags?: Maybe<Array<Maybe<Element_Tag>>>;
  type?: Maybe<Scalars['String']['output']>;
};


export type AssetDataArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};


export type AssetDimensionsArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};


export type AssetFullpathArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};


export type AssetMetadataArgs = {
  ignore_language?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
};


export type AssetPropertiesArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type AssetResolutionsArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  thumbnail: Scalars['String']['input'];
  types?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};


export type AssetSrcsetArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  thumbnail: Scalars['String']['input'];
};


export type AssetTagsArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Asset_EmbeddedMetaInfo_Item = {
  __typename?: 'asset_embeddedMetaInfo_item';
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Asset_Folder = {
  __typename?: 'asset_folder';
  _siblings?: Maybe<Array<Maybe<Asset_Tree>>>;
  children?: Maybe<Array<Maybe<Asset_Tree>>>;
  creationDate?: Maybe<Scalars['Int']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  fullpath?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  modificationDate?: Maybe<Scalars['Int']['output']>;
  parent?: Maybe<Asset_Folder>;
  properties?: Maybe<Array<Maybe<ElementProperty>>>;
};


export type Asset_FolderFullpathArgs = {
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};


export type Asset_FolderPropertiesArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Asset_Metadata_Item = {
  __typename?: 'asset_metadata_item';
  data?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Asset_Tree = Asset | Asset_Folder;

export type CsFeature = CsFeatureBooleanSelect | CsFeatureCalculatedValue | CsFeatureCheckbox | CsFeatureCountry | CsFeatureCountryMultiselect | CsFeatureDate | CsFeatureDatetime | CsFeatureInput | CsFeatureInputQuantityValue | CsFeatureLanguage | CsFeatureLangugeMultiselect | CsFeatureMultiselect | CsFeatureNumeric | CsFeatureQuantityValue | CsFeatureRgbaColor | CsFeatureSelect | CsFeatureSlider | CsFeatureTextarea | CsFeatureTime | CsFeatureWysiwyg;

export type CsFeatureBooleanSelect = CsFeatureInterface & {
  __typename?: 'csFeatureBooleanSelect';
  checked?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureCalculatedValue = CsFeatureInterface & {
  __typename?: 'csFeatureCalculatedValue';
  calculatedvalue?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureCheckbox = CsFeatureInterface & {
  __typename?: 'csFeatureCheckbox';
  checked?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureCountry = CsFeatureInterface & {
  __typename?: 'csFeatureCountry';
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureCountryMultiselect = CsFeatureInterface & {
  __typename?: 'csFeatureCountryMultiselect';
  countries?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureDate = CsFeatureInterface & {
  __typename?: 'csFeatureDate';
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};


export type CsFeatureDateDateArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};

export type CsFeatureDatetime = CsFeatureInterface & {
  __typename?: 'csFeatureDatetime';
  datetime?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureInput = CsFeatureInterface & {
  __typename?: 'csFeatureInput';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureInputQuantityValue = CsFeatureInterface & {
  __typename?: 'csFeatureInputQuantityValue';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  inputquantityvalue?: Maybe<InputQuantityValue>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureInterface = {
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureLanguage = CsFeatureInterface & {
  __typename?: 'csFeatureLanguage';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureLangugeMultiselect = CsFeatureInterface & {
  __typename?: 'csFeatureLangugeMultiselect';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureMultiselect = CsFeatureInterface & {
  __typename?: 'csFeatureMultiselect';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  selections?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureNumeric = CsFeatureInterface & {
  __typename?: 'csFeatureNumeric';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureQuantityValue = CsFeatureInterface & {
  __typename?: 'csFeatureQuantityValue';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quantityvalue?: Maybe<QuantityValue>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureRgbaColor = CsFeatureInterface & {
  __typename?: 'csFeatureRgbaColor';
  color?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureSelect = CsFeatureInterface & {
  __typename?: 'csFeatureSelect';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  selection?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureSlider = CsFeatureInterface & {
  __typename?: 'csFeatureSlider';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slidervalue?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureTextarea = CsFeatureInterface & {
  __typename?: 'csFeatureTextarea';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureTime = CsFeatureInterface & {
  __typename?: 'csFeatureTime';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsFeatureWysiwyg = CsFeatureInterface & {
  __typename?: 'csFeatureWysiwyg';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CsGroup = {
  __typename?: 'csGroup';
  description?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Array<Maybe<CsFeature>>>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Dimensions = {
  __typename?: 'dimensions';
  height?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type Element = {
  id?: Maybe<Scalars['ID']['output']>;
};

export type Element_Tag = {
  __typename?: 'element_tag';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type Hotspot_Metadata_Object = Asset | Object_Product;

export type Object_Product = Element & {
  __typename?: 'object_Product';
  /** returns a list of group containers */
  Audio?: Maybe<Array<Maybe<CsGroup>>>;
  Audio1?: Maybe<Scalars['Boolean']['output']>;
  Geraeteart4077?: Maybe<Scalars['String']['output']>;
  Hersteller3867?: Maybe<Scalars['String']['output']>;
  /** returns a list of group containers */
  IP?: Maybe<Array<Maybe<CsGroup>>>;
  IP1?: Maybe<Scalars['Boolean']['output']>;
  KTXT?: Maybe<Scalars['String']['output']>;
  Kommunikationstechnologie4164?: Maybe<Scalars['String']['output']>;
  MNR?: Maybe<Scalars['String']['output']>;
  Schlagwoerter4924?: Maybe<Scalars['String']['output']>;
  TCSBUS?: Maybe<Scalars['Boolean']['output']>;
  /** returns a list of group containers */
  TexteTK?: Maybe<Array<Maybe<CsGroup>>>;
  V2D?: Maybe<Scalars['Boolean']['output']>;
  /** returns a list of group containers */
  Video?: Maybe<Array<Maybe<CsGroup>>>;
  Video2?: Maybe<Scalars['Boolean']['output']>;
  _siblings?: Maybe<Array<Maybe<Object_Tree>>>;
  children?: Maybe<Array<Maybe<Object_Tree>>>;
  childrenSortBy?: Maybe<Scalars['String']['output']>;
  classname?: Maybe<Scalars['String']['output']>;
  creationDate?: Maybe<Scalars['Int']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  fullpath?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  modificationDate?: Maybe<Scalars['Int']['output']>;
  objectType?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Object_Tree>;
  properties?: Maybe<Array<Maybe<ElementProperty>>>;
  tags?: Maybe<Array<Maybe<Element_Tag>>>;
};


export type Object_ProductAudioArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


export type Object_ProductIpArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


export type Object_ProductKtxtArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


export type Object_ProductTexteTkArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


export type Object_ProductVideoArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};


export type Object_Product_SiblingsArgs = {
  objectTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Object_ProductChildrenArgs = {
  objectTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Object_ProductPropertiesArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Object_ProductTagsArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Object_Tree = Object_Product;

export type Property_Asset = {
  __typename?: 'property_asset';
  asset?: Maybe<Asset>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Property_Checkbox = {
  __typename?: 'property_checkbox';
  checked?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Property_Object = {
  __typename?: 'property_object';
  name?: Maybe<Scalars['String']['output']>;
  object?: Maybe<Hotspot_Metadata_Object>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Property_Select = {
  __typename?: 'property_select';
  name?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Property_Text = {
  __typename?: 'property_text';
  name?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Resolutions = {
  __typename?: 'resolutions';
  resolution?: Maybe<Scalars['Float']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Srcset = {
  __typename?: 'srcset';
  descriptor?: Maybe<Scalars['String']['output']>;
  resolutions?: Maybe<Array<Maybe<Resolutions>>>;
  url?: Maybe<Scalars['String']['output']>;
};


export type SrcsetResolutionsArgs = {
  types?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};
