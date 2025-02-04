import { Nagorody } from "../ourFiles/Nagorody.js";
import { PeopleBtn } from "../PeopleBtn";

export default function Header() {
    return (
        <>
            <div className="header">
                <PeopleBtn />
                <Nagorody apiUrl={process.env.REACT_APP_API_URL} />
            </div>
        </>
    )
}