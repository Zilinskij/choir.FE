import { useState } from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Grid } from '@mui/material';
import { IconButton } from '@mui/material';

import { SortOfSongBoga, SortOfSongBogorodychna, SortOfSongDoHrysta, SortOfSongGimn, SortOfSongInshiCerkovni, SortOfSongKoljadky, SortOfSongNarodni, SortOfSongPohoronni, SortOfSongPovstanska, SortOfSongShchedrivky, SortOfSongStrasni, SortOfSongSvustyn, SortOfSongVinshuvannya, SortOfSongVoskresni } from ".//Buttons.js";


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
      <button className="button" onClick={handleButtonClick}>
        Типи пісень
      </button>
      <Dialog
        open={isSearchOpen}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: "#f5f4f2",
          },
        }}
      >
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "0.3em",
            backgroundColor: "#fbe8c5",
          }}
        >
          <DialogTitle>Типи пісень</DialogTitle>
          <IconButton
            onClick={handleClose}
            size="small"
            style={{
              borderRadius: "0.3em",
              backgroundColor: "#b5e1f5",
              color: "#050505",
              boxShadow: "0em 0em 0.15em 0.15em #b7d9e8",
              position: "absolute",
              right: "1em",
              top: "0.5em",
            }}
          >
            Назад
          </IconButton>
        </DialogActions>
        <DialogContent
          sx={{
            backgroundColor: "#fdefd9"
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongGimn />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongNarodni />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongPovstanska />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongBogorodychna />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongDoHrysta />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongBoga />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongStrasni />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongVoskresni />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongKoljadky />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongShchedrivky />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongVinshuvannya />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongPohoronni />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongInshiCerkovni />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SortOfSongSvustyn />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

