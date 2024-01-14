import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const Hotels = () => {
  const { data: hotelData } = useQuery("fetchHotels", apiClient.fetchHotels, {
    onError: () => {},
  });

  if (!hotelData) {
    return <span>No Hotels found!</span>;
  }

  return (
    <div className='space-y-5'>
      <span className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>
        <Link to='/hotel/add' className='bg-blue-600 text-white py-2 px-8 rounded-sm font-bold hover:bg-blue-500 text-xl'>
          Add Hotel
        </Link>
      </span>
      <div className='grid grid-cols-1 gap-8'>
        {hotelData.map((hotel) => (
          <div data-testid='hotel-card' className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'>
            <h2 className='text-2xl font-bold'>{hotel.name}</h2>
            <div className='whitespace-pre-line'>{hotel.description}</div>
            <div className='grid grid-cols-5 gap-2'>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BsMap className='mr-1' />
                {hotel.city}, {hotel.country}
              </div>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BsBuilding className='mr-1' />
                {hotel.type}
              </div>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiMoney className='mr-1' />£{hotel.pricePerNight} per night
              </div>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiHotel className='mr-1' />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiStar className='mr-1' />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className='flex justify-end'>
              <Link to={`/hotel/edit/${hotel._id}`} className='bg-blue-600 text-white py-2 px-4 rounded-sm font-bold hover:bg-blue-500 text-xl'>
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
