export interface QRSessionData {
    class_id: string;
    period_id: string;
    qr_code: string;
    valid_from: string;
    valid_until: string;
    location: {
        type: "Point";
        coordinates: [number, number];
        radius: number;
    };
    status: string;
    createdBy: string;
    id: string;
}

export interface AttendanceVerificationPayload {
    student_id: string;
    qr_session_id: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    device_info: {
        device_id: string;
        device_type: string;
        ip_address: string;
    };
}
