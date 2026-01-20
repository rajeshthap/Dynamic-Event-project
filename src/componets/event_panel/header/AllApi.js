import axios from "axios";

// ===========================
// CARDS API
// ===========================

const CARDS_API_URL =
  "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/";

// Base domain for images (shared for both cards and carousel)
const IMAGE_BASE =
  "https://mahadevaaya.com/eventmanagement/eventmanagement_backend";

let cachedCards = null;

/* ===========================
   FORMAT CARDS IMAGE URL
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
    const response = await axios.get(CARDS_API_URL);
    const rawCards = response.data?.data || [];

    cachedCards = formatCards(rawCards);

    console.log("ALL CARDS:", cachedCards);
  }
  return cachedCards;
};

/* ===========================
   FILTER CARDS BY PAGE ID
=========================== */
export const fetchCardsByPage = async (pageId) => {
  const allCards = await loadAllCards();

  return allCards.filter(
    (card) => Number(card.page) === Number(pageId)
  );
};

/* ===========================
   REFRESH CARDS AFTER EDIT
=========================== */
export const refreshCards = async () => {
  const response = await axios.get(CARDS_API_URL);
  cachedCards = formatCards(response.data?.data || []);
};


// ===========================
// CAROUSEL API
// ===========================

const CAROUSEL_API_URL =
  "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/carousel1-item/";

let cachedCarouselItems = null;

/* ===========================
   FORMAT CAROUSEL IMAGE URL
=========================== */
const formatCarouselItems = (items) => {
  return items.map((item) => ({
    ...item,
    image: item.image ? `${IMAGE_BASE}${item.image}` : null,
  }));
};

/* ===========================
   LOAD ALL CAROUSEL ITEMS (ONE TIME)
=========================== */
export const loadAllCarouselItems = async () => {
  if (!cachedCarouselItems) {
    const response = await axios.get(CAROUSEL_API_URL);
    const rawItems = response.data?.data || [];

    cachedCarouselItems = formatCarouselItems(rawItems);

    console.log("ALL CAROUSEL ITEMS:", cachedCarouselItems);
  }
  return cachedCarouselItems;
};

/* ===========================
   FILTER CAROUSEL ITEMS BY PAGE ID
=========================== */
export const fetchCarouselItemsByPage = async (pageId) => {
  const allItems = await loadAllCarouselItems();

  return allItems.filter(
    (item) => Number(item.page) === Number(pageId)
  );
};

/* ===========================
   REFRESH CAROUSEL ITEMS AFTER EDIT
=========================== */
export const refreshCarouselItems = async () => {
  const response = await axios.get(CAROUSEL_API_URL);
  cachedCarouselItems = formatCarouselItems(response.data?.data || []);
};

// ===========================
// NAVBAR API
// ===========================

const NAVBAR_API_URL =
  "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/navbar-list/";

let cachedNavbarItems = null;

/* ===========================
   LOAD ALL NAVBAR ITEMS (ONE TIME)
=========================== */
export const loadAllNavbarItems = async () => {
  if (!cachedNavbarItems) {
    const response = await axios.get(NAVBAR_API_URL);
    const rawItems = response.data?.data || [];

    cachedNavbarItems = rawItems;

    console.log("ALL NAVBAR ITEMS:", cachedNavbarItems);
  }
  return cachedNavbarItems;
};

/* ===========================
   REFRESH NAVBAR ITEMS AFTER EDIT
=========================== */
export const refreshNavbarItems = async () => {
  const response = await axios.get(NAVBAR_API_URL);
  cachedNavbarItems = response.data?.data || [];
};

// You can add other API functions here as well
export const fetchCardsForHome = async () => {
    // Example function, you can define its logic
    return fetchCardsByPage(7);
};