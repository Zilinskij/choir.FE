import { useState } from "react";
import { SortOfSongBoga, SortOfSongBogorodychna, SortOfSongDoHrysta, SortOfSongGimn, SortOfSongInshiCerkovni, SortOfSongKoljadky, SortOfSongNarodni, SortOfSongPohoronni, SortOfSongPovstanska, SortOfSongShchedrivky, SortOfSongStrasni, SortOfSongSvustyn, SortOfSongVinshuvannya, SortOfSongVoskresni } from ".//Buttons.js";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { IconButton } from '@mui/material';


export function OpenSortButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleButtonClick = () => {
    setIsSearchOpen(true);
  };

  const handleClose = () => {
    setIsSearchOpen(false);
  }

  return (
    <div>
      <button className="button"
        onClick={handleButtonClick}
      >
        Типи пісень
      </button>
      <Dialog
        open={isSearchOpen}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: '#f5f4f2'
          }
        }}
      >
        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '0.3em',
            backgroundColor: '#FFFAFA'
          }}>
          <DialogTitle
          >Типи пісень</DialogTitle>
          <IconButton
            onClick={handleClose}
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
        </DialogActions>
        <DialogContent className="type-of-song">
          <SortOfSongGimn />
          <SortOfSongNarodni />
          <SortOfSongPovstanska />
          <SortOfSongBogorodychna />
          <SortOfSongDoHrysta />
          <SortOfSongBoga />
          <SortOfSongStrasni />
          <SortOfSongVoskresni />
          <SortOfSongKoljadky />
          <SortOfSongShchedrivky />
          <SortOfSongVinshuvannya />
          <SortOfSongPohoronni />
          <SortOfSongInshiCerkovni />
          <SortOfSongSvustyn />
        </DialogContent>
      </Dialog>
    </div>
  );
}