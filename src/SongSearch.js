import { useState } from "react";
import axios from "axios";
import { Button, List, Box, ListItem, ListItemText, Typography } from "@mui/material";

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
      setSearchResults(response.data);
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

  const handleSongClick = async (songId) => {
    try {
      const response = await axios.post(`${apiUrl}/search-song-text`, { searchTerm: songId });
      setSelectedSong(songId);
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
      <Box
        sx={{
          width: '100%',
          height: '100%',
          padding: '3px 6px',
          borderRadius: '0.5em',
          bgcolor: 'background.paper',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
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
            width: '70%',
            height: '1.8em',
            borderRadius: '6px',
            fontSize: '1.2em',
            margin: '0px 3px'
          }}
        />
        <Button onClick={() => {
          handleSearch();
        }}
          size="small"
          variant="outlined"
          disabled={isSearching}
          sx={{
            color: 'green',
            backgroundColor: 'lightgreen',
            margin: '0px 3px'

          }}>
          Пошук
        </Button>
        <Button
          onClick={() => { clearResults() }}
          size="small"
          variant="outlined"
          disabled={isSearching}
          sx={{
            color: 'red',
            margin: '0px 3px',
            backgroundColor: 'pink'
          }}>
          Очистити
        </Button>
      </Box>
      {isSearching}
      <Box
        sx={{
          marginTop: '0.5em',
          width: '100%',
          height: '100%',
          padding: '10px',
          borderRadius: '0.5em',
          bgcolor: 'background.paper',
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
      >
        <List
          sx={{
            listStyleType: 'disc',
          }}
          component='ul'>
          {searchResults.map((result, index) => (
            <ListItem
              key={index}
              onClick={() => handleSongClick(result.nazvapisni, result.typepisni, result.dzerelo)}
              sx={{
                border: '0.1em solid lightgrey',
                borderRadius: '6px',
                boxShadow: "0em 0em 0.15em 0.15em lightgrey",
                marginBottom: '0.5em',
                cursor: 'pointer',
                ':hover': { bgcolor: 'action hever' }
              }}>
              <ListItemText
                primary={
                  <>
                    <Typography
                      sx={{
                        fontSize: '1em',
                        fontWeight: 'bold'
                    }}>
                    {`${index + 1}. ${result.nazvapisni} - `}
                    </Typography>
                    <Typography
                      component='span'
                      sx={{
                        fontStyle: 'italic',
                        fontSize: '0.8em'
                      }}
                    >
                      "{result.typepisni}"
                      {result.dzherelo && ` - "${result.dzherelo}"`}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {error && <p>{error}</p>}

      <ScrollSong isOpen={isModalOpen} handleClose={handleCloseModal} nazva={selectedSong} text={songText} />

    </div>
  );
} 