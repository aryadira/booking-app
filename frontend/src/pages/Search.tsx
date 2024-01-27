import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";

import * as apiClient from "../api-client";
import { useState } from "react";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () => {
    apiClient.searchHotels(searchParams);
  });

  return <>Search page</>;
};

export default Search;
