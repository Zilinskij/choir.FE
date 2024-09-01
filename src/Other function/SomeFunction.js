import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
// import { CloseIcon } from '@chakra-ui/icons';

let StyledDialogContentText = styled('div')(({ theme }) => ({
  backgroundColor: 'white',  // Приклад: світло-сірий фон
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

let SongText = styled('pre')(({ fontSize }) => ({
  fontSize: `${fontSize}px`,
  color: 'black',
  whiteSpace: 'pre-wrap',  // Текст переноситься відповідно до ширини контейнера
  marginTop: '0.5em',
}));

let ButtonNoty = ({ onClick, nazva }) => {
  return (
    <button className="button-noty"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }} style={{ marginLeft: '1em' }}>
      {nazva}
    </button>
  );
};

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
  const [fontSize, setFontSize] = useState(18);

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
    setSearchTerm('');
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
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        style={{
          width: '40%',
          marginRight: '2%',
          height: '2.5em',
          marginBotton: '3em',
          borderRadius: '0.5em',
          fontSize: '1.2em'
        }} />
      <Button onClick={() => {
        handleSearch();
      }}
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
      <div style={{ position: 'relative' }}>
        <ol>
          {searchResults.map((result) => (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}>
              <li key={result.id}
                style={{
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1em',
                  backgroundColor: 'white'
                }} onClick={() => handleSongClick(result.id, result.value)}>
                {result.value}
              </li>
              <ButtonNoty onClick={() => handleNoteClick(result.value)} nazva="ноти" />
            </span>
          ))}
        </ol>
      </div>
      {error && <p>{error}</p>}

      <ScrollSong isOpen={isModalOpen} handleClose={handleCloseModal} nazva={selectedSong} text={songText} />

    </div>
  );
}

