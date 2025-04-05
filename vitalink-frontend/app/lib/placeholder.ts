import { Chat, FormContents } from "./definitions";
export const chatSequence: Chat[] = [
  {
    id: "1",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    sender: "BOT",
    timestamp: "string",
  },
  {
    id: "2",
    message: "user msg",
    sender: "1",
    timestamp: "string",
  },
  {
    id: "3",
    message: "shorter lorem, supposed to be on the left",
    sender: "BOT",
    timestamp: "string",
  },
  {
    id: "4",
    message: "user msg",
    sender: "1",
    timestamp: "string",
  },
  {
    id: "5",
    message: "# Hi, *Pluto*!",
    sender: "BOT",
    timestamp: "string",
  },
];
export const formContentsPlaceholder: FormContents[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    birthday: "1990-01-01",
    gender: "Nam",
    phone: "0901234567",
    province: "Hà Nội",
    district: "Quận 1",
    ward: "Phường 1",
    address: "123 Nguyễn Văn Cừ",
    chuyenkhoa: "Khoa tim mạch",
    trieuchung: "dau bung",
    validated: false,
    dateCreated: "1",
    cccd:"1234567890"
  },
  {
    id: "2",
    name: "Trần Thị B",
    birthday: "1995-06-15",
    gender: "Nữ",
    phone: "0909876543",
    province: "TP. Hồ Chí Minh",
    district: "Quận 3",
    ward: "Phường 2",
    address: "456 Lê Thánh Tôn",
    chuyenkhoa: "Khoa nhi",
    trieuchung: "dau bung",
    validated: true,
    dateCreated: "2",
    cccd:"1234567890"
  },
  {
    id: "3",
    name: "Lê Văn C",
    birthday: "1980-03-20",
    gender: "Nam",
    phone: "0901112222",
    province: "Đà Nẵng",
    district: "Quận Hải Châu",
    ward: "Phường 3",
    address: "789 Trần Hưng Đạo",
    chuyenkhoa: "Khoa ung bướu",
    trieuchung: "dau bung",
    validated: false,
    dateCreated: "3",
    cccd: "3123456789"
  }
];