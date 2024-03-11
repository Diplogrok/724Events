import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Nombre d'événements par page
const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction pour changer le type de catégorie sélectionné et revenir à la première page
  const changeType = (eType) => {
    setCurrentPage(1);
    setType(eType);
  };
  let filteredEvents = []; // Variable initialisé avec un tableau vide
  let totalPages = 0; // Variable initialisé à 0

  // Tri des événements par date dans l'ordre décroissant
  const sortedEvents = data?.events?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filtrage des événements en fonction du type de catégorie sélectionné
  if (!type) {
    // Si aucun type n'est sélectionné, afficher tous les événements
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = Math.min(startIndex + PER_PAGE, sortedEvents?.length || 0);
    filteredEvents = sortedEvents?.slice(startIndex, endIndex) || [];
    totalPages = Math.ceil((sortedEvents?.length || 0) / PER_PAGE);
  } else {
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = Math.min(
      startIndex + PER_PAGE,
      sortedEvents?.filter((event) => event.type === type).length || 0
    );
    // Sinon, filtrer les événements par type de catégorie
    filteredEvents =
      sortedEvents
        ?.filter((event) => event.type === type)
        ?.slice(startIndex, endIndex) || [];
    totalPages = Math.ceil(
      (sortedEvents?.filter((event) => event.type === type).length || 0) /
        PER_PAGE
    );
  }

  // Liste des types de catégories disponibles
  const typeList = new Set(sortedEvents?.map((event) => event.type) || []);

  // Fonction pour gérer le changement de page
  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          {totalPages > 1 && ( // Vérifie s'il y a plus d'une page à afficher
            <div className="Pagination">
              {[...Array(totalPages)].map(
                (
                  _,
                  index // Boucle à travers le nombre total de pages
                ) => (
                  <button
                    key={`page-${index + 1}`} // Clé unique pour chaque bouton de pagination
                    className={currentPage === index + 1 ? "active" : ""} // Applique la classe 'active' si le bouton correspond à la page actuelle
                    type="button"
                    onClick={() => handleClickPage(index + 1)}>
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EventList;
