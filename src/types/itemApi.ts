export type ItemAPIResponse = {
  site_id: string;
  country_default_time_zone: string;
  query: string;
  paging: Paging;
  results: Result[];
  sort: Sort;
  available_sorts: Sort[];
  filters: Filter[];
  available_filters: AvailableFilter[];
  pdp_tracking: PDPTracking;
  user_context: null;
  ranking_introspection: RankingIntrospection;
};

export type AvailableFilter = {
  id: string;
  name: string;
  type: FilterType;
  values: AvailableFilterValue[];
};

export enum FilterType {
  Boolean = "boolean",
  List = "list",
  Number = "number",
  Range = "range",
  String = "STRING",
  Text = "text",
}

export type AvailableFilterValue = {
  id: string;
  name: string;
  results: number;
};

export type Sort = {
  id: string;
  name: string;
};

export type Filter = {
  id: string;
  name: string;
  type: FilterType;
  values: FilterValue[];
};

export type FilterValue = {
  id: string;
  name: string;
  path_from_root?: Sort[];
};

export type Paging = {
  total: number;
  primary_results: number;
  offset: number;
  limit: number;
};

export type PDPTracking = {
  group: boolean;
  product_info: ProductInfo[];
};

export type ProductInfo = {
  id: string;
  score: number;
  status: string;
};

export type RankingIntrospection = unknown;

export type Result = {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  catalog_product_id: string;
  listing_type_id: string;
  sanitized_title: string;
  permalink: string;
  buying_mode: string;
  site_id: string;
  category_id: string;
  domain_id: string;
  thumbnail: string;
  currency_id: string;
  order_backend: number;
  price: number;
  original_price: number;
  sale_price: SalePrice;
  available_quantity: number;
  official_store_id: number;
  official_store_name: string;
  use_thumbnail_id: boolean;
  accepts_mercadopago: boolean;
  shipping: Shipping;
  stop_time: Date;
  seller: Seller;
  address: Address;
  attributes: Attribute[];
  installments: Installments;
  winner_item_id: null;
  catalog_listing: boolean;
  discounts: null;
  promotion_decorations: null;
  promotions: null;
  inventory_id: null;
};

export type Address = {
  state_id: string;
  state_name: string;
  city_id: null;
  city_name: string;
};

export type Attribute = {
  id: string;
  name: string;
  value_id: null | string;
  value_name: string;
  attribute_group_id: AttributeGroupID;
  attribute_group_name: AttributeGroupName;
  value_struct: Struct | null;
  values: AttributeValue[];
  source: number;
  value_type: ValueType;
};

export enum AttributeGroupID {
  Others = "OTHERS",
}

export enum AttributeGroupName {
  Otros = "Otros",
}

export type Struct = {
  number: number;
  unit: string;
};

export enum ValueType {
  List = "list",
  NumberUnit = "number_unit",
  String = "string",
}

export type AttributeValue = {
  id: null | string;
  name: string;
  struct: Struct | null;
  source: number;
};

export type Installments = {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
  metadata: InstallmentsMetadata;
};

export type InstallmentsMetadata = {
  meliplus_installments: boolean;
  additional_bank_interest: boolean;
};

export type SalePrice = {
  price_id: string;
  amount: number;
  conditions: Conditions;
  currency_id: string;
  exchange_rate: null;
  payment_method_prices: unknown[];
  payment_method_type: string;
  regular_amount: number;
  type: string;
  metadata: SalePriceMetadata;
};

export type Conditions = {
  eligible: boolean;
  context_restrictions: string[];
  start_time: Date;
  end_time: Date;
};

export type SalePriceMetadata = {
  campaign_id: string;
  promotion_id: string;
  promotion_type: string;
};

export type Seller = {
  id: number;
  nickname: string;
};

export type Shipping = {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  mode: string;
  tags: string[];
  benefits: null;
  promise: null;
  shipping_score: number;
};
