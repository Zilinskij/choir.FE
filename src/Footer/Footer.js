import {  AllOfSongs,  OpenSearchButton, OpenSortButton } from '../Buttons.js';


export default function Footer() {
    return (
        <div className='footer'>
            <AllOfSongs />
            <OpenSearchButton />
            <OpenSortButton />
        </div>
    )
}