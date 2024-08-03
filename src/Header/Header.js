import { PeopleBtn, OpenSearchButton } from "../Buttons"

export default function Header() {
    return (
        <>
            <h2>Хор "Осанна"</h2>
            <div className="header">
                <PeopleBtn />
                <OpenSearchButton />
            </div>
        </>
    )
}