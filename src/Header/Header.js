import { PeopleBtn, OpenSearchButton, OpenSearchByNazvaButton } from "../Buttons"
import {  Nagorody } from "../Other function/SomeFunction"

export default function Header() {
    return (
        <>
            <h2 className="zagolovok">Хор "Осанна"</h2>
            <div className="header">
                <PeopleBtn />
                <OpenSearchButton />
                <OpenSearchByNazvaButton />
                <Nagorody apiUrl={process.env.REACT_APP_API_URL}/>
            </div>
        </>
    )
}