--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_modified_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_modified_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_modified_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    appointment_id integer NOT NULL,
    patient_id integer,
    doctor_id integer,
    test_type_id integer,
    department_id integer,
    location_id integer,
    appointment_date date NOT NULL,
    appointment_time time without time zone NOT NULL,
    reason text,
    status character varying(20) NOT NULL,
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appointments_appointment_id_seq OWNER TO postgres;

--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_appointment_id_seq OWNED BY public.appointments.appointment_id;


--
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    department_id integer NOT NULL,
    department_name character varying(100) NOT NULL,
    department_location character varying(100),
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- Name: departments_department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departments_department_id_seq OWNER TO postgres;

--
-- Name: departments_department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_department_id_seq OWNED BY public.departments.department_id;


--
-- Name: doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctors (
    doctor_id integer NOT NULL,
    department_id integer,
    full_name character varying(100) NOT NULL,
    specialization character varying(100),
    qualification character varying(100),
    availability_schedule text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.doctors OWNER TO postgres;

--
-- Name: doctors_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctors_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doctors_doctor_id_seq OWNER TO postgres;

--
-- Name: doctors_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctors_doctor_id_seq OWNED BY public.doctors.doctor_id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    location_id integer NOT NULL,
    location_name character varying(100) NOT NULL,
    building character varying(50),
    floor character varying(20),
    room_number character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_location_id_seq OWNER TO postgres;

--
-- Name: locations_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_location_id_seq OWNED BY public.locations.location_id;


--
-- Name: patientmedicalrecord; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patientmedicalrecord (
    record_id integer NOT NULL,
    patient_id integer,
    chief_complaint text,
    symptoms_description text,
    self_history text,
    family_history text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.patientmedicalrecord OWNER TO postgres;

--
-- Name: patientmedicalrecord_record_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patientmedicalrecord_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patientmedicalrecord_record_id_seq OWNER TO postgres;

--
-- Name: patientmedicalrecord_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patientmedicalrecord_record_id_seq OWNED BY public.patientmedicalrecord.record_id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    patient_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    gender character varying(20),
    date_of_birth date,
    ethnicity character varying(50),
    occupation character varying(100),
    address character varying(255),
    phone_number character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- Name: patients_patient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patients_patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patients_patient_id_seq OWNER TO postgres;

--
-- Name: patients_patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patients_patient_id_seq OWNED BY public.patients.patient_id;


--
-- Name: testtypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testtypes (
    test_type_id integer NOT NULL,
    test_name character varying(100) NOT NULL,
    preparation_instructions text,
    contraindication_description text,
    duration_minutes integer,
    price numeric(10,2),
    default_location_id integer,
    department_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.testtypes OWNER TO postgres;

--
-- Name: testtypes_test_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.testtypes_test_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.testtypes_test_type_id_seq OWNER TO postgres;

--
-- Name: testtypes_test_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.testtypes_test_type_id_seq OWNED BY public.testtypes.test_type_id;


--
-- Name: appointments appointment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_id SET DEFAULT nextval('public.appointments_appointment_id_seq'::regclass);


--
-- Name: departments department_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN department_id SET DEFAULT nextval('public.departments_department_id_seq'::regclass);


--
-- Name: doctors doctor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctors_doctor_id_seq'::regclass);


--
-- Name: locations location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN location_id SET DEFAULT nextval('public.locations_location_id_seq'::regclass);


--
-- Name: patientmedicalrecord record_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patientmedicalrecord ALTER COLUMN record_id SET DEFAULT nextval('public.patientmedicalrecord_record_id_seq'::regclass);


--
-- Name: patients patient_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients ALTER COLUMN patient_id SET DEFAULT nextval('public.patients_patient_id_seq'::regclass);


--
-- Name: testtypes test_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testtypes ALTER COLUMN test_type_id SET DEFAULT nextval('public.testtypes_test_type_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (appointment_id, patient_id, doctor_id, test_type_id, department_id, location_id, appointment_date, appointment_time, reason, status, notes, created_at, updated_at) FROM stdin;
1	1	1	\N	1	1	2025-04-10	09:00:00	Khám tim định kỳ	Đã lên lịch	Tái khám từ lần trước	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
2	1	\N	1	5	5	2025-04-10	10:30:00	Xét nghiệm máu cho bệnh tim	Đã lên lịch	Sau khi khám với bác sĩ	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
3	1	\N	2	1	1	2025-04-10	11:15:00	Kiểm tra điện tâm đồ	Đã lên lịch	Theo yêu cầu của BS. Xuân	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
4	2	3	\N	2	3	2025-04-11	09:00:00	Tư vấn về đau đầu	Đã lên lịch	Bệnh nhân mới được giới thiệu	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
5	2	\N	3	4	6	2025-04-11	10:30:00	Chụp MRI não	Đã lên lịch	Điều tra nguyên nhân đau đầu	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
6	3	4	\N	3	8	2025-04-09	14:00:00	Đánh giá đau lưng	Đã hoàn thành	Bệnh nhân báo cáo có tiến triển	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
7	3	\N	4	4	4	2025-04-09	15:30:00	Chụp X-quang cột sống	Đã hoàn thành	Kết quả bình thường	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
8	4	1	\N	1	2	2025-04-12	08:30:00	Đánh giá chóng mặt	Đã lên lịch	Tư vấn lần đầu	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
9	4	\N	1	5	5	2025-04-12	10:00:00	Xét nghiệm máu	Đã lên lịch	Kiểm tra thiếu máu	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
10	4	\N	2	1	1	2025-04-12	11:00:00	Kiểm tra điện tâm đồ	Đã lên lịch	Kiểm tra vấn đề nhịp tim	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
11	5	4	\N	3	8	2025-04-08	13:30:00	Tư vấn đau đầu gối	Đã đổi lịch	Bệnh nhân yêu cầu đổi lịch	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
12	5	\N	4	4	4	2025-04-14	09:15:00	Chụp X-quang đầu gối	Đã lên lịch	Cả hai đầu gối	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
16	2	1	1	1	1	2025-04-07	19:37:13.879	testing	string	string	2025-04-08 02:38:47.578658	2025-04-08 02:40:10.138664
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (department_id, department_name, department_location, description, created_at, updated_at) FROM stdin;
1	Khoa Tim mạch	Tòa nhà A, Tầng 2	Khoa chuyên về tim và hệ thống tim mạch	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
2	Khoa Thần kinh	Tòa nhà B, Tầng 3	Khoa chuyên về não, cột sống và hệ thần kinh	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
3	Khoa Chỉnh hình	Tòa nhà A, Tầng 1	Khoa chuyên về xương, khớp và cơ	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
4	Khoa Chẩn đoán hình ảnh	Tòa nhà C, Tầng trệt	Khoa chụp chiếu và chẩn đoán hình ảnh	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
5	Khoa Xét nghiệm	Tòa nhà C, Tầng hầm	Khoa xét nghiệm và phân tích y tế	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
\.


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctors (doctor_id, department_id, full_name, specialization, qualification, availability_schedule, created_at, updated_at) FROM stdin;
1	1	BS. Nguyễn Văn Xuân	Tim mạch	Tiến sĩ Y khoa, Chuyên khoa Tim mạch	Thứ Hai, Thứ Tư, Thứ Sáu: 8:00-16:00	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
2	1	BS. Trần Thị Yến	Phẫu thuật tim	Bác sĩ Y khoa, Chuyên khoa Phẫu thuật Tim	Thứ Ba, Thứ Năm: 8:00-16:00	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
3	2	BS. Phạm Văn Hải	Thần kinh	Bác sĩ Y khoa, Chuyên khoa Thần kinh	Thứ Hai đến Thứ Sáu: 8:00-12:00	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
4	3	BS. Lê Thị Mai	Chỉnh hình	Bác sĩ Y khoa, Chuyên khoa Phẫu thuật Chỉnh hình	Thứ Hai, Thứ Ba, Thứ Năm: 13:00-17:00	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
5	4	BS. Hoàng Minh Tuấn	Chẩn đoán hình ảnh	Bác sĩ Y khoa, Chuyên khoa Chẩn đoán hình ảnh	Thứ Hai đến Thứ Sáu: 8:00-16:00	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (location_id, location_name, building, floor, room_number, created_at, updated_at) FROM stdin;
1	Phòng khám 1	Tòa nhà A	Tầng 2	A201	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
2	Phòng khám 2	Tòa nhà A	Tầng 2	A202	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
3	Phòng xét nghiệm thần kinh	Tòa nhà B	Tầng 3	B301	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
4	Phòng X-quang	Tòa nhà C	Tầng trệt	C101	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
5	Trung tâm xét nghiệm máu	Tòa nhà C	Tầng hầm	C001	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
6	Trung tâm chụp MRI	Tòa nhà C	Tầng trệt	C102	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
7	Phòng chụp CT	Tòa nhà C	Tầng trệt	C103	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
8	Phòng khám chỉnh hình	Tòa nhà A	Tầng 1	A101	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
\.


--
-- Data for Name: patientmedicalrecord; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patientmedicalrecord (record_id, patient_id, chief_complaint, symptoms_description, self_history, family_history, created_at, updated_at) FROM stdin;
1	1	Đau ngực	Đau ngực từng cơn, nặng hơn khi vận động	Tăng huyết áp 5 năm	Bố mất vì đau tim lúc 60 tuổi	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
2	2	Đau đầu	Đau đầu dữ dội kèm rối loạn thị giác	Bị đau nửa đầu từ tuổi thiếu niên	Mẹ có tiền sử đau nửa đầu	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
3	3	Đau lưng	Đau thắt lưng, khó đứng lâu	Chấn thương lưng cách đây 10 năm	Không có tiền sử gia đình đáng kể	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
4	4	Chóng mặt	Thỉnh thoảng chóng mặt và ngất	Huyết áp thấp	Chị gái có triệu chứng tương tự	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
5	5	Đau khớp	Đau đầu gối, đặc biệt vào buổi sáng	Được chẩn đoán viêm khớp 3 năm trước	Nhiều thành viên gia đình bị viêm khớp	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patients (patient_id, full_name, gender, date_of_birth, ethnicity, occupation, address, phone_number, created_at, updated_at) FROM stdin;
1	Nguyễn Văn An	Nam	1985-05-15	Kinh	Kỹ sư	Số 123 Nguyễn Huệ, Quận 1, TP HCM	0901234567	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
2	Trần Thị Bình	Nữ	1990-08-21	Kinh	Giáo viên	Số 456 Lê Lợi, Quận 3, TP HCM	0912345678	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
3	Lê Văn Cao	Nam	1978-03-10	Kinh	Doanh nhân	Số 789 Hai Bà Trưng, Quận 10, TP HCM	0923456789	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
4	Phạm Thị Dung	Nữ	1995-11-23	Kinh	Sinh viên	Số 101 Võ Văn Tần, Quận 5, TP HCM	0934567890	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
5	Hoàng Văn Em	Nam	1965-07-30	Kinh	Về hưu	Số 202 Pasteur, Quận 1, TP HCM	0945678901	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
\.


--
-- Data for Name: testtypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testtypes (test_type_id, test_name, preparation_instructions, contraindication_description, duration_minutes, price, default_location_id, department_id, created_at, updated_at) FROM stdin;
1	Công thức máu toàn phần	Nhịn ăn 8 giờ trước xét nghiệm	Không có chống chỉ định cụ thể	15	150000.00	5	5	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
2	Điện tâm đồ (ECG)	Không cần chuẩn bị đặc biệt	Không có chống chỉ định cụ thể	20	300000.00	1	1	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
3	Chụp MRI não	Tháo bỏ tất cả đồ kim loại. Thông báo cho kỹ thuật viên về bất kỳ thiết bị cấy ghép nào	Cấy ghép kim loại, sợ không gian hẹp	45	2500000.00	6	4	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
4	Chụp X-quang ngực	Tháo bỏ trang sức và vật kim loại ở vùng ngực	Phụ nữ mang thai	15	350000.00	4	4	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
5	Chụp CT bụng	Nhịn ăn 4 giờ. Có thể cần thuốc cản quang	Dị ứng với thuốc cản quang, vấn đề về thận	30	1800000.00	7	4	2025-04-07 23:48:59.068008	2025-04-07 23:48:59.068008
\.


--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_appointment_id_seq', 16, true);


--
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_department_id_seq', 5, true);


--
-- Name: doctors_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctors_doctor_id_seq', 5, true);


--
-- Name: locations_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_location_id_seq', 8, true);


--
-- Name: patientmedicalrecord_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patientmedicalrecord_record_id_seq', 5, true);


--
-- Name: patients_patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patients_patient_id_seq', 6, true);


--
-- Name: testtypes_test_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.testtypes_test_type_id_seq', 5, true);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (appointment_id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (department_id);


--
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);


--
-- Name: patientmedicalrecord patientmedicalrecord_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patientmedicalrecord
    ADD CONSTRAINT patientmedicalrecord_pkey PRIMARY KEY (record_id);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (patient_id);


--
-- Name: testtypes testtypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testtypes
    ADD CONSTRAINT testtypes_pkey PRIMARY KEY (test_type_id);


--
-- Name: appointments update_appointments_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_appointments_modtime BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- Name: departments update_departments_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_departments_modtime BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- Name: doctors update_doctors_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_doctors_modtime BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- Name: locations update_locations_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_locations_modtime BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- Name: patientmedicalrecord update_patient_medical_record_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_patient_medical_record_modtime BEFORE UPDATE ON public.patientmedicalrecord FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- Name: patients update_patients_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_patients_modtime BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- Name: testtypes update_test_types_modtime; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_test_types_modtime BEFORE UPDATE ON public.testtypes FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- Name: appointments appointments_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- Name: appointments appointments_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(doctor_id);


--
-- Name: appointments appointments_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(location_id);


--
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);


--
-- Name: appointments appointments_test_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_test_type_id_fkey FOREIGN KEY (test_type_id) REFERENCES public.testtypes(test_type_id);


--
-- Name: doctors doctors_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- Name: patientmedicalrecord patientmedicalrecord_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patientmedicalrecord
    ADD CONSTRAINT patientmedicalrecord_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);


--
-- Name: testtypes testtypes_default_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testtypes
    ADD CONSTRAINT testtypes_default_location_id_fkey FOREIGN KEY (default_location_id) REFERENCES public.locations(location_id);


--
-- Name: testtypes testtypes_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testtypes
    ADD CONSTRAINT testtypes_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- PostgreSQL database dump complete
--
