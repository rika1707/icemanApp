import type { GeojsonProps, ListGeojsonProps } from "../interface/geojson.interface"
import ItemGeo from "./ItemGeo"

import { getDepth } from "../request/get-depth";
import CircularIndeterminate from "./modals/CircularProgress";
import { useQuery } from "@tanstack/react-query";


const ListDataGeo = ({ isWavesActive, isWindsActive, map }: ListGeojsonProps) => {


    const { data: winds, isLoading } = useQuery<GeojsonProps[] | null>({
        queryKey: ['windsData', isWindsActive],
        queryFn: getDepth,
    })

    return (isWavesActive || isWindsActive) && (
        <div className="h-56 overflow-auto bg-slate-200 text-black p-2 flex gap-1 flex-wrap">
            {isLoading && CircularIndeterminate()}
            {winds?.map((wind: GeojsonProps) => (
                <ItemGeo key={wind.fileName} {...wind} map={map} markerShape="circle-blue" />
            ))}
        </div>
    )
}

export default ListDataGeo
