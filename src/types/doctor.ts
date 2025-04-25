export interface ClinicAddress {
  locality: string;
  city: string;
  address_line1: string;
  location: string;
  logo_url: string;
}

export interface Clinic {
  name: string;
  address: ClinicAddress;
}

export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: { name: string }[];
  experience: string;
  ratings?: number;
  reviews?: number;
  fees: string;
  hospital?: string;
  location?: string;
  languages: string[];
  clinic: Clinic;
  video_consult: boolean;
  in_clinic: boolean;
}

export type ConsultationType = 'Video Consult' | 'In Clinic';

export type SortOption = 'fees' | 'experience';

export interface FilterState {
  searchTerm: string;
  consultationType: ConsultationType | null;
  specialties: string[];
  sortBy: SortOption | null;
} 