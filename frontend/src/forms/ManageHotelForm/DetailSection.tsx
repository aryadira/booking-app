import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className='flex flex-col gap-4 w-full lg:max-w-[50%]'>
      <h1 className='text-3xl font-bold mb-3'>Add New Hotel</h1>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Name
        <input
          type='text'
          className='border rounded w-full py-2 px-3 font-normal my-2'
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
      </label>

      <div className='flex flex-col md:flex-row gap-5'>
        {/* city */}
        <label className='text-gray-700 text-sm font-bold flex-1'>
          City
          <input
            type='text'
            className='border rounded w-full py-2 px-3 font-normal my-2'
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && <span className='text-red-500'>{errors.city.message}</span>}
        </label>
        {/* country */}
        <label className='text-gray-700 text-sm font-bold flex-1'>
          Country
          <input
            type='text'
            className='border rounded w-full py-2 px-3 font-normal my-2'
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && <span className='text-red-500'>{errors.country.message}</span>}
        </label>
      </div>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Description
        <textarea
          rows={10}
          className='border rounded w-full py-2 px-3 font-normal my-2'
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Price Per Night
        <input
          type='number'
          min={1}
          className='border rounded w-full py-2 px-3 font-normal my-2'
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && <span className='text-red-500'>{errors.pricePerNight.message}</span>}
      </label>
      <label className='bg-white text-gray-700 text-sm font-bold flex-1'>
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className='border rounded w-full p-2 text-gray-700 font-normal'>
          <option value='' className='text-sm font-bold'>
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && <span className='text-red-500'>{errors.starRating.message}</span>}
      </label>
    </div>
  );
};

export default DetailSection;
