export type userType = {
  name: string;
  email: string;
  role: string;
};

export type slot = {
  time: string;
  day: string;
  availability: boolean;
  filtertime: string;
  remarks: string;
};

export type loginInfoType = {
  email: string;
  password: string;
  role: string;
};

export type userDetails = {
  user: userType;
  setUserDetail: (user: userType) => void;
  logoutUser: () => void;
};

export type slotType = {
  remark: string;
  day: string;
  date: string;
  isAllocated: boolean;
  slotStartTime: string;
  physioName: string;
  _id: string;
};

export type createSlotType = {
  date: string;
  weekStart: string;
  weekEnd: string;
  slotStartTime: string;
  email: string;
  day: string;
  slotEndTime: string;
  remark: string;
};
