import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Dialog, IconButton } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

import { ButtonNoty } from './Buttons';
const apiUrl = process.env.REACT_APP_API_URL;



export function ScrollSong({ isOpen, handleClose, nazva, text }) {

    const [scroll] = useState('paper');
    const [fontSize, setFontSize] = useState(18);
    const [iHaveNoty, setIHaveNoty] = useState(false);

    const increaseFontSize = () => {
        setFontSize(prevSize => Math.min(prevSize + 2, 28));
    };

    const decreaseFontSize = () => {
        setFontSize(prevSize => Math.max(prevSize - 2, 14));
    };

    const descriptionElementRef = useRef(null);

    let StyledDialogContentText = styled('div')(({ theme }) => ({
        backgroundColor: 'white',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    }));

    let SongText = styled('pre')(({ fontSize }) => ({
        fontSize: `${fontSize}px`,
        color: 'black',
        whiteSpace: 'pre-wrap',
        marginTop: '0.5em',
    }));

    const checkIsHavNotes = async (nazva) => {
        try {
            if (!nazva) return;
            const response = await axios.post(`${apiUrl}/check-notes`, { nazva });
            setIHaveNoty(response.data.iHaveNoty || false);
        } catch (error) {
            console.log('Помилка перевірки нот', error);
        }
    }

    useEffect(() => {
        if (isOpen) {
            checkIsHavNotes(nazva)
        }
    })

    const handleNoteClick = async (nazva) => {
        try {
            if (!nazva) {
                alert('Назви не знайшов');
                return;
            }
            const response = await axios.post(`${apiUrl}/get-notes`, { nazva });
            if (response.data.notes) {
                window.location.href = response.data.notes;
            } else {
                alert('Ноти не знайдено');
            }
        } catch (error) {
            console.error('Помилка отримання нот:', error);
            alert('Виникла помилка під час отримання нот');
        }
    };


    useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{
                style: {
                    margin: 0,
                    padding: 0,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '100%',
                    height: '100%',
                    color: 'red'
                }
            }}
        >
            <DialogActions fontSize={fontSize}
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '0.3em',
                    backgroundColor: '#FFFAFA'
                }}>
                <Typography variant="h6"
                >
                    <i>{nazva}</i>
                </Typography>
                {iHaveNoty && <ButtonNoty onClick={() => handleNoteClick(nazva)} nazva="ноти" />}
                <IconButton onClick={increaseFontSize}
                    size='small'
                    style={{
                        borderRadius: '0.3em',
                        backgroundColor: '#facdac',
                        color: '#050505',
                        boxShadow: '0em 0em 0.15em 0.15em #facf9b'
                    }}
                >АА ++</IconButton>
                <IconButton onClick={decreaseFontSize}
                    size='small'
                    style={{
                        borderRadius: '0.3em',
                        backgroundColor: '#facdac',
                        color: '#050505',
                        boxShadow: '0em 0em 0.15em 0.15em #facf9b'
                    }}
                >аа --</IconButton>
                <IconButton onClick={handleClose} color="primary"
                    size='small'
                    style={{
                        borderRadius: '0.3em',
                        backgroundColor: '#b5e1f5',
                        color: '#050505',
                        boxShadow: '0em 0em 0.15em 0.15em #b7d9e8'
                    }}
                >Назад</IconButton>
            </DialogActions>
            <DialogContent dividers={scroll === 'paper'}
                style={{
                    padding: '0em 1em'
                }}
            >
                <StyledDialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <SongText fontSize={fontSize}>
                        {text}
                    </SongText>
                </StyledDialogContentText>
            </DialogContent>
        </Dialog>
    );
}
