import type { GeojsonProps } from "../interface/geojson.interface";
import Vientos20172018 from '../data/viento_antartico.json'
import Vientos20182019 from '../data/vientos_2018.json'

const arrayDataWinds: GeojsonProps[] = [
    {
        rangeDate: '2017 - 2018',
        fileName: 'Vientos 2017 - 2018',
        geojson: Vientos20172018 as any
    },
    {
        rangeDate: '2018 - 2019',
        fileName: 'Vientos 2018 - 2019',
        geojson: Vientos20182019 as any
    }
]

export function getWinds(data: GeojsonProps | undefined): GeojsonProps[] {
    const listWinds: GeojsonProps[] = arrayDataWinds
    if (data) {
        listWinds.push(data)
    }

    return listWinds
}