import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import GuestSection from "./GuestSection";
import FacilitiesSection from "./FacilitiesSection";
import TypeSection from "./TypeSection";
import ImagesSection from "./ImageSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();

  // const { handleSubmit } = formMethods;

  // const onSubmit = handleSubmit((formData: HotelFormData) => {});

  return (
    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={onSubmit}>
        <DetailSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        {/* <span className='flex justify-end'>
          <button disabled={isLoading} type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500'>
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span> */}
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
