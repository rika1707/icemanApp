import type { Feature } from 'geojson';
import { useState } from 'react'

const useShowModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<Feature | null>(null);
    const handleFeatureClick = (feature: Feature) => {
        setSelectedData(feature);
        setModalOpen(true);
    };
    return {
        modalOpen,
        selectedData,
        handleFeatureClick,
        setModalOpen
    }
}

export default useShowModal
