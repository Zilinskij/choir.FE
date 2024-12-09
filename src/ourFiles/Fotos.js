import React, { useState} from 'react';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { IconButton } from '@mui/material';



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
                <li className='li-my'
                  style={{
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