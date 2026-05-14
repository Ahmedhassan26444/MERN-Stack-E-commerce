import { type MessageResponse } from "../types/api-types";
import {   type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { type SerializedError } from "@reduxjs/toolkit";
import {  type NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";


type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponse = error.data as MessageResponse;
    toast.error(messageResponse.message);
  }
};