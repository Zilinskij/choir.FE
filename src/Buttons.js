import React, { useState, useEffect } from 'react';
import { SortOfSongs } from './Other function/SomeFunction';
import { SongSearch } from './Other function/SomeFunction';
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export function HeadBtn({ text }) {
    function handlePlayClick() {
        alert(`Натиснута ${text}`);
    }
    return (
        <div>
            <button className="button" onClick={handlePlayClick}>
                {text}
            </button>
        </div>
    );
}

export function PeopleBtn() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showData, setShowData] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const isDataFetched = localStorage.getItem('isDataFetched');
        if (isDataFetched) {
            setShowData(false);
        }
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/people`);
            const jsonData = await response.json();
            setData(jsonData);
            setShowData(true);
            localStorage.setItem('isDataFetched', true);
        } catch (error) {
            console.error('Помилка під час отримання даних:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHideData = () => {
        setShowData(false);
    };

    return (
        <div>
            {!showData && (
                <button className='button' onClick={fetchData} disabled={isLoading}>Колектив хору</button>
            )}
            {showData && (
                <>
                    <button className='button' onClick={handleHideData}>Приховати список хористів</button>
                </>
            )}
            {isLoading ? (
                <p>Завантаження даних...</p>
            ) : data && showData ? (
                <div>
                    <i><h3>Наші хористи:</h3></i>
                    <ul>
                        {data.map((person, index) => (
                            <li
                                style={{
                                    backgroundColor: 'white'
                                }}
                                key={index}>{person.first_name} {person.last_name} ({person.tembrname})</li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}


export function AllOfSongs() {
    let zapyt = "/ukr";
    let typeOfSong = "Всі пісні";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}


export function SortOfSongGimn() {
    let zapyt = "/gimn";
    let typeOfSong = "Гімни";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}


export function SortOfSongPovstanska() {
    let zapyt = "/povstanska";
    let typeOfSong = "Повстанські";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}

export function SortOfSongBogorodychna() {
    let typeOfSong = "Богородичні";
    let zapyt = "/bogorodychna";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}

export function SortOfSongDoHrysta() {
    let typeOfSong = "До Христа";
    let zapyt = "/dohrysta";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}


export function SortOfSongBoga() {
    let zapyt = "/doboga";
    let typeOfSong = "До Бога";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}

export function SortOfSongStrasni() {
    let zapyt = "/strasni";
    let typeOfSong = "Страсні пісні";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}

export function SortOfSongInshiCerkovni() {
    let zapyt = "/inshi-cerkovni";
    let typeOfSong = "Інші церковні пісні";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}

export function OpenSearchButton() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleButtonClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div>
            <button className='button2'
                onClick={handleButtonClick}
                style={{}}
            >
                Пошук пісні по тексту
            </button>
            {isSearchOpen && <SongSearch />}
        </div>
    );
}

export function OpenSortButton() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleButtonClick = () => {
        setIsSearchOpen(true);
    };

    const handleClose = () => {
        setIsSearchOpen(false);
    }

    return (
        <div>
            <button
                className='button'
                variant='outlined'
                onClick={handleButtonClick}
                style={{ padding: '10px 20px', borderRadius: '5px' }}
            >
                Типи пісень
            </button>
            <Dialog
                open={isSearchOpen}
                onClose={handleClose}
                fullScreen
                PaperProps={{
                    style: {
                        backgroundColor: '#FFFAFA'
                    }
                }}
            >
                <CloseIcon
                    onClick={handleClose}
                    style={{ cursor: 'pointer', position: 'absolute', right: '1em', top: '1em' }}
                />
                <DialogTitle>Типи пісень</DialogTitle>
                <DialogContent>
                    <SortOfSongGimn />
                    <SortOfSongPovstanska />
                    <SortOfSongBogorodychna />
                    <SortOfSongDoHrysta />
                    <SortOfSongBoga />
                    <SortOfSongStrasni />
                    <SortOfSongInshiCerkovni />
                    <SortOfSongSvustyn />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export function SortOfSongSvustyn() {
    let zapyt = "/svustyn";
    let typeOfSong = "Обробки Р.Свистуна";
    return (
        <SortOfSongs zapyt={zapyt} typeOfSong={typeOfSong} />
    )
}