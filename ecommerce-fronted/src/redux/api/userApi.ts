import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../store";
import type { MessageResponse } from "../../types/api-types";
import type { User } from "firebase/auth";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/user` }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse , User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation } = userAPI;