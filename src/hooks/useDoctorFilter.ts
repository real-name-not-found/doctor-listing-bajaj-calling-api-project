import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Doctor, FilterState, SortOption } from '../types/doctor';

// Helper function to parse experience string (e.g., "13 Years of experience")
const parseExperience = (expString: string): number => {
  if (!expString) return 0;
  const match = expString.match(/^(\d+)/); // Extract leading digits
  return match ? parseInt(match[1], 10) : 0;
};

// Helper function to parse fees string (e.g., "₹ 500")
const parseFees = (feeString: string): number => {
  if (!feeString) return 0;
  const match = feeString.match(/(\d+)$/); // Extract trailing digits
  return match ? parseInt(match[1], 10) : 0;
};

export const useDoctorFilter = (doctors: Doctor[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize filter state from URL params
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: searchParams.get('search') || '',
    consultationType: (searchParams.get('consultationType') as any) || null,
    specialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
    sortBy: (searchParams.get('sortBy') as SortOption) || null,
  });

  // Update URL when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.searchTerm) params.search = filters.searchTerm;
    if (filters.consultationType) params.consultationType = filters.consultationType;
    if (filters.specialties.length) params.specialties = filters.specialties.join(',');
    if (filters.sortBy) params.sortBy = filters.sortBy;
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Get unique specialties from doctors data
  const specialties = useMemo(() => {
    const specialtySet = new Set<string>();
    doctors.forEach(doctor => {
      // Use correct field name: specialities
      if (Array.isArray(doctor.specialities)) {
        doctor.specialities.forEach(s => {
          if (s && typeof s.name === 'string') {
            specialtySet.add(s.name);
          }
        });
      }
    });
    const uniqueSpecialties = Array.from(specialtySet).sort();
    console.log('Generated unique specialties (from objects):', uniqueSpecialties);
    return uniqueSpecialties;
  }, [doctors]);

  // Apply filters to doctors
  const filteredDoctors = useMemo(() => {
    const filtered = doctors
      .filter(doctor => {
        // Filter by search term
        if (filters.searchTerm && !doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
          return false;
        }
        
        // Filter by consultation type (using boolean flags)
        if (filters.consultationType === 'Video Consult' && !doctor.video_consult) {
          return false;
        }
        if (filters.consultationType === 'In Clinic' && !doctor.in_clinic) {
          return false;
        }
        
        // Filter by specialties (check name within specialities objects)
        if (filters.specialties.length > 0 && 
            (!Array.isArray(doctor.specialities) || 
             !doctor.specialities.some(s => s && filters.specialties.includes(s.name)))) {
          return false;
        }
        
        return true;
      });

    // Create a new sorted array 
    const sorted = [...filtered].sort((a, b) => {
        // Sort by selected option (using parsed values)
        if (filters.sortBy === 'fees') {
          return parseFees(a.fees) - parseFees(b.fees); // ascending
        } else if (filters.sortBy === 'experience') {
          return parseExperience(b.experience) - parseExperience(a.experience); // descending
        }
        return 0;
      });
      
    return sorted;

  }, [doctors, filters]);

  // Get search suggestions based on current search term
  const searchSuggestions = useMemo(() => {
    if (!filters.searchTerm) return [];
    
    const matches = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      .map(doctor => doctor.name)
      .slice(0, 3); // Top 3 matches only
      
    return matches;
  }, [doctors, filters.searchTerm]);

  const updateSearchTerm = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
  };

  const updateConsultationType = (type: string | null) => {
    setFilters(prev => ({ ...prev, consultationType: type as any }));
  };

  const toggleSpecialty = (specialty: string) => {
    setFilters(prev => {
      if (prev.specialties.includes(specialty)) {
        return { ...prev, specialties: prev.specialties.filter(s => s !== specialty) };
      } else {
        return { ...prev, specialties: [...prev.specialties, specialty] };
      }
    });
  };

  const clearSpecialties = () => {
    setFilters(prev => ({ ...prev, specialties: [] }));
  };

  const updateSortBy = (sortOption: SortOption | null) => {
    setFilters(prev => ({ ...prev, sortBy: sortOption }));
  };

  return {
    filters,
    filteredDoctors,
    specialties,
    searchSuggestions,
    updateSearchTerm,
    updateConsultationType,
    toggleSpecialty,
    clearSpecialties,
    updateSortBy
  };
}; 