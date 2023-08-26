import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('https://staging.fastor.in/v1/m/restaurant?city_id=118');
      console.log('Restaurant Data:', response.data);
      setRestaurants(response.data.data);
    } catch (error) {
      console.error('Fetch Restaurants Error:', error);
    }
  };

  return (
    <div>
      <h2>Restaurant List</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <p>Address: {restaurant.address}</p>
            {/* Display other restaurant information */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
