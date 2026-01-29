
import Box from '@mui/material/Box';

export default function HeaderImagesBar() {
    return (
        <>
            {/* Sección 1: Govco */}
            <Box
                sx={{
                    width: '100%',
                    minHeight: '60px',
                    maxHeight: '60px',
                    background: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderBottom: '1px solid #e0e0e0',
                    py: 1,
                }}
            >
                <Box sx={{ height: '50px', width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                    <a href="https://www.gov.co/" target="_blank" rel="noopener noreferrer">
                        <img
                            src={"/src/assets/img/logo_govco1.png"}
                            alt="Logo Govco"
                            style={{ maxHeight: '50px', maxWidth: '120px', objectFit: 'contain', display: 'block' }}
                        />
                    </a>
                </Box>
            </Box>
            {/* Sección 2: Defensa y Dimar */}
            <Box
                sx={{
                    width: '100%',
                    minHeight: '80px',
                    maxHeight: '80px',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 4,
                    borderBottom: '1px solid #e0e0e0',
                    py: 1,
                }}
            >
                <Box sx={{ height: '70px', width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                    <a href="https://www.mindefensa.gov.co/" target="_blank" rel="noopener noreferrer">
                        <img
                            src={"/src/assets/img/defensa-m.png"}
                            alt="Defensa"
                            style={{ maxHeight: '70px', maxWidth: '120px', objectFit: 'contain', display: 'block' }}
                        />
                    </a>
                </Box>
                <Box sx={{ height: '70px', width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                    <a href="https://www.dimar.mil.co/" target="_blank" rel="noopener noreferrer">
                        <img
                            src={"/src/assets/img/dimar-negro.png"}
                            alt="Dimar"
                            style={{ maxHeight: '70px', maxWidth: '310px', objectFit: 'contain', display: 'block' }}
                        />
                    </a>
                </Box>
            </Box>
        </>
    );
}
