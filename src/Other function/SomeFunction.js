import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ButtonNoty } from '../Components/component';

let StyledDialogContentText = styled('div')(({ theme }) => ({
  backgroundColor: 'white',  // Приклад: світло-сірий фон
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

let SongText = styled('pre')(({ fontSize }) => ({
  fontSize: `${fontSize}px`,
  color: 'black',  // Приклад: темно-сірий текст
  whiteSpace: 'pre-wrap',  // Текст переноситься відповідно до ширини контейнера
  marginTop: '2em',
}));

export function SongModal({ isOpen, handleClose, nazva, text }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className='close-button' onClick={handleClose}>Закрити</button>
        <h2>{nazva}</h2>
        <pre>{text}</pre>
      </div>
    </div>
  );
}

export function ScrollSong({ isOpen, handleClose, nazva, text }) {
  const [scroll] = useState('paper');
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 2, 28));
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 14));
  };

  const descriptionElementRef = useRef(null);

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
      PaperProps={{ style: { margin: 0, maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%' } }}
    >
      <DialogContent dividers={scroll === 'paper'}>
        <StyledDialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Typography variant="h6">
            <i>{nazva}</i>
          </Typography>
          <SongText fontSize={fontSize}>
            {text}
          </SongText>
        </StyledDialogContentText>
      </DialogContent>
      <DialogActions fontSize={fontSize}>
        <IconButton onClick={increaseFontSize}>+</IconButton>
        <IconButton onClick={decreaseFontSize}>-</IconButton>
        <IconButton onClick={handleClose} color="primary">Назад</IconButton>
      </DialogActions>
    </Dialog>
  );
}

export function SongSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songText, setSongText] = useState('');
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Введіть текст пісні');
      return;
    }
    setIsSearching(true);
    try {
      const response = await axios.post(`${apiUrl}/search-nazva`, { searchTerm });
      setSearchResults(response.data.map((value, index) => ({ id: `nazva-${index}`, value })));
      setSelectedSong(null);
      setSongText('');
      setError('');
    } catch (error) {
      console.error('Помилка:', error);
      clearResults();
      setError('Файл не знайдено');
    } finally {
      setIsSearching(false);
    }
  };

  const clearResults = () => {
    setSearchResults([]);
  };

  const handleSongClick = async (songId, songName) => {
    try {
      const response = await axios.post(`${apiUrl}/search-song-text`, { searchTerm: songName });
      setSelectedSong(songName);
      setSongText(response.data[0]);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Помилка отримання тексту пісні:', error);
      setError('Не вдалося отримати текст пісні');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSong(null);
    setSongText('');
  };

  return (
    <div>
      <TextField
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        sx={{ width: '60%', marginRight: '2%', height: '4em' }}
      />
      <Button onClick={() => { clearResults(); handleSearch(); }}
        size="small"
        variant="outlined"
        disabled={isSearching}
        sx={{ color: 'green', backgroundColor: 'lightgreen' }}>
        Пошук
      </Button>
      <Button
        onClick={() => { clearResults() }}
        size="small"
        variant="outlined"
        disabled={isSearching}
        sx={{ marginLeft: '2%', color: 'red', backgroundColor: 'pink' }}>
        Очистити
      </Button>
      {isSearching && <p>Зачекайте, результати шукаються...</p>}
      <ol>
        {searchResults.map((result) => (
          <li key={result.id} style={{ cursor: 'pointer' }} onClick={() => handleSongClick(result.id, result.value)}>
            {result.value}
          </li>
        ))}
      </ol>
      {error && <p>{error}</p>}

      <ScrollSong isOpen={isModalOpen} handleClose={handleCloseModal} nazva={selectedSong} text={songText} />
    </div>
  );
}

export function SortOfSongs({ zapyt, typeOfSong }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [selectedNazva, setSelectedNazva] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  // const [error, setError] = useState('');

  useEffect(() => {
    const isDataFetched = localStorage.getItem('isDataFetched');
    if (isDataFetched) {
      setShowData(false);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}${zapyt}`);
      const jsonData = await response.json();
      setData(jsonData);
      setShowData(true);
      localStorage.setItem('isDataFetched', true);
    } catch (error) {
      console.error('Помилка під час отримання даних:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleHideData = () => {
    setShowData(false);
  };

  const handleSongClick = (index, nazva, text) => {
    setSelectedSongIndex(index);
    setSelectedNazva(nazva);
    setSelectedText(text);
  };

  const handleCloseModal = () => {
    setSelectedSongIndex(null);
    setSelectedNazva('');
    setSelectedText('');
  };

  const handleNoteClick = async (nazva) => {
    try {
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

  return (
    <div>
      {!showData && (
        <button
          style={{ cursor: 'pointer' }}
          className='button'
          onClick={fetchData} disabled={isLoading}>
          {typeOfSong}
        </button>
      )}
      {showData && (
        <>
          <button
            style={{ cursor: 'pointer' }}
            className='button' onClick={handleHideData}>
            Приховати список пісень "<i>{typeOfSong}"</i>
          </button>
        </>
      )}
      {isLoading ? (
        <p>Завантаження даних...</p>
      ) : data && showData ? (
        <div>
          <i>
            <h3>Список пісень:</h3>
          </i>
          <div style={{ position: 'relative' }}>
            <ol>
              {data.map((item, index) => (
                <span
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  key={index}
                  onClick={() => handleSongClick(index, item.nazva, item.text)}>
                  <li style={{flex: 1}}>{item.nazva}</li>
                  <ButtonNoty nazva='ноти' onClick={() => handleNoteClick(item.nazva)} />
                </span>))}
            </ol>
          </div>
          <ScrollSong isOpen={selectedSongIndex !== null}
            handleClose={handleCloseModal}
            nazva={selectedNazva}
            text={selectedText} />
        </div>
  ) : null
}
    </div >
  );
}