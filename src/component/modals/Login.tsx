import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    Box,
    Modal
} from "@mui/material";

interface LoginProps {
    open: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormData = {
    user: string;
    password: string;
};

export default function Login({ open, onClose }: Readonly<LoginProps>) {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log("Nombre de usuario:", data.user);
        console.log("contraseña:", data.password);
        localStorage.setItem('user', data.user)
        reset()
        onClose(false)
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
                {/* Campo: Nombre de usuario */}
                <TextField
                    label="Usuario"
                    {...register("user", { required: true })}
                    fullWidth
                />
                {/* Campo: contraseña */}
                <TextField
                    type="password"
                    label="Contraseña"
                    {...register("password", { required: true })}
                    fullWidth
                />
                {/* Botón enviar */}
                <Button variant="contained" type="submit">
                    Enviar datos
                </Button>
            </Box>
        </Modal>
    );
}
