-- Tạo bảng
CREATE TABLE Patients (
    patient_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    gender VARCHAR(20),
    date_of_birth DATE,
    ethnicity VARCHAR(50),
    occupation VARCHAR(100),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PatientMedicalRecord (
    record_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES Patients(patient_id),
    chief_complaint TEXT,
    symptoms_description TEXT,
    self_history TEXT,
    family_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_location VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Locations (
    location_id SERIAL PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL,
    building VARCHAR(50),
    floor VARCHAR(20),
    room_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Doctors (
    doctor_id SERIAL PRIMARY KEY,
    department_id INTEGER REFERENCES Departments(department_id),
    full_name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    qualification VARCHAR(100),
    availability_schedule TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE TestTypes (
    test_type_id SERIAL PRIMARY KEY,
    test_name VARCHAR(100) NOT NULL,
    preparation_instructions TEXT,
    contraindication_description TEXT,
    duration_minutes INTEGER,
    price DECIMAL(10,2),
    default_location_id INTEGER REFERENCES Locations(location_id),
    department_id INTEGER REFERENCES Departments(department_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES Patients(patient_id),
    doctor_id INTEGER REFERENCES Doctors(doctor_id), -- Null nếu là cuộc hẹn xét nghiệm không có bác sĩ
    test_type_id INTEGER REFERENCES TestTypes(test_type_id), -- Null nếu là cuộc hẹn khám chuyên khoa
    department_id INTEGER REFERENCES Departments(department_id),
    location_id INTEGER REFERENCES Locations(location_id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason TEXT,
    status VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm dữ liệu mẫu
-- Bệnh nhân
INSERT INTO Patients (full_name, gender, date_of_birth, ethnicity, occupation, address, phone_number)
VALUES 
('Nguyễn Văn An', 'Nam', '1985-05-15', 'Kinh', 'Kỹ sư', 'Số 123 Nguyễn Huệ, Quận 1, TP HCM', '0901234567'),
('Trần Thị Bình', 'Nữ', '1990-08-21', 'Kinh', 'Giáo viên', 'Số 456 Lê Lợi, Quận 3, TP HCM', '0912345678'),
('Lê Văn Cao', 'Nam', '1978-03-10', 'Kinh', 'Doanh nhân', 'Số 789 Hai Bà Trưng, Quận 10, TP HCM', '0923456789'),
('Phạm Thị Dung', 'Nữ', '1995-11-23', 'Kinh', 'Sinh viên', 'Số 101 Võ Văn Tần, Quận 5, TP HCM', '0934567890'),
('Hoàng Văn Em', 'Nam', '1965-07-30', 'Kinh', 'Về hưu', 'Số 202 Pasteur, Quận 1, TP HCM', '0945678901');

-- Khoa
INSERT INTO Departments (department_name, department_location, description)
VALUES 
('Khoa Tim mạch', 'Tòa nhà A, Tầng 2', 'Khoa chuyên về tim và hệ thống tim mạch'),
('Khoa Thần kinh', 'Tòa nhà B, Tầng 3', 'Khoa chuyên về não, cột sống và hệ thần kinh'),
('Khoa Chỉnh hình', 'Tòa nhà A, Tầng 1', 'Khoa chuyên về xương, khớp và cơ'),
('Khoa Chẩn đoán hình ảnh', 'Tòa nhà C, Tầng trệt', 'Khoa chụp chiếu và chẩn đoán hình ảnh'),
('Khoa Xét nghiệm', 'Tòa nhà C, Tầng hầm', 'Khoa xét nghiệm và phân tích y tế');

-- Địa điểm
INSERT INTO Locations (location_name, building, floor, room_number)
VALUES 
('Phòng khám 1', 'Tòa nhà A', 'Tầng 2', 'A201'),
('Phòng khám 2', 'Tòa nhà A', 'Tầng 2', 'A202'),
('Phòng xét nghiệm thần kinh', 'Tòa nhà B', 'Tầng 3', 'B301'),
('Phòng X-quang', 'Tòa nhà C', 'Tầng trệt', 'C101'),
('Trung tâm xét nghiệm máu', 'Tòa nhà C', 'Tầng hầm', 'C001'),
('Trung tâm chụp MRI', 'Tòa nhà C', 'Tầng trệt', 'C102'),
('Phòng chụp CT', 'Tòa nhà C', 'Tầng trệt', 'C103'),
('Phòng khám chỉnh hình', 'Tòa nhà A', 'Tầng 1', 'A101');

-- Bác sĩ
INSERT INTO Doctors (department_id, full_name, specialization, qualification, availability_schedule)
VALUES 
(1, 'BS. Nguyễn Văn Xuân', 'Tim mạch', 'Tiến sĩ Y khoa, Chuyên khoa Tim mạch', 'Thứ Hai, Thứ Tư, Thứ Sáu: 8:00-16:00'),
(1, 'BS. Trần Thị Yến', 'Phẫu thuật tim', 'Bác sĩ Y khoa, Chuyên khoa Phẫu thuật Tim', 'Thứ Ba, Thứ Năm: 8:00-16:00'),
(2, 'BS. Phạm Văn Hải', 'Thần kinh', 'Bác sĩ Y khoa, Chuyên khoa Thần kinh', 'Thứ Hai đến Thứ Sáu: 8:00-12:00'),
(3, 'BS. Lê Thị Mai', 'Chỉnh hình', 'Bác sĩ Y khoa, Chuyên khoa Phẫu thuật Chỉnh hình', 'Thứ Hai, Thứ Ba, Thứ Năm: 13:00-17:00'),
(4, 'BS. Hoàng Minh Tuấn', 'Chẩn đoán hình ảnh', 'Bác sĩ Y khoa, Chuyên khoa Chẩn đoán hình ảnh', 'Thứ Hai đến Thứ Sáu: 8:00-16:00');

-- Hồ sơ bệnh án
INSERT INTO PatientMedicalRecord (patient_id, chief_complaint, symptoms_description, self_history, family_history)
VALUES 
(1, 'Đau ngực', 'Đau ngực từng cơn, nặng hơn khi vận động', 'Tăng huyết áp 5 năm', 'Bố mất vì đau tim lúc 60 tuổi'),
(2, 'Đau đầu', 'Đau đầu dữ dội kèm rối loạn thị giác', 'Bị đau nửa đầu từ tuổi thiếu niên', 'Mẹ có tiền sử đau nửa đầu'),
(3, 'Đau lưng', 'Đau thắt lưng, khó đứng lâu', 'Chấn thương lưng cách đây 10 năm', 'Không có tiền sử gia đình đáng kể'),
(4, 'Chóng mặt', 'Thỉnh thoảng chóng mặt và ngất', 'Huyết áp thấp', 'Chị gái có triệu chứng tương tự'),
(5, 'Đau khớp', 'Đau đầu gối, đặc biệt vào buổi sáng', 'Được chẩn đoán viêm khớp 3 năm trước', 'Nhiều thành viên gia đình bị viêm khớp');

-- Loại xét nghiệm
INSERT INTO TestTypes (test_name, preparation_instructions, contraindication_description, duration_minutes, price, default_location_id, department_id)
VALUES 
('Công thức máu toàn phần', 'Nhịn ăn 8 giờ trước xét nghiệm', 'Không có chống chỉ định cụ thể', 15, 150000, 5, 5),
('Điện tâm đồ (ECG)', 'Không cần chuẩn bị đặc biệt', 'Không có chống chỉ định cụ thể', 20, 300000, 1, 1),
('Chụp MRI não', 'Tháo bỏ tất cả đồ kim loại. Thông báo cho kỹ thuật viên về bất kỳ thiết bị cấy ghép nào', 'Cấy ghép kim loại, sợ không gian hẹp', 45, 2500000, 6, 4),
('Chụp X-quang ngực', 'Tháo bỏ trang sức và vật kim loại ở vùng ngực', 'Phụ nữ mang thai', 15, 350000, 4, 4),
('Chụp CT bụng', 'Nhịn ăn 4 giờ. Có thể cần thuốc cản quang', 'Dị ứng với thuốc cản quang, vấn đề về thận', 30, 1800000, 7, 4);

-- Cuộc hẹn khám
INSERT INTO appointments (patient_id, doctor_id, test_type_id, department_id, location_id, appointment_date, appointment_time, reason, status, notes)
VALUES 
-- Cuộc hẹn của bệnh nhân 1 (cả khám bác sĩ và xét nghiệm)
(1, 1, NULL, 1, 1, '2025-04-10', '09:00:00', 'Khám tim định kỳ', 'Đã lên lịch', 'Tái khám từ lần trước'),
(1, NULL, 1, 5, 5, '2025-04-10', '10:30:00', 'Xét nghiệm máu cho bệnh tim', 'Đã lên lịch', 'Sau khi khám với bác sĩ'),
(1, NULL, 2, 1, 1, '2025-04-10', '11:15:00', 'Kiểm tra điện tâm đồ', 'Đã lên lịch', 'Theo yêu cầu của BS. Xuân'),

-- Cuộc hẹn của bệnh nhân 2
(2, 3, NULL, 2, 3, '2025-04-11', '09:00:00', 'Tư vấn về đau đầu', 'Đã lên lịch', 'Bệnh nhân mới được giới thiệu'),
(2, NULL, 3, 4, 6, '2025-04-11', '10:30:00', 'Chụp MRI não', 'Đã lên lịch', 'Điều tra nguyên nhân đau đầu'),

-- Cuộc hẹn của bệnh nhân 3
(3, 4, NULL, 3, 8, '2025-04-09', '14:00:00', 'Đánh giá đau lưng', 'Đã hoàn thành', 'Bệnh nhân báo cáo có tiến triển'),
(3, NULL, 4, 4, 4, '2025-04-09', '15:30:00', 'Chụp X-quang cột sống', 'Đã hoàn thành', 'Kết quả bình thường'),

-- Cuộc hẹn của bệnh nhân 4
(4, 1, NULL, 1, 2, '2025-04-12', '08:30:00', 'Đánh giá chóng mặt', 'Đã lên lịch', 'Tư vấn lần đầu'),
(4, NULL, 1, 5, 5, '2025-04-12', '10:00:00', 'Xét nghiệm máu', 'Đã lên lịch', 'Kiểm tra thiếu máu'),
(4, NULL, 2, 1, 1, '2025-04-12', '11:00:00', 'Kiểm tra điện tâm đồ', 'Đã lên lịch', 'Kiểm tra vấn đề nhịp tim'),

-- Cuộc hẹn của bệnh nhân 5
(5, 4, NULL, 3, 8, '2025-04-08', '13:30:00', 'Tư vấn đau đầu gối', 'Đã đổi lịch', 'Bệnh nhân yêu cầu đổi lịch'),
(5, NULL, 4, 4, 4, '2025-04-14', '09:15:00', 'Chụp X-quang đầu gối', 'Đã lên lịch', 'Cả hai đầu gối');

-- Hàm cập nhật thời gian thay đổi
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Tạo các trigger cho tất cả các bảng
CREATE TRIGGER update_patients_modtime
BEFORE UPDATE ON Patients
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_patient_medical_record_modtime
BEFORE UPDATE ON PatientMedicalRecord
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_departments_modtime
BEFORE UPDATE ON Departments
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_locations_modtime
BEFORE UPDATE ON Locations
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_doctors_modtime
BEFORE UPDATE ON Doctors
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_test_types_modtime
BEFORE UPDATE ON TestTypes
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_appointments_modtime
BEFORE UPDATE ON Appointments
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();