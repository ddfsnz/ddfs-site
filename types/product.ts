export interface Product {
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
    };
    name: string;
    price: number;
    quantity: number[];
    stock: number;
}

export interface Beer extends Product {
    beerOptions: {
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
        };
    };
}

export interface Cider extends Product {
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
        };
    };
}

export interface Honey extends Product {
    honeyOptions:
        | {
              quantity: number[];
              style: {
                  _ref: string;
                  _type: "reference";
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
              };
              umf: number;
          };
}

export interface Liquer extends Product {
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
        };
    };
}

export interface Port extends Product {
    portOptions: {
        abv: number;
        size: {
            unit: string;
            value: number;
        };
        style: {
            _ref: string;
            _type: "reference";
        };
    };
}

export interface Spirit extends Product {
    spiritOptions: {
        abv: number;
        age?: number;
        isExportExclusive?: boolean;
        size: {
            unit: string;
            value: number;
        };
        style: {
            _ref: string;
            _type: "reference";
        };
    };
}

export interface Tobacco extends Product {
    tobaccoOptions:
        | {
              quantity: number[];
              style: {
                  _ref: string;
                  _type: "reference";
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
              };
          };
}

export interface Wine extends Product {
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
        };
        wineType: string;
        year?: number;
    };
}
