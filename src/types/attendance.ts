export interface QRSessionData {
    id: string;
    valid_from: string;
    valid_until: string;
    location: {
        type: "Point";
        coordinates: [number, number]; // [latitude, longitude]
    };
    allowed_radius?: number;
    class_id: string;
    period_id: string;
    qr_code: string;
    status: string;
    createdBy: string;
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
