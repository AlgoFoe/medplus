import { create } from 'zustand';

interface GlobalState {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    searchCity:string;
    setSearchCity:(term:string)=>void;
    bookingStatus: boolean;
    setBookingStatus: (status: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
    searchTerm: '',
    setSearchTerm: (term: string) => set({ searchTerm: term }),
    searchCity:'',
    setSearchCity:(term:string)=>set({searchCity:term}),
    bookingStatus: false,
    setBookingStatus: (status) => set({ bookingStatus: status }),
}));

export default useGlobalStore;