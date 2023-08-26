import React, { useState } from 'react';
import axios from 'axios';
import './RegisterLoginAndRestaurantInfo.css'; // Import your CSS file
import LocationApp from './LocationApp';
import RestaurantList from './restra';

const API_BASE_URL = 'https://staging.fastor.in/v1/pwa/user';

const RegisterLoginAndRestaurantInfo = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  const handleRequestOTP = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        phone_number: `+91${phoneNumber}`
      });

      console.log('OTP Request Successful:', response.data);
    } catch (error) {
      console.error('OTP Request Error:', error);
      console.error('API Error Message:', error.response.data.error_message);
      // Display the error message to the user
      alert('Error: ' + error.response.data.error_message);
    }
  };

  const handleLoginWithOTP = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        phone_number: `+91${phoneNumber}`,
        otp
      });

      console.log('Login with OTP Successful:', response.data);
      setAccessToken(response.data.token);
      fetchRestaurantInfo(response.data.token);
    } catch (error) {
      console.error('Login with OTP Error:', error);
    }
  };

  const fetchRestaurantInfo = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurant-info`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Restaurant Info:', response.data);
      setRestaurantInfo(response.data);
    } catch (error) {
      console.error('Fetch Restaurant Info Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="box register-box">
        <h2>Register</h2>
        <p>Enter your mobile number to receive the OTP</p>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleRequestOTP}>Request OTP</button>
      </div>
      <div className="box login-box">
        <h2>OTP Verification</h2>
        <p>Enter the OTP sent to your mobile number</p>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <button onClick={handleLoginWithOTP}>Verify</button>
        <p>Didn't receive the code? <span>Resend</span></p>
      </div>
      {restaurantInfo ? (
        <div className="restaurant-info-box">
          <h3>Restaurant Information</h3>
          <p>Name: {restaurantInfo.name}</p>
          <p>Address: {restaurantInfo.address}</p>
          {/* Display other restaurant information here */}
        </div>
      ) : (
        <div className="loading-box">
          <div className='Navbar'><LocationApp/></div>
          <RestaurantList/>
        </div>
      )}
    </div>
  );
};

export default RegisterLoginAndRestaurantInfo;
