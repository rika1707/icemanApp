import type { GeojsonProps } from "../interface/geojson.interface";
import Oleaje20172018 from '../data/oleaje_velocity.json'
import Oleaje20182019 from '../data/oleaje_2018.json'

const arrayDataWaves: GeojsonProps[] = [
    {
        rangeDate: '2017 - 2018',
        fileName: 'Oleajes 2017 - 2018',
        geojson: Oleaje20172018 as any
    },
    {
        rangeDate: '2018 - 2019',
        fileName: 'Oleajes 2018 - 2019',
        geojson: Oleaje20182019 as any
    }
]

export function getWaves(data: GeojsonProps | undefined): GeojsonProps[] {
    const listWaves: GeojsonProps[] = arrayDataWaves
    if (data) {
        listWaves.push(data)
    }

    return listWaves
}