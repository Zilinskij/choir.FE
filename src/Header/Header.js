import { PeopleBtn, OpenSearchButton } from "../Buttons"
import { Nagorody } from "../Other function/SomeFunction"

export default function Header() {
    return (
        <>
            <h2>Хор "Осанна"</h2>
            <div className="header">
                <PeopleBtn />
                <OpenSearchButton />
                <Nagorody apiUrl={process.env.REACT_APP_API_URL}/>
            </div>
        </>
    )
}