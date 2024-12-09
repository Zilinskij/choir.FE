import { useState, useEffect } from "react";

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
                <li className="li-my"
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
  