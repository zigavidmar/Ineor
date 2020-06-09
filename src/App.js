import React from 'react';
import './sass/app.scss';
import SectionImage from './img/image.jpg';
import BookAppointment from './components/BookAppointment';

function App() {
  return (
    <div className="section-booking">
      <div className="container">
        <div className="section-title">
          <h1>Book your barber</h1>
        </div>

        <div className="section-subtitle">
          <h3>Great Hair Doesn’t Happen By Chance. It Happens By Appointment! So, Don't Wait And Book Your Appointment Now!</h3>
        </div>

        <div className="section-image">
          <div className="image-wrapper">
            <img alt="Section image" src={SectionImage} />
          </div>
        </div>

        <div className="section-booking-app">
          <BookAppointment/>
        </div>

      </div>
    </div>
  );
}

export default App;
