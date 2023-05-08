export interface Feature {
    name: string;
    age?: number;
}

export interface FeatureDocument extends Feature {
    _id: string;
}
