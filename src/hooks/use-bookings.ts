import { useEffect, useState } from "react";
import { Booking } from "@/lib/types";

const useBookings = (key: string, initialValue: any) => {
  const getLocalStorage = () => {
    try {
      const filteredStorage = Object.values(window.localStorage)
        .map((item) => JSON.parse(item))
        .filter((item) => item.centerId === key);
      return filteredStorage;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  };

  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    setBookings(getLocalStorage());
  }, []);

  return [bookings];
};

export default useBookings;
