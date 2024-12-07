import React, { useState, useEffect } from "react";
import { SongSearchByNazva, SortOfSongs } from "./Other function/SomeFunction";
import { SongSearch } from "./Other function/SomeFunction";
// import { ReactComponent as IconClose } from "./images/cross-close.svg";
import { Modal, Box } from "@mui/material";

export function HeadBtn({ text }) {
  function handlePlayClick() {
    alert(`Натиснута ${text}`);
  }
  return (
    <div>
      <button className="button" onClick={handlePlayClick}>
        {text}
      </button>
    </div>
  );
}

export function PeopleBtn() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
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
      const response = await fetch(`${apiUrl}/people`);
      const jsonData = await response.json();
      setData(jsonData);
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

  return (
    <div>
      {!showData && (
        <button className='button' onClick={fetchData} disabled={isLoading}>Колектив хору</button>
      )}
      {showData && (
        <>
          <button className='button' onClick={handleHideData}>Приховати список хористів</button>
        </>
      )}
      {isLoading ? (
        <p>Завантаження даних...</p>
      ) : data && showData ? (
        <div>
          <i><h3>Наші хористи:</h3></i>
          <ul>
            {data.map((person, index) => (
              <li className="li-my"
                style={{
                  backgroundColor: 'white'
                }}
                key={index}>{person.first_name} {person.last_name} ({person.tembrname})</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}


export function AllOfSongs() {
  let zapyt = "/ukr";
  let typeOfSong = "Всі пісні";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}


export function SortOfSongGimn() {
  let zapyt = "/gimn";
  let typeOfSong = "Гімни";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}


export function SortOfSongPovstanska() {
  let zapyt = "/povstanska";
  let typeOfSong = "Повстанські";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongBogorodychna() {
  let typeOfSong = "Богородичні";
  let zapyt = "/bogorodychna";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongDoHrysta() {
  let typeOfSong = "До Христа";
  let zapyt = "/dohrysta";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}


export function SortOfSongBoga() {
  let zapyt = "/doboga";
  let typeOfSong = "До Бога";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongStrasni() {
  let zapyt = "/strasni";
  let typeOfSong = "Страсні пісні";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongInshiCerkovni() {
  let zapyt = "/inshi-cerkovni";
  let typeOfSong = "Інші церковні пісні";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongVoskresni() {
  let zapyt = "/voskresni";
  let typeOfSong = "Воскресні";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongNarodni() {
  let zapyt = "/narodni";
  let typeOfSong = "Народні";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongKoljadky() {
  let zapyt = "/koljada";
  let typeOfSong = "Колядки";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongPohoronni() {
  let zapyt = "/pohoron";
  let typeOfSong = "Похоронні";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongShchedrivky() {
  let zapyt = "/shchedra";
  let typeOfSong = "Щедрівки";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongVinshuvannya() {
  let zapyt = "/vinsha";
  let typeOfSong = "Віншування";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function SortOfSongSvustyn() {
  let zapyt = "/svustyn";
  let typeOfSong = "Обробки Р.Свистуна";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}

export function OpenSearchButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <button className='button'
        onClick={handleOpen}
      >
        <i>Пошук пісні по тексту</i>
      </button>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="song-search-title"
          aria-describedby="song-search-description"
        >
          <Box
            sx={{
              position: 'relative',
              p: 4,
          }}
          >
            <SongSearch />
          </Box>
        </Modal>
      </>
    </div>
  );
}

export function OpenSearchByNazvaButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <button className='button'
        onClick={handleOpen}
      >
        <i>Пошук пісні по назві</i>
      </button>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="song-search-title"
          aria-describedby="song-search-description"
        >
          <Box
            sx={{
              position: 'relative',
              p: 4,
          }}
          >
            <SongSearchByNazva />
          </Box>
        </Modal>
      </>
    </div>
  );
}