import { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Dialog, IconButton } from "@mui/material";

import { ScrollSong } from './ScrollSong';

export function SortOfSongs({ zapyt, typeOfSong }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showData, setShowData] = useState(false);
    const [selectedNazva, setSelectedNazva] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [selectedSongIndex, setSelectedSongIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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
            const response = await fetch(`${apiUrl}${zapyt}`);
            const jsonData = await response.json();

            const dataWithNotes = await Promise.all(
                jsonData.map(async (item) => {
                    return { ...item, hasNotes: true };
                })
            )

            setData(dataWithNotes);
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

    const handleSongClick = (index, nazva, text) => {
        setSelectedSongIndex(index);
        setSelectedNazva(nazva);
        setSelectedText(text);
    };

    const handleCloseModal = () => {
        setSelectedSongIndex(null);
        setSelectedNazva('');
        setSelectedText('');
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    let firstIndex = (currentPage - 1) * itemsPerPage;
    let lastIndex = currentPage * itemsPerPage;

    const currentPageData = data.slice(firstIndex, lastIndex);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };



    return (
        <div>
            {!showData && (
                <button
                    className='button'
                    onClick={fetchData}
                    disabled={isLoading}
                >
                    {typeOfSong}
                </button>
            )}
            {showData && (
                <>
                    <div>
                        <Dialog
                            open={showData}
                            fullScreen
                            PaperProps={{
                                style: {
                                    backgroundColor: '#FFFAFA',
                                }
                            }}
                        >
                            <IconButton
                                onClick={handleHideData}
                                size='small'
                                style={{
                                    borderRadius: '0.3em',
                                    backgroundColor: '#b5e1f5',
                                    color: '#050505',
                                    boxShadow: '0em 0em 0.15em 0.15em #b7d9e8',
                                    position: 'absolute',
                                    right: '1em',
                                    top: '0.5em'
                                }}
                            >Назад
                            </IconButton>
                            <ul
                                style={{ listStyleType: 'none', }}
                            >

                                {currentPageData.map((item, index) => (
                                    <span
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginLeft: '-2em'
                                        }}
                                        key={index}
                                    >
                                        <li className='li-my'
                                            onClick={() => handleSongClick(index, item.nazva, item.text)}
                                            style={{
                                                fontWeight: '100%',
                                                cursor: 'pointer',
                                                backgroundColor: 'white',
                                                width: 'auto',
                                                fontSize: '1em'
                                            }}
                                        >
                                            {index + 1 + (currentPage - 1) * itemsPerPage}. {item.nazva}
                                            <br></br>
                                            <i
                                            >{item.dzher}</i>
                                        </li>
                                    </span>
                                ))}
                            </ul>
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '1em',
                                    bottom: '0.8em'
                                }}
                            >
                                <Stack spacing={3}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        variant='outlined'
                                        shape="rounded"
                                        color="primary"
                                        siblingCount={1}
                                    />
                                </Stack>
                            </div>
                        </Dialog>
                    </div>
                </>
            )}
            {isLoading && <p>Завантаження даних...</p>}
            {selectedSongIndex !== null && (
                <ScrollSong
                    isOpen={selectedSongIndex !== null}
                    handleClose={handleCloseModal}
                    nazva={selectedNazva}
                    text={selectedText}
                />
            )}
        </div>
    );
}