import { User2, BookOpen, MapPin, Clock } from "lucide-react-native";

export const weekDays = [
  { id: 1, day: "Sat", fullName: "Saturday" },
  { id: 2, day: "Sun", fullName: "Sunday" },
  { id: 3, day: "Mon", fullName: "Monday" },
  { id: 4, day: "Tue", fullName: "Tuesday" },
  { id: 5, day: "Wed", fullName: "Wednesday" },
];

export const periods = [
  // Saturday
  {
    id: 1,
    weekDay: 1, // Saturday
    startTime: "07:45 AM",
    endTime: "08:45 AM",
    subject: "Financial Accounting II",
    professor: "Abdirahman Aded Ahmed",
    room: "Room 201",
    type: "Lecture",
  },
  {
    id: 2,
    weekDay: 1,
    startTime: "08:45 AM",
    endTime: "09:45 AM",
    subject: "Business Statistics",
    professor: "Sarah Johnson",
    room: "Room 305",
    type: "Tutorial",
  },
  {
    id: 3,
    weekDay: 1,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    subject: "Corporate Finance",
    professor: "James White",
    room: "Lecture Hall B",
    type: "Seminar",
  },

  // Sunday
  {
    id: 1,
    weekDay: 2, // Sunday
    startTime: "10:15 AM",
    endTime: "11:15 AM",
    subject: "Marketing Principles",
    professor: "John Smith",
    room: "Lecture Hall A",
    type: "Lecture",
  },
  {
    id: 2,
    weekDay: 2,
    startTime: "11:15 AM",
    endTime: "12:15 PM",
    subject: "Economics 101",
    professor: "Michael Lee",
    room: "Room 405",
    type: "Seminar",
  },
  {
    id: 3,
    weekDay: 2,
    startTime: "01:00 PM",
    endTime: "02:00 PM",
    subject: "Quantitative Methods",
    professor: "Sophia Green",
    room: "Room 101",
    type: "Workshop",
  },

  // Monday
  {
    id: 1,
    weekDay: 3, // Monday
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    subject: "Business Ethics",
    professor: "Lisa Wang",
    room: "Room 202",
    type: "Workshop",
  },
  {
    id: 2,
    weekDay: 3,
    startTime: "10:30 AM",
    endTime: "11:30 AM",
    subject: "International Business",
    professor: "Robert Taylor",
    room: "Conference Room B",
    type: "Lecture",
  },
  {
    id: 3,
    weekDay: 3,
    startTime: "12:00 PM",
    endTime: "01:00 PM",
    subject: "Supply Chain Management",
    professor: "Oliver Brown",
    room: "Room 501",
    type: "Seminar",
  },

  // Tuesday
  {
    id: 1,
    weekDay: 4, // Tuesday
    startTime: "08:30 AM",
    endTime: "09:30 AM",
    subject: "Human Resources",
    professor: "Emily Brown",
    room: "Room 301",
    type: "Lecture",
  },
  {
    id: 2,
    weekDay: 4,
    startTime: "09:45 AM",
    endTime: "10:45 AM",
    subject: "Organizational Behavior",
    professor: "Charlotte Miller",
    room: "Room 302",
    type: "Tutorial",
  },
  {
    id: 3,
    weekDay: 4,
    startTime: "11:15 AM",
    endTime: "12:15 PM",
    subject: "Financial Analysis",
    professor: "Lucas Johnson",
    room: "Room 402",
    type: "Lecture",
  },

  // Wednesday
  {
    id: 1,
    weekDay: 5, // Wednesday
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    subject: "Strategic Management",
    professor: "David Wilson",
    room: "Room 404",
    type: "Case Study",
  },
  {
    id: 2,
    weekDay: 5,
    startTime: "11:30 AM",
    endTime: "12:30 PM",
    subject: "Project Management",
    professor: "Jennifer Davis",
    room: "Workshop Room C",
    type: "Practical",
  },
  {
    id: 3,
    weekDay: 5,
    startTime: "01:00 PM",
    endTime: "02:00 PM",
    subject: "Risk Assessment",
    professor: "Nathan Martinez",
    room: "Room 103",
    type: "Lecture",
  },

  // Thursday
  {
    id: 1,
    weekDay: 6, // Thursday
    startTime: "09:30 AM",
    endTime: "10:30 AM",
    subject: "Business Law",
    professor: "Emma Clark",
    room: "Room 304",
    type: "Lecture",
  },
  {
    id: 2,
    weekDay: 6,
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    subject: "Negotiation Skills",
    professor: "Daniel Lewis",
    room: "Room 203",
    type: "Workshop",
  },
  {
    id: 3,
    weekDay: 6,
    startTime: "01:30 PM",
    endTime: "02:30 PM",
    subject: "Entrepreneurship",
    professor: "Sophia Martinez",
    room: "Room 401",
    type: "Seminar",
  },

  // Friday
  {
    id: 1,
    weekDay: 7, // Friday
    startTime: "08:00 AM",
    endTime: "09:00 AM",
    subject: "Corporate Social Responsibility",
    professor: "William Adams",
    room: "Room 206",
    type: "Lecture",
  },
  {
    id: 2,
    weekDay: 7,
    startTime: "09:30 AM",
    endTime: "10:30 AM",
    subject: "Leadership and Innovation",
    professor: "Ava Scott",
    room: "Room 306",
    type: "Workshop",
  },
  {
    id: 3,
    weekDay: 7,
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    subject: "Performance Management",
    professor: "Elijah Walker",
    room: "Room 207",
    type: "Lecture",
  },
];

