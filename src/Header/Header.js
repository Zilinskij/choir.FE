import { HeadBtn } from '../Buttons.js'

function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}

export default function Header() {
    return (
        <>
            <h2>Хор "Осанна"</h2>
            {/* <Card>
                <HeadBtn text='Кнопка 1'/>
                <HeadBtn text='Кнопка 2'/>
                <HeadBtn text='Кнопка 3'/>
                <HeadBtn text='Кнопка 4' />
            </Card> */}
        </>
    )
}