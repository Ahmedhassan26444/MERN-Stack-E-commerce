import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllUsersResponse, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/api-types";
import type { User } from "../../types/types";
import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user` }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse , User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
  query: ({ userId, adminUserId }) => ({
    url: `${userId}?id=${adminUserId}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Users"],
}),
    allUsers: builder.query<AllUsersResponse, string>({
  query: (id) => `all?id=${id}`,
     providesTags:["Users"],
    }),
  }),
});
export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );

    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const { useLoginMutation, useDeleteUserMutation, useAllUsersQuery } = userAPI;