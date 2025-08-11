import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    IconButton,
    Typography,
    Modal
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useRef } from "react";
import { excelToJson } from "../../utils/convertXlxToJson";

interface FormProps {
    open: boolean;
    onClose: () => void;
}

const handleFileUpload = async (e: any) => {
    const file = e;
    if (!file) return;

    try {
        const jsonData = await excelToJson(file);
        console.log("Datos en JSON:", jsonData);
    } catch (error) {
        console.error("Error al convertir Excel a JSON", error);
    }
};

type FormData = {
    fileName: string;
    yearRange: string;
    excelFile: FileList;
};

export default function UploadForm({ open, onClose }: Readonly<FormProps>) {
    const { register, handleSubmit, control, reset, watch } = useForm<FormData>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const excelFile = watch("excelFile");

    const yearRanges = Array.from({ length: 12 }, (_, i) => {
        const start = 2017 + i;
        return `${start}-${start + 1}`;
    });

    const onSubmit = (data: FormData) => {
        console.log("Nombre de archivo excel:", data.fileName);
        console.log("Rango de años:", data.yearRange);
        console.log("Archivo Excel:", data.excelFile?.[0]);
        handleFileUpload(data.excelFile?.[0])
        reset()
        onClose()
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };
    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 340,
        borderRadius: 2,
        color: '#8c8888',
        boxShadow: 24,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#f5f5f5",
    };

    return (
        <Modal open={open} onClose={onClose} >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={style}
            >
                {/* Campo: Nombre de archivo */}
                <TextField
                    label="Nombre de archivo"
                    {...register("fileName", { required: true })}
                    fullWidth
                />

                {/* Select: Rango de años */}
                <FormControl fullWidth>
                    <InputLabel>Año</InputLabel>
                    <Controller
                        name="yearRange"
                        control={control}
                        defaultValue="2024-2025"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select {...field} label="Año">
                                {yearRanges.map((range) => (
                                    <MenuItem key={range} value={range}>
                                        {range}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>

                {/* Carga de archivo */}
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                        sx={{ backgroundColor: "#1976d2", color: "#fff" }}
                        onClick={handleFileClick}
                    >
                        <FileUploadIcon />
                    </IconButton>
                    <Typography
                        variant="body2"
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 335 // ajusta según tu diseño
                        }}
                    >{excelFile?.[0]?.name || "Subir archivo Excel"}</Typography>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        {...register("excelFile", { required: true })}
                        ref={(e) => {
                            register("excelFile").ref(e);
                            fileInputRef.current = e;
                        }}
                        hidden
                    />
                </Box>

                {/* Botón enviar */}
                <Button variant="contained" type="submit">
                    Enviar datos
                </Button>
            </Box>
        </Modal>
    );
}
