import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ScrollSong, SortOfSongs } from './Other function/SomeFunction';
import Footer from './Footer/Footer'; 

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

    useEffect(() => {
        const isDataFetched = localStorage.getItem('isDataFetched');
        if (isDataFetched) {
            setShowData(false);
        }
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/people');
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
                            <li key={index}>{person.first_name} {person.last_name} ({person.tembrname})</li>
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