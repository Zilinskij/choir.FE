import { AllOfSongs } from '../Buttons.js';
import { OpenSortButton } from '../SortButton.js';
import { Videos } from '../Other function/SomeFunction.js';
import { Fotos } from '../Other function/SomeFunction.js';

export default function Footer() {
    return (
        <div className='footer'>
            <AllOfSongs />
            <OpenSortButton />
            <Videos apiUrl={process.env.REACT_APP_API_URL} />
            <Fotos apiUrl={process.env.REACT_APP_API_URL}/>
        </div>
    )
}