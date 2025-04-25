import React from 'react';
import { Doctor } from '../types/doctor';
import './DoctorCard.css';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="doctor-image-container">
        <img src={doctor.photo} alt={doctor.name} className="doctor-image" />
      </div>
      <div className="doctor-info">
        <h3 className="doctor-name" data-testid="doctor-name">{doctor.name}</h3>
        <div className="doctor-specialties" data-testid="doctor-specialty">
          {Array.isArray(doctor.specialities) 
            ? doctor.specialities.map(s => s?.name).filter(Boolean).join(', ') 
            : 'No specialties listed'}
        </div>
        <div className="doctor-experience" data-testid="doctor-experience">
          {doctor.experience || 'N/A'}
        </div>
        <div className="doctor-location">
          <div>{doctor.clinic?.name || 'Hospital N/A'}</div>
          <div>{doctor.clinic?.address?.locality || 'Location N/A'}, {doctor.clinic?.address?.city || ''}</div>
        </div>
      </div>
      <div className="doctor-booking">
        <div className="consultation-types">
          {doctor.video_consult && 
            <div className="consultation-badge">Video Consult</div>
          }
          {doctor.in_clinic && 
            <div className="consultation-badge">In Clinic</div>
          }
        </div>
        <div className="doctor-fees" data-testid="doctor-fee">
          {doctor.fees || 'N/A'}
        </div>
        <button className="book-button">Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard; 