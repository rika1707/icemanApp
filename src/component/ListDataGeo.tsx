import { useEffect, useState } from "react";
import type { GeojsonProps, ListGeojsonProps } from "../interface/geojson.interface"
import ItemGeo from "./ItemGeo"
import { getWaves } from "../request/get-waves";
import { getWinds } from "../request/get-winds";


const ListDataGeo = ({ isWavesActive, isWindsActive, map }: ListGeojsonProps) => {
    const [Waves, setWaves] = useState<GeojsonProps[]>()
    const [winds, setWinds] = useState<GeojsonProps[]>()

    useEffect(() => {
        if (isWavesActive) {
            setWaves(getWaves(undefined))
            setWinds(undefined)
        } else {
            setWaves(undefined)
        }
        if (isWindsActive) {
            setWinds(getWinds(undefined))
            setWaves(undefined)
        } else {
            setWinds(undefined)
        }

    }, [isWavesActive, isWindsActive]);
    return (isWavesActive || isWindsActive) && (
        <div className="h-56 overflow-auto bg-slate-200 text-black p-2 flex gap-1 flex-wrap">
            {Waves?.map((wave: GeojsonProps) => (
                <ItemGeo key={wave.fileName} {...wave} map={map} markerShape="circle" />
            ))}
            {winds?.map((wind: GeojsonProps) => (
                <ItemGeo key={wind.fileName} {...wind} map={map} markerShape="square" />
            ))}
        </div>
    )
}

export default ListDataGeo
