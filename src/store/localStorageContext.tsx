// LocalStorageContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import useShowModal from "../component/hooks/useShowModal";
import type { Feature, GeoJsonProperties, Geometry } from "geojson";

interface ModalProps {
    modalOpen: boolean;
    selectedData: Feature<Geometry, GeoJsonProperties> | null;
    handleFeatureClick: (feature: Feature) => void;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LocalStorageContextType {
    value: string;
    setValue: (newValue: string) => void;
    modal: ModalProps
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
    const [value, setValueState] = useState(() => localStorage.getItem("user") ?? "");
    const modal = useShowModal()

    const setValue = (newValue: string) => {
        setValueState(newValue);
        localStorage.setItem("user", newValue);
        // Dispara un evento custom para sincronizar dentro de la misma pestaña
        window.dispatchEvent(new Event("local-storage"));
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "user") {
                setValueState(event.newValue ?? "");
            }
        };

        const handleCustomChange = () => {
            setValueState(localStorage.getItem("user") ?? "");
        };

        // Escucha cambios en otras pestañas y en la misma
        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("local-storage", handleCustomChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("local-storage", handleCustomChange);
        };
    }, []);

    return (
        <LocalStorageContext.Provider value={{ value, setValue, modal }}>
            {children}
        </LocalStorageContext.Provider>
    );
};

// Hook para usar el contexto
export const useLocalStorageContext = () => {
    const ctx = useContext(LocalStorageContext);
    if (!ctx) {
        throw new Error("useLocalStorageContext debe usarse dentro de LocalStorageProvider");
    }
    return ctx;
};
