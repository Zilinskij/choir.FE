import { AllOfSongs, OpenSortButton } from '../Buttons.js';
import { Videos } from '../Other function/SomeFunction.js';


export default function Footer() {
    return (
        <div className='footer'>
            <AllOfSongs />
            <OpenSortButton />
            <Videos apiUrl={process.env.REACT_APP_API_URL} />
        </div>
    )
}