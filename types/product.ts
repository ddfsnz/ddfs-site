import { PortableTextBlock } from "@portabletext/react";

export interface ProductImage {
    asset: {
        _id: string;
        url: string;
    };
}

interface ProductBase {
    _createdAt: string;
    _id: string;
    _originalId: string;
    _rev: string;
    _type: "product";
    _updatedAt: string;
    category: {
        _ref: string;
        _type: "reference";
    };
    code: string;
    company: {
        _ref: string;
        _type: "reference";
        _id: string;
        name: string;
    };
    description: PortableTextBlock[];
    images?: ProductImage[];
    name: string;
    price: number;
    quantity: number[];
    stock: number;
}

export interface Beer extends ProductBase {
    beerOptions: {
        abv?: number;
        container: string;
        quantity: number[];
        size: {
            unit: string;
            value: number;
        };
        style: {
            _ref: string;
            _type: "reference";
            name: string;
        };
    };
}

export interface Cider extends ProductBase {
    ciderOptions: {
        abv: number;
        container: string;
        quantity: number[];
        size: {
            unit: string;
            value: number;
        };
        style: {
            _ref: string;
            _type: "reference";
            name: string;
        };
    };
}

export interface Honey extends ProductBase {
    honeyOptions:
        | {
              quantity: number[];
              style: {
                  _ref: string;
                  _type: "reference";
                  name: string;
              };
          }
        | {
              size: {
                  unit: string;
                  value: number;
              };
              style: {
                  _ref: string;
                  _type: "reference";
                  name: string;
              };
          }
        | {
              mgo: number;
              range: "Core" | "Special";
              size: {
                  unit: string;
                  value: number;
              };
              style: {
                  _ref: string;
                  _type: "reference";
                  name: string;
              };
              umf: number;
          };
}

export interface Liqueur extends ProductBase {
    // Misspelling, needs to be changed in CMS and data migrated
    liquerOptions: {
        abv: number;
        isTravelExclusive?: boolean;
        size: {
            unit: string;
            value: number;
        };
        style: {
            _ref: string;
            _type: "reference";
            name: string;
        };
    };
}

export interface Port extends ProductBase {
    portOptions: {
        abv: number;
        size: {
            unit: string;
            value: number;
        };
        style: {
            _ref: string;
            _type: "reference";
            name: string;
        };
    };
}

export interface Specialty extends ProductBase {
    specialtyOptions: {
        size: {
            unit: string;
            value: number;
        };
        style: {
            _ref: string;
            _type: "reference";
            name: string;
        };
    };
}

export interface Spirit extends ProductBase {
    spiritOptions: {
        abv: number;
        age?: number;
        isExportExclusive?: boolean;
        size: {
            unit: string;
            value: number;
        };
        style?: {
            _ref: string;
            _type: "reference";
            name: string;
        };
    };
}

export interface Tobacco extends ProductBase {
    tobaccoOptions:
        | {
              quantity: number[];
              style: {
                  _ref: string;
                  _type: "reference";
                  name: string;
              };
          }
        | {
              size: {
                  unit: string;
                  value: number;
              };
              style: {
                  _ref: string;
                  _type: "reference";
                  name: string;
              };
          };
}

export interface Wine extends ProductBase {
    wineOptions: {
        abv: number;
        region: string;
        size: {
            unit: string;
            value: number;
        };
        style: {
            _ref: string;
            _type: "reference";
            name: string;
        };
        wineType: string;
        year?: number;
    };
}

export type Product =
    | Beer
    | Cider
    | Honey
    | Liqueur
    | Port
    | Specialty
    | Spirit
    | Tobacco
    | Wine;
