import React from 'react';
import { FilterState, SortOption } from '../types/doctor';
import './FilterPanel.css';

interface FilterPanelProps {
  filters: FilterState;
  specialties: string[];
  onConsultationTypeChange: (type: string | null) => void;
  onSpecialtyToggle: (specialty: string) => void;
  onSortChange: (sortOption: SortOption | null) => void;
  onClearSpecialties: () => void;
}

// Helper function to generate test ID for specialties
const generateSpecialtyTestId = (specialtyName: string) => {
  // Replace spaces and slashes with hyphens, convert to lowercase
  const formattedName = specialtyName.replace(/\s+|\//g, '-').toLowerCase();
  return `filter-specialty-${formattedName}`;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  specialties,
  onConsultationTypeChange,
  onSpecialtyToggle,
  onSortChange,
  onClearSpecialties,
}) => {
  // Log the received specialties prop
  console.log('FilterPanel received specialties:', specialties);

  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      
      <div className="filter-section">
        <h4 data-testid="filter-header-moc">Consultation Type</h4>
        <div className="radio-group">
          <label>
            <input
              data-testid="filter-video-consult"
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => onConsultationTypeChange('Video Consult')}
            />
            Video Consult
          </label>
          <label>
            <input
              data-testid="filter-in-clinic"
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => onConsultationTypeChange('In Clinic')}
            />
            In Clinic
          </label>
          {filters.consultationType && (
            <div className="clear-filter" onClick={() => onConsultationTypeChange(null)}>
              Clear
            </div>
          )}
        </div>
      </div>
      
      <div className="filter-section">
        <h4 data-testid="filter-header-speciality">Specialties</h4>
        <div className="checkbox-group">
          {/* Map directly over specialties if it's a valid array */}
          {Array.isArray(specialties) && specialties.map((specialty) => (
              <label key={specialty}>
                <input
                  data-testid={generateSpecialtyTestId(specialty)}
                  type="checkbox"
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => onSpecialtyToggle(specialty)}
                />
                {specialty}
              </label>
            ))}
          
          {filters.specialties.length > 0 && (
            <div 
              className="clear-filter"
              onClick={onClearSpecialties}
            >
              Clear All
            </div>
          )}
        </div>
      </div>
      
      <div className="filter-section">
        <h4 data-testid="filter-header-sort">Sort By</h4>
        <div className="radio-group">
          <label>
            <input
              data-testid="sort-fees"
              type="radio"
              name="sortBy"
              checked={filters.sortBy === 'fees'}
              onChange={() => onSortChange('fees')}
            />
            Fees (Low to High)
          </label>
          <label>
            <input
              data-testid="sort-experience"
              type="radio"
              name="sortBy"
              checked={filters.sortBy === 'experience'}
              onChange={() => onSortChange('experience')}
            />
            Experience (High to Low)
          </label>
          {filters.sortBy && (
            <div className="clear-filter" onClick={() => onSortChange(null)}>
              Clear
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 