export function SortOfSongs({ zapyt, typeOfSong }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [selectedNazva, setSelectedNazva] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const apiUrl = process.env.REACT_APP_API_URL;

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

      const dataWithNotes = await Promise.all(
        jsonData.map(async (item) => {
          const notesResponse = await axios.post(`${apiUrl}/get-notes`, { nazva: item.nazva });
          return { ...item, hasNotes: notesResponse.data.notes };
        })
      );

      setData(dataWithNotes);
      setShowData(true);
      localStorage.setItem('isDataFetched', true);
    } catch (error) {
      console.error('Помилка під час отримання даних:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const totalPages = Math.ceil(data.length / itemsPerPage);
  let firstIndex = (currentPage - 1) * itemsPerPage;
  let lastIndex = currentPage * itemsPerPage;

  const currentPageData = data.slice(
    firstIndex,
    lastIndex
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {!showData && (
        <button
          className='button'
          onClick={fetchData}
          disabled={isLoading}
        >
          {typeOfSong}
        </button>
      )}
      {showData && (
        <>
          <div>
            <Dialog
              open={showData}
              fullScreen
              PaperProps={{
                style: {
                  backgroundColor: '#FFFAFA'
                }
              }}
            >
              <IconButton
                onClick={handleHideData}
                size='small'
                style={{
                  borderRadius: '0.3em',
                  backgroundColor: '#b5e1f5',
                  color: '#050505',
                  boxShadow: '0em 0em 0.15em 0.15em #b7d9e8',
                  position: 'absolute',
                  right: '1em',
                  top: '0.5em'
                }}
              >Назад
              </IconButton>
              <ul style={{ listStyleType: 'none' }}>
                {currentPageData.map((item, index) => (
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center'
                    }}
                    key={index}
                  >
                    <li
                      onClick={() => handleSongClick(index, item.nazva, item.text)}
                      style={{
                        fontWeight: '600',
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        width: 'auto',
                        fontSize: '1em'
                      }}
                    >
                      {index + 1 + (currentPage - 1) * itemsPerPage}. {item.nazva}
                    </li>
                    {item.hasNotes && (
                      <ButtonNoty
                        nazva='ноти'
                        onClick={() => handleNoteClick(item.nazva)}
                      />
                    )}
                  </span>
                ))}
              </ul>
              <div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                    style={{
                      margin: '5px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      backgroundColor: page === currentPage ? '#CD853F' : '#FFF8DC',
                      borderRadius: '5px',
                      color: page === currentPage ? '#FFFAFA' : '#000000'
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </Dialog>
          </div>
        </>
      )}
      {isLoading && <p>Завантаження даних...</p>}
      {selectedSongIndex !== null && (
        <ScrollSong
          isOpen={selectedSongIndex !== null}
          handleClose={handleCloseModal}
          nazva={selectedNazva}
          text={selectedText}
        />
      )}
    </div>
  );
}

export function Videos({ apiUrl }) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showVideos, setShowVideos] = useState(false);


  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/videos`);
      setVideos(response.data);
      setShowVideos(true);
    } catch (error) {
      console.error('Помилка під час отримання відеофайлів:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHideVideos = () => {
    setShowVideos(false);
  };

  const handleVideoClick = async (nazva) => {
    try {
      const response = await axios.post(`${apiUrl}/video-files`, { nazva });
      if (response.data.video) {
        window.location.href = response.data.video;
      } else {
        alert('Відео не знайдено');
      }
    } catch (error) {
      console.error('Помилка отримання відео:', error);
      alert('Виникла помилка під час отримання відео');
    }
  };

  return (
    <div>
      {!showVideos && (
        <button className='button'
          onClick={fetchVideos} disabled={isLoading}>
          Відеофайли
        </button>
      )}
      {showVideos && (
        <>
          <button className='button'
            onClick={handleHideVideos}>
            Приховати список відеофайлів
          </button>
          <ol>
            {videos.map((video, index) => (
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
                key={index}>
                <li
                  style={{
                    fontWeight: '600',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    width: 'auto',
                    fontSize: '1em',
                    marginBottom: '5px'
                  }}
                  onClick={() => handleVideoClick(video.namevideo)}>
                  {video.namevideo}
                </li>
              </span>
            ))}
          </ol>
        </>
      )}
      {isLoading && <p>Завантаження відеофайлів...</p>}
    </div>
  );
}

export function Nagorody({ apiUrl }) {
  let [nagoroda, setNagoroda] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [showNagoroda, setShowNagoroda] = useState(false);


  const fetchNagorody = async () => {
    setIsLoading(true);
    try {
      let response = await axios.get(`${apiUrl}/nagorody`);
      setNagoroda(response.data);
      setShowNagoroda(true);
    } catch (error) {
      console.error('Помилка під час отримання файлів "Нагороди":', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNagorodaClick = async (nazva) => {
    try {
      let response = await axios.post(`${apiUrl}/nagoroda-files`, { nazva });
      if (response.data.nagoroda) {
        window.location.href = response.data.nagoroda;
      } else {
        alert('Нагороду не знайдено')
      }
    } catch (error) {
      console.error('Помилка під час отримання файлу:', error);
      alert('Виникла помилка під час отримання файлу')
    }
  }

  let handleHightNagoroda = () => {
    setShowNagoroda(false);
  }

  return (
    <div>
      {!showNagoroda && (
        <button className='button'
          onClick={fetchNagorody} disabled={isLoading}>
          Наші нагороди
        </button>
      )}
      <>
        <Dialog
          open={showNagoroda}
          fullScreen
          PaperProps={{
            style: {
              backgroundColor: '#FFFAFA'
            }
          }}
        >
         <IconButton
            onClick={handleHightNagoroda}
            size='small'
            style={{
              borderRadius: '0.3em',
              backgroundColor: '#b5e1f5',
              color: '#050505',
              boxShadow: '0em 0em 0.15em 0.15em #b7d9e8',
              position: 'absolute',
              right: '1em',
              top: '0.5em'
            }}
          >Назад
          </IconButton>
          <ol>
            {nagoroda.map((nagoroda, index) => (
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
                key={index}>
                <li style={{
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  width: 'auto',
                  fontSize: '1em',
                  marginBottom: '5px'
                }}
                  onClick={() => handleNagorodaClick(nagoroda.namenagoroda)}>
                  {nagoroda.namenagoroda}
                </li>
              </span>
            ))}
          </ol>
        </Dialog>
      </>
      {isLoading && <p>Завантаження файлів...</p>}
    </div>
  )
};

export function Fotos({ apiUrl }) {
  let [foto, setFoto] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [showFoto, setShowFoto] = useState(false);


  const fetchFoto = async () => {
    setIsLoading(true);
    try {
      let response = await axios.get(`${apiUrl}/foto`);
      setFoto(response.data);
      setShowFoto(true);
    } catch (error) {
      console.error('Помилка під час отримання файлів "Фото":', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFotoClick = async (nazva) => {
    try {
      let response = await axios.post(`${apiUrl}/foto-files`, { nazva });
      if (response.data.foto) {
        window.location.href = response.data.foto;
      } else {
        alert('Фото не знайдено')
      }
    } catch (error) {
      console.error('Помилка під час отримання файлу:', error);
      alert('Виникла помилка під час отримання файлу')
    }
  }

  let handleHightFoto = () => {
    setShowFoto(false);
  }

  return (
    <div>
      {!showFoto && (
        <button className='button'
          onClick={fetchFoto} disabled={isLoading}>
          Наші фотографії
        </button>
      )}
      <>
        <Dialog
          open={showFoto}
          fullScreen
          PaperProps={{
            style: {
              backgroundColor: '#FFFAFA'
            }
          }}
        >
         <IconButton
            onClick={handleHightFoto}
            size='small'
            style={{
              borderRadius: '0.3em',
              backgroundColor: '#b5e1f5',
              color: '#050505',
              boxShadow: '0em 0em 0.15em 0.15em #b7d9e8',
              position: 'absolute',
              right: '1em',
              top: '0.5em'
            }}
          >Назад
          </IconButton>
          <ol>
            {foto.map((foto, index) => (
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
                key={index}>
                <li style={{
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  width: 'auto',
                  fontSize: '1em',
                  marginBottom: '5px'
                }}
                  onClick={() => handleFotoClick(foto.namefotos)}>
                  {foto.namefotos}
                </li>
              </span>
            ))}
          </ol>
        </Dialog>
      </>
      {isLoading && <p>Завантаження файлів...</p>}
    </div>
  )
};