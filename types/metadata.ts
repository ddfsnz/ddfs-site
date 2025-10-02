export interface Company {
    _createdAt: string;
    _id: string;
    _originalId: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    category: {
        _ref: string;
        _type: string;
    };
    country: {
        _ref: string;
        _type: string;
    };
    name: string;
}

export interface Style {
    _createdAt: string;
    _id: string;
    _originalId: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    category: {
        _ref: string;
        _type: string;
    };
    name: string;
    type: string;
}
