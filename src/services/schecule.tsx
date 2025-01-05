import { axiosInstance } from "@/lib/axios";


export const getSchedules = async () => {
    const response = await axiosInstance.get("/periods");

    return response.data;
};

export const getScheduleById = async (id: string) => {
    const response = await axiosInstance.get(`/periods/${id}`);
    return response.data;
};

export const createSchedule = async (data: any) => {
    const response = await axiosInstance.post("/periods", data);
    return response.data;
};

export const updateSchedule = async (id: string, data: any) => {
    const response = await axiosInstance.patch(`/periods/${id}`, data);
    return response.data;
};

export const deleteSchedule = async (id: string) => {
    const response = await axiosInstance.delete(`/periods/${id}`);
    return response.data;
};