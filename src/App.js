import "./App.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import { ImageData } from "./ImageData/ImageData";
import Card from "./Card/Card";

function App() {
  const [fastestTime, setFastestTime] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [card, setCard] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    shuffleCard();
  }, []);

  // clock running
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // winning condition
  useEffect(() => {
    if (card.every((card) => card.match)) {
      if ((fastestTime === null || time < fastestTime) && isRunning) {
        setFastestTime(time);
      }
      handleRestartGame();
    }
  }, [card]);

  // check client choice
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setIsDone(true);
      if (firstChoice.src === secondChoice.src) {
        setCard((prevCard) => {
          return prevCard.map((card) => {
            if (card === firstChoice || card === secondChoice)
              return { ...card, match: true };
            else return card;
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 500);
      }
    }
  }, [firstChoice, secondChoice]);

  const reset = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setIsDone(false);
  };
  const shuffleCard = () => {
    let shuffledCard = [...ImageData, ...ImageData];
    for (let i = shuffledCard.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCard[i], shuffledCard[j]] = [shuffledCard[j], shuffledCard[i]];
    }
    const newCard = shuffledCard.map((card) => ({
      ...card,
      cardId: Math.floor(Math.random() * 1000),
      match: false,
    }));
    setCard(newCard);
  };
  const handleStartGame = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleRestartGame = () => {
    if (isRunning) {
      reset();
      setIsRunning(false);
      setTime(0);
      shuffleCard();
    }
  };

  const handleChooseCard = (card) => {
    if (!isRunning) return;
    if (firstChoice === null) setFirstChoice(card);
    else setSecondChoice(card);
  };
  return (
    <div className="App">
      <Header
        fastestTime={fastestTime}
        time={time}
        handleStartGame={handleStartGame}
        handleRestartGame={handleRestartGame}
      />
      {
        <div className="card-grid">
          {card.map((card) => (
            <Card
              key={card.cardId}
              card={card}
              isDone={isDone}
              isFlipped={
                card.match || card === firstChoice || card === secondChoice
              }
              handleChooseCard={handleChooseCard}
            />
          ))}
        </div>
      }
    </div>
  );
}

export default App;
