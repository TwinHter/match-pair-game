import "./Card.css";
import BACK_IMAGE from "../ImageData/Image/onepiece.png";

function Card(props) {
  const handleClick = () => {
    if (!props.isDone) {
      props.handleChooseCard(props.card);
    }
  };
  return (
    <div
      className={`card ${props.isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
      key={props.card.cardId}
    >
      <img src={props.card.src} className="front" alt="front card"></img>
      <img src={BACK_IMAGE} className="back" alt="back card"></img>
    </div>
  );
}

export default Card;
