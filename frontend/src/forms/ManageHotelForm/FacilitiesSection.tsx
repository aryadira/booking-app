import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-option-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className='w-full lg:max-w-[50%]'>
      <h2 className='text-2xl font-bold mb-3'>Facilities</h2>
      <div className='grid grid-cols-4 gap-5 border-slate-200 border p-5 rounded-md shadow-sm'>
        {hotelFacilities.map((facility) => (
          <label className='text-sm flex items-center gap-3 cursor-pointer text-gray-700'>
            <input
              type='checkbox'
              value={facility}
              className='min-w-4 h-4 bg-gray-100 rounded cursor-pointer'
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && <span className='text-red-500 text-sm font-bold'>{errors.facilities.message}</span>}
    </div>
  );
};

export default FacilitiesSection;
