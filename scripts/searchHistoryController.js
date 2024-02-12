const SearchHistory = require('../models/searchHistory');

exports.saveSearch = async (city, coordinates, weatherData) => {
  try {
    await SearchHistory.create({ city, coordinates, weatherData });
  } catch (error) {
    console.error('Error saving search:', error);
  }
};

exports.getSearchHistory = async () => {
    try {
      const searchHistory = await SearchHistory.find().sort({ createdAt: -1 });
      return searchHistory;
    } catch (error) {
      console.error('Error getting search history:', error);
      throw error;
    }
};

exports.clearSearchHistory = async () => {
    try {
      await SearchHistory.deleteMany({});
    } catch (error) {
      console.error('Error clearing search history:', error);
      throw error;
    }
  };
  