import { User2, BookOpen, MapPin, Clock } from "lucide-react-native";

export const weekDays = [
  { id: 1, day: "Sat", fullName: "Saturday" },
  { id: 2, day: "Sun", fullName: "Sunday" },
  { id: 3, day: "Mon", fullName: "Monday" },
  { id: 4, day: "Tue", fullName: "Tuesday" },
  { id: 5, day: "Wed", fullName: "Wednesday" },
];

export const periods = [
  {
    id: 1,
    weekDay: 1, // Saturday
    startTime: "07:45 AM",
    endTime: "08:45 AM",
    subject: "Financial Accounting II",
    professor: "Abdirahman Aded Ahmed",
    room: "Room 201",
    type: "Lecture"
  },
  {
    id: 2,
    weekDay: 1,
    startTime: "08:45 AM",
    endTime: "09:45 AM",
    subject: "Business Statistics",
    professor: "Sarah Johnson",
    room: "Room 305",
    type: "Tutorial"
  },
  {
    id: 1, // Reset to 1 for Sunday
    weekDay: 2,
    startTime: "10:15 AM",
    endTime: "11:15 AM",
    subject: "Marketing Principles",
    professor: "John Smith",
    room: "Lecture Hall A",
    type: "Lecture"
  },
  {
    id: 2,
    weekDay: 2,
    startTime: "11:15 AM",
    endTime: "12:15 PM",
    subject: "Economics 101",
    professor: "Michael Lee",
    room: "Room 405",
    type: "Seminar"
  },
  {
    id: 1, // Reset to 1 for Monday
    weekDay: 3,
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    subject: "Business Ethics",
    professor: "Lisa Wang",
    room: "Room 202",
    type: "Workshop"
  },
  {
    id: 2,
    weekDay: 3,
    startTime: "10:30 AM",
    endTime: "11:30 AM",
    subject: "International Business",
    professor: "Robert Taylor",
    room: "Conference Room B",
    type: "Lecture"
  },
  {
    id: 1, // Reset to 1 for Tuesday
    weekDay: 4,
    startTime: "08:30 AM",
    endTime: "09:30 AM",
    subject: "Human Resources",
    professor: "Emily Brown",
    room: "Room 301",
    type: "Lecture"
  },
  {
    id: 1, // Reset to 1 for Wednesday
    weekDay: 5,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    subject: "Strategic Management",
    professor: "David Wilson",
    room: "Room 404",
    type: "Case Study"
  },
  {
    id: 2,
    weekDay: 5,
    startTime: "11:30 AM",
    endTime: "12:30 PM",
    subject: "Project Management",
    professor: "Jennifer Davis",
    room: "Workshop Room C",
    type: "Practical"
  }
];
