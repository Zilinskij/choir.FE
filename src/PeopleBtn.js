import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PeopleList({ apiUrl }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/people`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Помилка під час отримання даних:', error);
      } finally {
        setIsLoading(false);
      }
    }; fetchData()
  }, [apiUrl]);

  return (
    <div>
      {isLoading ? (
        <p>Завантаження даних...</p>
      ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            
        }}>
            <i><h3>Наші хористи:</h3></i>
          {data && data.length > 0 ? (
            <ol>
              {data.map((person, index) => (
                <li key={index}
                  className="li-my"
                  style={{
                    backgroundColor: 'white'
                  }}
                >{person.first_name} {person.last_name} ({person.tembrname})</li>
              ))}
            </ol>) : (
            <p>Дані відсутні</p>
          )}
        </div>
      )
      }
    </div>
  );
}

export function PeopleBtn() {
  const navigate = useNavigate()
  const handleOpenPeople = () => {
    navigate('/people')
  };
  return (
    <button
      className="button"
      onClick={handleOpenPeople}
    >
      Колектив хору
    </button>
  )
}