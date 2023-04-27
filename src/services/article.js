// please do read the doc once to under stand this..............

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_RAPID_API_KEY; //when using VITE ...this is the way of using the env's...

// const options = {
//   method: "GET",
//   headers: {
//     "content-type": "application/octet-stream",
//     "X-RapidAPI-Key": "a821798f0fmsh15fd6f185e32b6dp1247d2jsn30d9c90bb6c8",
//     "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
//   },
// };

// for using api calls we are using createAPI of toolkit
export const articleApi = createApi({
  reducerPath: "articleApi",

  // base query for adding api and its options..
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",

    //setting up headers
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", apiKey);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );

      return headers;
    },
  }),
  // endpoints for calling on diff end points like ..../summary.... or /extract....or anything.
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }), //when we pass something-params form--- in url format always use encodeURIComponent--it will ignore the special charactars
  }),
});

// from end points it automatically create a hook.....
//here we are using lazy as we dont want to fire it as the app loads....means when we want it only then it will fire.
// we can also use the hook without Lazy keyword in it...useGetSummaryQuery..
export const { useLazyGetSummaryQuery } = articleApi;
