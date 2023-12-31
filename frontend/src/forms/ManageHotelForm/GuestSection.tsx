import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className='w-full lg:max-w-[50%]'>
      <h2 className='text-2xl font-bold mb-3'>Guests</h2>
      <div className='grid grid-cols-2 p-6 gap-5 border border-slate-200 rounded-md shadow-sm'>
        <label className='text-gray-700 text-sm font-semibold'>
          Adults
          <input
            className='border rounded w-full py-2 px-3 font-normal'
            type='number'
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && <span className='text-red-500 text-sm fold-bold'>{errors.adultCount?.message}</span>}
        </label>
        <label className='text-gray-700 text-sm font-semibold'>
          Children
          <input
            className='border rounded w-full py-2 px-3 font-normal'
            type='number'
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && <span className='text-red-500 text-sm fold-bold'>{errors.childCount?.message}</span>}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
