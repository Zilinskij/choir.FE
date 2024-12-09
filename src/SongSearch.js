import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

import { ScrollSong } from "./ScrollSong";

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
              <li className='li-my'
                key={result.id}
                style={{
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1em',
                  backgroundColor: 'white'
                }} onClick={() => handleSongClick(result.id, result.value)}>
                {result.value}
              </li>
            </span>
          ))}
        </ol>
      </div>
      {error && <p>{error}</p>}

      <ScrollSong isOpen={isModalOpen} handleClose={handleCloseModal} nazva={selectedSong} text={songText} />

    </div>
  );
}