import axios from "axios";

const API_URL =
  "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/";

// Base domain for images
const IMAGE_BASE =
  "https://mahadevaaya.com/eventmanagement/eventmanagement_backend";

let cachedCards = null;

/* ===========================
   FORMAT IMAGE URL
=========================== */
const formatCards = (cards) => {
  return cards.map((card) => ({
    ...card,
    image: card.image ? `${IMAGE_BASE}${card.image}` : null,
  }));
};

/* ===========================
   LOAD ALL CARDS (ONE TIME)
=========================== */
export const loadAllCards = async () => {
  if (!cachedCards) {
    const response = await axios.get(API_URL);
    const rawCards = response.data?.data || [];

    cachedCards = formatCards(rawCards);

    console.log("ALL CARDS:", cachedCards);
  }
  return cachedCards;
};

/* ===========================
   FILTER BY PAGE ID
=========================== */
export const fetchCardsByPage = async (pageId) => {
  const allCards = await loadAllCards();

  return allCards.filter(
    (card) => Number(card.page) === Number(pageId)
  );
};

/* ===========================
   REFRESH AFTER EDIT
=========================== */
export const refreshCards = async () => {
  const response = await axios.get(API_URL);
  cachedCards = formatCards(response.data?.data || []);
};
