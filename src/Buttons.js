import { useState } from "react";
import { Modal, Box } from "@mui/material";

import { SongSearch } from "./SongSearch";
import { SortOfSongs } from "./SortOfSongs";

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

export function ButtonNoty({ onClick, nazva }) {
  return (
    <button className="button-noty"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }} style={{ marginLeft: '1em' }}>
      {nazva}
    </button>
  )
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