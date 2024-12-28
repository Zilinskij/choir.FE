import { useState } from "react";
import { Modal, Box } from "@mui/material";

import { SongSearch } from "./SongSearch";
import { SortOfSongs } from "./SortOfSongs";
import { Bogimg, Bogorodimg, Cerkvaimg, Himnimg, Hrystosimg, Koljadimg, Narodniimg, Pohoronimg, Povstanskiimg, Shchedrivkyimg, Strasniimg, Vinshivkyimg, Voskresniimg } from "./ImageComponents/Image.js";

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
  let count = '/count-vsipisni';
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} count={count}/>
  )
}


export function SortOfSongGimn() {
  let zapyt = "/gimn";
  let count = "/count-gimn";
  let typeOfSong = "Гімни";
  let image = <Himnimg />;
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} image={image} count={count} />
  )
}


export function SortOfSongPovstanska() {
  let zapyt = "/povstanska";
  let typeOfSong = "Повстанські";
  let count = "/count-povstanska";
  let image = <Povstanskiimg />
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} image={image} count={count} />
  )
}

export function SortOfSongBogorodychna() {
  let typeOfSong = "Богородичні";
  let zapyt = "/bogorodychna";
  let count = '/count-bogorodychna'
  let image = <Bogorodimg />
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} image={image} count={count} />
  )
}

export function SortOfSongDoHrysta() {
  let typeOfSong = "До Христа";
  let zapyt = "/dohrysta";
  let count = '/count-dohrysta'
  let image = <Hrystosimg />
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} image={image} count={count} />
  )
}


export function SortOfSongBoga() {
  let zapyt = "/doboga";
  let count = '/count-doboga';
  let typeOfSong = "До Бога";
  let image = <Bogimg />
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} image={image} count={count} />
  )
}

export function SortOfSongStrasni() {
  let zapyt = "/strasni";
  let count = '/count-strasna';
  let typeOfSong = "Страсні пісні";
  let image = <Strasniimg />
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} image={image} count={count} />
  )
}

export function SortOfSongInshiCerkovni() {
  let zapyt = "/inshi-cerkovni";
  let typeOfSong = "Інші церковні пісні";
  let count = '/count-inshi';
  let image = <Cerkvaimg />
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} image={image} count={count} />
  )
}

export function SortOfSongVoskresni() {
  let zapyt = "/voskresni";
  let typeOfSong = "Воскресні";
  let count = '/count-voskresni';
  let image = <Voskresniimg/>
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} count={count} image={image}/>
  )
}

export function SortOfSongNarodni() {
  let zapyt = "/narodni";
  let typeOfSong = "Народні";
  let count = '/count-narodna';
  let image = <Narodniimg/>
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} count={count} image={image}/>
  )
}

export function SortOfSongKoljadky() {
  let zapyt = "/koljada";
  let typeOfSong = "Колядки";
  let count = '/count-koljada';
  let image = <Koljadimg />
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} image={image} count={count} />
  )
}

export function SortOfSongPohoronni() {
  let zapyt = "/pohoron";
  let typeOfSong = "Похоронні";
  let count = '/count-pohoronni';
  let image = <Pohoronimg/>
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} count={count} image={image}/>
  )
}

export function SortOfSongShchedrivky() {
  let zapyt = "/shchedra";
  let typeOfSong = "Щедрівки";
  let count = '/count-shchedrivka';
  let image = <Shchedrivkyimg/>
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} count={count} image={image}/>
  )
}

export function SortOfSongVinshuvannya() {
  let zapyt = "/vinsha";
  let typeOfSong = "Віншування";
  let count = '/count-vinsha';
  let image = <Vinshivkyimg/>
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} count={count} image={image}/>
  )
}

export function SortOfSongSvustyn() {
  let zapyt = "/svustyn";
  let typeOfSong = "Обробки Р.Свистуна";
  return (
    <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
  )
}