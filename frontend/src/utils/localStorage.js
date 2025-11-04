// LocalStorage utilities for guest wishlist

const WISHLIST_KEY = 'thirukkural_guest_wishlist';

export const getGuestWishlist = () => {
  try {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error reading guest wishlist:', error);
    return [];
  }
};

export const addToGuestWishlist = (kuralNumber) => {
  try {
    const wishlist = getGuestWishlist();
    if (!wishlist.includes(kuralNumber)) {
      wishlist.push(kuralNumber);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
    return wishlist;
  } catch (error) {
    console.error('Error adding to guest wishlist:', error);
    return [];
  }
};

export const removeFromGuestWishlist = (kuralNumber) => {
  try {
    const wishlist = getGuestWishlist();
    const updatedWishlist = wishlist.filter(num => num !== kuralNumber);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    return updatedWishlist;
  } catch (error) {
    console.error('Error removing from guest wishlist:', error);
    return [];
  }
};

export const clearGuestWishlist = () => {
  try {
    localStorage.removeItem(WISHLIST_KEY);
  } catch (error) {
    console.error('Error clearing guest wishlist:', error);
  }
};

export const isInGuestWishlist = (kuralNumber) => {
  const wishlist = getGuestWishlist();
  return wishlist.includes(kuralNumber);
};
