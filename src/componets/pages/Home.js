// src/components/Home.js
import React, { useEffect, useState } from "react";
import { fetchCardsByPage } from "../event_panel/header/AllApi";
import CardsPage from "../event_panel/header/CardsPage";
import EventCarousel from "./EventCarousel";
// Import the EventCarousel

function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCardsByPage(7).then((res) => {
      console.log("HOME PAGE CARDS:", res);
      setCards(res);
    });
  }, []);

  return (
    <div className="main">
      {/* Add the EventCarousel component here */}
      <EventCarousel />
      <CardsPage cards={cards} />
    </div>
  );
}

export default Home;