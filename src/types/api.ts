// Базовые типы для API МойСклад

export interface Meta {
  href: string;
  type: string;
  mediaType: string;
}

export interface BaseEntity {
  id: string;
  accountId: string;
  meta: Meta;
  updated: string;
  name: string;
  description?: string;
  code?: string;
  externalCode?: string;
}

// Товар
export interface Product extends BaseEntity {
  article?: string;
  weight?: number;
  volume?: number;
  price?: number;
  uom?: {
    meta: Meta;
    name: string;
  };
  images?: Array<{
    meta: Meta;
    title: string;
    filename: string;
  }>;
  barcodes?: Array<{
    ean13?: string;
    ean8?: string;
    code128?: string;
  }>;
  buyPrice?: {
    value: number;
    currency: Meta;
  };
  salePrices?: Array<{
    value: number;
    currency: Meta;
    priceType: {
      meta: Meta;
      name: string;
    };
  }>;
  minimumBalance?: number;
  isSerialTrackable?: boolean;
  trackingType?: string;
}

// Контрагент
export interface Counterparty extends BaseEntity {
  companyType: 'legal' | 'individual' | 'entrepreneur';
  email?: string;
  phone?: string;
  fax?: string;
  actualAddress?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  okpo?: string;
  tags?: string[];
  accounts?: Array<{
    id: string;
    accountNumber: string;
    bankName?: string;
    bic?: string;
    correspondentAccount?: string;
  }>;
  contactpersons?: Array<{
    id: string;
    name: string;
    email?: string;
    phone?: string;
    position?: string;
  }>;
}

// Отгрузка (продажа)
export interface Demand extends BaseEntity {
  moment: string;
  applicable: boolean;
  vatEnabled: boolean;
  vatIncluded: boolean;
  sum: number;
  rate?: {
    currency: Meta;
    value: number;
  };
  organization: Meta;
  agent: Meta;
  store?: Meta;
  contract?: Meta;
  project?: Meta;
  state?: Meta;
  positions?: DemandPosition[];
  payments?: Array<{
    meta: Meta;
    sum: number;
    purpose?: string;
  }>;
  overhead?: {
    sum: number;
    distribution: 'weight' | 'volume' | 'price';
  };
}

// Позиция отгрузки
export interface DemandPosition {
  id: string;
  quantity: number;
  price: number;
  discount: number;
  vat: number;
  vatEnabled: boolean;
  assortment: Meta;
  pack?: {
    id: string;
    uom: Meta;
    quantity: number;
  };
}

// Приемка
export interface Supply extends BaseEntity {
  moment: string;
  applicable: boolean;
  vatEnabled: boolean;
  vatIncluded: boolean;
  sum: number;
  rate?: {
    currency: Meta;
    value: number;
  };
  organization: Meta;
  agent: Meta;
  store?: Meta;
  contract?: Meta;
  project?: Meta;
  state?: Meta;
  positions?: SupplyPosition[];
  payments?: Array<{
    meta: Meta;
    sum: number;
    purpose?: string;
  }>;
  overhead?: {
    sum: number;
    distribution: 'weight' | 'volume' | 'price';
  };
}

// Позиция приемки
export interface SupplyPosition {
  id: string;
  quantity: number;
  price: number;
  discount: number;
  vat: number;
  vatEnabled: boolean;
  assortment: Meta;
  pack?: {
    id: string;
    uom: Meta;
    quantity: number;
  };
}

// Организация
export interface Organization extends BaseEntity {
  legalTitle?: string;
  legalAddress?: string;
  actualAddress?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  okpo?: string;
  email?: string;
  phone?: string;
  fax?: string;
  accounts?: Array<{
    id: string;
    accountNumber: string;
    bankName?: string;
    bic?: string;
    correspondentAccount?: string;
  }>;
  isEgaisEnable?: boolean;
  director?: string;
  chiefAccountant?: string;
}

// Склад
export interface Store extends BaseEntity {
  address?: string;
  parent?: Meta;
  pathName?: string;
  zones?: Array<{
    meta: Meta;
    name: string;
    externalCode?: string;
  }>;
}

// Ответы API
export interface ApiResponse<T> {
  context: {
    employee: Meta;
  };
  meta: {
    href: string;
    type: string;
    mediaType: string;
    size?: number;
    limit?: number;
    offset?: number;
  };
  rows?: T[];
}

// Настройки подключения к API
export interface ApiConfig {
  baseURL: string;
  username: string;
  password: string;
  timeout?: number;
}

// Фильтры для запросов
export interface QueryFilters {
  limit?: number;
  offset?: number;
  search?: string;
  filter?: string;
  order?: string;
  expand?: string;
}

// Ошибки API
export interface ApiError {
  error: {
    code: number;
    error: string;
    moreInfo: string;
  };
  errors?: Array<{
    error: string;
    parameter?: string;
    code?: number;
  }>;
}