import React, { useEffect, useState } from "react";
import { fetchCardsByPage } from "../event_panel/header/CardsApi";
import CardsGrid from "../event_panel/header/CardsGrid";

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
      <CardsGrid cards={cards} />
    </div>
  );
}

export default Home;
