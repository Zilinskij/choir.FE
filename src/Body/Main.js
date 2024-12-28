
import { AllOfSongs } from '../Buttons.js';
import { OpenSortButton } from '../SortButton.js';
import { Videos } from '../ourFiles/Videos.js';
import { Fotos } from '../ourFiles/Fotos.js';

export default function Main() {
    return (
        <>
            <AllOfSongs />
            <OpenSortButton />
            <Videos apiUrl={process.env.REACT_APP_API_URL} />
            <Fotos apiUrl={process.env.REACT_APP_API_URL} />
        </>
    )
} 