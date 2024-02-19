import { create } from "zustand";
import { userDetails, userType } from "./types";

const userDefault: userType = {
  name: "",
  email: "",
  role: "",
};

export const useUserDetails = create<userDetails>((set) => {
  const storedUserDetails = sessionStorage.getItem("userDetails");
  return {
    user: storedUserDetails ? JSON.parse(storedUserDetails) : userDefault,
    setUserDetail: (userdata: userType) =>
      set(() => {
        sessionStorage.setItem("userDetails", JSON.stringify(userdata));
        return {
          user: userdata,
        };
      }),

    logoutUser: () =>
      set(() => {
        sessionStorage.removeItem("userDetails");
        return { user: userDefault };
      }),
  };
});
