export interface GeoProps {
    type: string;
    features: Feature[];
}

export interface Feature {
    type: string;
    geometry: Geometry;
    properties: Properties;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    date: string;
    time: string;
    station: string;
    wave_direction: number;
    qf_direction: number;
    wave_hight: number;
    qf_hight: number;
    wave_period: number;
    qf_period: number;
}
