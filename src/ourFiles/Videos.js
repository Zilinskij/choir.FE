import { useState } from "react";
import axios from "axios";

export function Videos({ apiUrl }) {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showVideos, setShowVideos] = useState(false);
  
  
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/videos`);
        setVideos(response.data);
        setShowVideos(true);
      } catch (error) {
        console.error('Помилка під час отримання відеофайлів:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleHideVideos = () => {
      setShowVideos(false);
    };
  
    const handleVideoClick = async (nazva) => {
      try {
        const response = await axios.post(`${apiUrl}/video-files`, { nazva });
        if (response.data.video) {
          window.location.href = response.data.video;
        } else {
          alert('Відео не знайдено');
        }
      } catch (error) {
        console.error('Помилка отримання відео:', error);
        alert('Виникла помилка під час отримання відео');
      }
    };
  
    return (
      <div>
        {!showVideos && (
          <button className='button'
            onClick={fetchVideos} disabled={isLoading}>
            Відеофайли
          </button>
        )}
        {showVideos && (
          <>
            <button className='button'
              onClick={handleHideVideos}>
              Приховати список відеофайлів
            </button>
            <ol>
              {videos.map((video, index) => (
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                  key={index}>
                  <li className='li-my'
                    style={{
                      fontWeight: '600',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      width: 'auto',
                      fontSize: '1em',
                      marginBottom: '5px'
                    }}
                    onClick={() => handleVideoClick(video.namevideo)}>
                    {video.namevideo}
                  </li>
                </span>
              ))}
            </ol>
          </>
        )}
        {isLoading && <p>Завантаження відеофайлів...</p>}
      </div>
    );
  }