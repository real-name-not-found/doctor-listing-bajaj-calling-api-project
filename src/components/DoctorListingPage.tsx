import React, { useEffect, useState } from 'react';
import { fetchDoctors } from '../services/doctorService';
import { useDoctorFilter } from '../hooks/useDoctorFilter';
import { Doctor } from '../types/doctor';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import DoctorCard from './DoctorCard';
import './DoctorListingPage.css';

const DoctorListingPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const {
    filters,
    filteredDoctors,
    specialties,
    searchSuggestions,
    updateSearchTerm,
    updateConsultationType,
    toggleSpecialty,
    clearSpecialties,
    updateSortBy
  } = useDoctorFilter(doctors);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        console.log('Starting to load doctors...');
        setLoading(true);
        
        const data = await fetchDoctors();
        console.log('Doctors data received:', data);
        
        // Explicitly log the specialty field of the first few doctors
        if (data && data.length > 0) {
          console.log('Sample specialties from data:', data.slice(0, 3).map(d => d.specialities));
        }

        setDoctors(data);
        setError(null);
      } catch (err) {
        console.error('Error in loadDoctors:', err);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Debug output
  console.log('Current state:', {
    doctorsLength: doctors.length,
    loading,
    error,
    filteredDoctorsLength: filteredDoctors.length,
    filters
  });

  return (
    <div className="doctor-listing-page">
      <header className="page-header">
        <h1>Find a Doctor</h1>
        <SearchBar 
          searchTerm={filters.searchTerm}
          suggestions={searchSuggestions}
          onSearch={updateSearchTerm}
        />
      </header>

      <div className="main-content">
        <aside className="filter-sidebar">
          <FilterPanel 
            filters={filters}
            specialties={specialties}
            onConsultationTypeChange={updateConsultationType}
            onSpecialtyToggle={toggleSpecialty}
            onSortChange={updateSortBy}
            onClearSpecialties={clearSpecialties}
          />
        </aside>

        <main className="doctors-container">
          {loading ? (
            <div className="loading-state">Loading doctors...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="empty-state">
              No doctors found matching your criteria. Try adjusting your filters.
              {doctors.length > 0 && <p>There are {doctors.length} doctors in the database.</p>}
            </div>
          ) : (
            <>
              <div className="results-count">
                {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
              </div>
              <div className="doctors-list">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorListingPage; 