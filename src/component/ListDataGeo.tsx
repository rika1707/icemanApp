import ItemGeo from "./ItemGeo"


const ListDataGeo = () => {
    return (
        <div className="h-72 overflow-auto bg-slate-300 text-black p-2 flex gap-1 flex-wrap">
            {Array(10).fill(null).map((_, idx) => <ItemGeo key={idx} />)}
        </div>
    )
}

export default ListDataGeo
