/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserDetails } from "@/utils/store";
import { loginInfoType } from "@/utils/types";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLoginHandle = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<loginInfoType>({
    email: "",
    password: "",
    role: "patient",
  });
  const { setUserDetail } = useUserDetails();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // checking email and password is empty or not
    if (!userDetails.email || !userDetails.password) {
      toast("Enter email, password!", {
        position: "top-center",
      });
      return;
    }
    // checking if email is valid or not
    if (!/^[\w\-\\.]+@([\w-]+\.)+[\w-]{2,}$/.test(userDetails?.email)) {
      toast("Enter valid email!", {
        position: "top-center",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await axios.post(
        `https://slotschedulingflowbackend.onrender.com/api/${userDetails.role}/login`,
        // `http://localhost:3000/api/${userDetails.role}/login`,
        {
          ...userDetails,
        }
      );

      setUserDetail(data?.data?.user);
      if (
        data?.data?.user?.role === "admin" ||
        data?.data?.user?.role === "patient"
      )
        navigate("/slot-scheduling");
      else navigate("/appointments");

      toast(data?.data?.message);
      setLoading(false);
    } catch (error: Error | any) {
      console.log("error i handle login", error);
      toast(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return { userDetails, setUserDetails, handleLogin, loading };
};

export default useLoginHandle;
