import { useState } from 'react';
import { PeopleBtn, SortOfSongBogorodychna, SortOfSongGimn, SortOfSongPovstanska, AllOfSongs, SortOfSongDoHrysta } from '../Buttons.js';
import { SongSearch } from '../Other function/SomeFunction.js';
import { Button } from '@mui/material';

export default function Footer() {
    return (
        <div className='footer'>
            <PeopleBtn />
            <AllOfSongs />
            <SortOfSongGimn />
            <SortOfSongPovstanska />
            <SortOfSongBogorodychna />
            <SortOfSongDoHrysta />
            <SongSearch />
        </div>
    )
}