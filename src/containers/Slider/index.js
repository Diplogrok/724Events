import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Vérifier si data et data.focus sont définis
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer à la prochaine carte après 5 secondes
  const nextCard = () => {
    setTimeout(() => setIndex((index + 1) % (byDateDesc?.length || 1)), 5000);
  };

  // Effet pour déclencher le changement de carte
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id} // Utiliser une clé unique pour chaque événement
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide" // Comparer avec l'index dans le tableau
          }`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, idx) => (
            <input
              key={event.id} // Utiliser une clé unique pour chaque élément
              type="radio"
              name="radio-button"
              checked={index === idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
