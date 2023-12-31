import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-option-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className='w-full lg:max-w-[50%] '>
      <h2 className='text-2xl font-bold mb-3'>Type</h2>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-2'>
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-200 border-blue-400 border-2 text-sm text-blue-600 rounded-full px-4 py-3 font-semibold flex items-center justify-center hover:bg-blue-200"
                : "cursor-pointer bg-slate-200 border-2 text-sm text-slate-800 rounded-full px-4 py-3 font-semibold flex items-center justify-center hover:bg-slate-300"
            }>
            <input
              type='radio'
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className='hidden'
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && <span className='text-red-500 text-sm font-bold'>{errors.type.message}</span>}
    </div>
  );
};

export default TypeSection;
