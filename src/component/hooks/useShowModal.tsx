import type { Feature } from 'geojson';
import { useState } from 'react'

const useShowModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<Feature | null>(null);
    const [relatedFeatures, setRelatedFeatures] = useState<Feature[]>([]);

    const handleFeatureClick = (feature: Feature, allFeatures?: Feature[]) => {
        setSelectedData(feature);
        if (allFeatures) {
            setRelatedFeatures(allFeatures);
        } else {
            setRelatedFeatures([feature]);
        }
        setModalOpen(true);
    };

    return {
        modalOpen,
        selectedData,
        relatedFeatures,
        handleFeatureClick,
        setModalOpen
    }
}

export default useShowModal
