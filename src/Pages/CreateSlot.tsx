/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserDetails } from "@/utils/store";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type time = {
  startTime: string;
  endTime: string;
};

type SlotType = {
  monday: time[];
  tuesday: time[];
  wednesday: time[];
  thursday: time[];
  friday: time[];
  saturday: time[];
};

type typeofDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const CreateSlot = () => {
  const [slot, setSlot] = useState<SlotType>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<typeofDay>("monday");
  const [selected, setSelected] = useState<time[]>(slot[selectedDay]);
  const [defaultValue] = useState([
    {
      startTime: "09:00",
      endTime: "09:45",
    },
    {
      startTime: "09:15",
      endTime: "10:00",
    },
    {
      startTime: "09:30",
      endTime: "10:15",
    },
    {
      startTime: "09:45",
      endTime: "10:30",
    },
    {
      startTime: "10:00",
      endTime: "10:45",
    },
    {
      startTime: "10:15",
      endTime: "11:00",
    },
    {
      startTime: "10:30",
      endTime: "11:15",
    },
    {
      startTime: "10:45",
      endTime: "11:30",
    },
    {
      startTime: "11:00",
      endTime: "11:45",
    },
    {
      startTime: "11:15",
      endTime: "12:00",
    },
    {
      startTime: "11:30",
      endTime: "12:15",
    },
    {
      startTime: "11:45",
      endTime: "12:30",
    },
    {
      startTime: "12:00",
      endTime: "12:45",
    },
    {
      startTime: "12:15",
      endTime: "13:00",
    },
    {
      startTime: "12:30",
      endTime: "13:15",
    },
    {
      startTime: "12:45",
      endTime: "13:30",
    },
    {
      startTime: "13:00",
      endTime: "13:45",
    },
    {
      startTime: "13:15",
      endTime: "14:00",
    },
    {
      startTime: "13:30",
      endTime: "14:15",
    },
    {
      startTime: "13:45",
      endTime: "14:30",
    },
    {
      startTime: "14:00",
      endTime: "14:45",
    },
    {
      startTime: "14:15",
      endTime: "15:00",
    },
    {
      startTime: "14:30",
      endTime: "15:15",
    },
    {
      startTime: "14:45",
      endTime: "15:30",
    },
    {
      startTime: "15:00",
      endTime: "15:45",
    },
    {
      startTime: "15:15",
      endTime: "16:00",
    },
    {
      startTime: "15:30",
      endTime: "16:15",
    },
    {
      startTime: "15:45",
      endTime: "16:30",
    },
    {
      startTime: "16:00",
      endTime: "16:45",
    },
    {
      startTime: "16:15",
      endTime: "17:00",
    },
    {
      startTime: "16:30",
      endTime: "17:15",
    },
    {
      startTime: "16:45",
      endTime: "17:30",
    },
    {
      startTime: "17:00",
      endTime: "17:45",
    },
    {
      startTime: "17:15",
      endTime: "18:00",
    },
  ]);
  const navigate = useNavigate();
  const { user } = useUserDetails();

  //! adding/removing item from selected
  const addItemToSelected = (item: time) => {
    const isAlreadyExist = selected.findIndex((item2) => {
      return item2.startTime == item.startTime;
    });

    const arr = selected;
    if (isAlreadyExist !== -1) {
      arr.splice(isAlreadyExist, 1);
      setSelected(arr);
    } else setSelected([...selected, item]);

    setSlot({
      ...slot,
      [selectedDay]: [...slot[selectedDay], item],
    });
  };

  //! handle submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        // "http://localhost:3000/api/physio/slots"
        "https://slotschedulingflowbackend.onrender.com/api/physio/slots",
        {
          slot,
          email: user.email,
        }
      );

      setLoading(false);
      toast(res?.data?.message);
      navigate("/appointments");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <div>
        <select
          className="border text-xl capitalize font-medium text-black px-2 py-1 rounded-md bg-gray-200 shadow-lg outline-none"
          onChange={(e) => {
            if (
              e.target.value == "monday" ||
              e.target.value == "tuesday" ||
              e.target.value == "wednesday" ||
              e.target.value == "thursday" ||
              e.target.value == "friday" ||
              e.target.value == "saturday"
            ) {
              setSelectedDay(e.target.value);
              setSelected(slot[e.target.value]);
            }
          }}
        >
          {days.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </select>
      </div>
      <div className="flex flex-wrap w-full md:w-[90%] gap-4">
        {defaultValue.map((item) => {
          const isContains = selected.find((item2) => {
            return (
              (item2.startTime <= item.startTime &&
                item.startTime < item2.endTime) ||
              (item.endTime > item2.startTime && item.endTime < item2.endTime)
            );
          });

          const isCurrentTime = selected.find(
            (item2) => item2.startTime == item.startTime
          );
          return (
            <button
              disabled={isCurrentTime ? false : isContains ? true : false}
              className={`${isContains && "cursor-not-allowed text-gray-400"} ${
                isCurrentTime && "!bg-green-500 !cursor-pointer !text-black"
              } px-2 py-1 rounded-md text-xl font-medium`}
              onClick={() => {
                addItemToSelected(item);
              }}
              key={item.startTime}
            >
              {item.startTime}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          className={`px-4 py-2 bg-gray-300 shadow-lg rounded-md text-xl font-medium hover:bg-gray-400 transition-colors duration-300 ${
            loading && "cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <p>
          <span className="font-semibold">Disclaimer: </span>
          Only Click submit button when done with whole week slot avaiblability
        </p>
      </div>
    </div>
  );
};

export default CreateSlot;
