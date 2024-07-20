import { PeopleBtn, SortOfSongBogorodychna, SortOfSongGimn, SortOfSongPovstanska, AllOfSongs, SortOfSongDoHrysta, SortOfSongBoga, SortOfSongStrasni } from '../Buttons.js';
import { SongSearch } from '../Other function/SomeFunction.js';

export default function Footer() {
    return (
        <div className='footer'>
            <PeopleBtn />
            <AllOfSongs />
            <SortOfSongGimn />
            <SortOfSongPovstanska />
            <SortOfSongBogorodychna />
            <SortOfSongDoHrysta />
            <SortOfSongBoga />
            <SortOfSongStrasni/>
            <SongSearch />
        </div>
    )
}