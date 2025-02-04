import { useState } from "react";
import axios from "axios";
import { Dialog, IconButton } from "@mui/material";
// import { useNavigate } from "react-router-dom";

export function Nagorody({ apiUrl }) {
  let [nagoroda, setNagoroda] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [showNagoroda, setShowNagoroda] = useState(false);
  // let navigate = useNavigate();


  const fetchNagorody = async () => {
    setIsLoading(true);
    // navigate('/nagoroda');
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
                <li className='li-my'
                  style={{
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