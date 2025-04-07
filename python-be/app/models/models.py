from typing import List, Optional

from sqlalchemy import Date, DateTime, ForeignKeyConstraint, Integer, Numeric, PrimaryKeyConstraint, String, Text, Time, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
import decimal

class Base(DeclarativeBase):
    pass


class Departments(Base):
    __tablename__ = 'departments'
    __table_args__ = (
        PrimaryKeyConstraint('department_id', name='departments_pkey'),
    )

    department_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    department_name: Mapped[str] = mapped_column(String(100))
    department_location: Mapped[Optional[str]] = mapped_column(String(100))
    description: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    doctors: Mapped[List['Doctors']] = relationship('Doctors', back_populates='department')
    testtypes: Mapped[List['Testtypes']] = relationship('Testtypes', back_populates='department')
    appointments: Mapped[List['Appointments']] = relationship('Appointments', back_populates='department')


class Locations(Base):
    __tablename__ = 'locations'
    __table_args__ = (
        PrimaryKeyConstraint('location_id', name='locations_pkey'),
    )

    location_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    location_name: Mapped[str] = mapped_column(String(100))
    building: Mapped[Optional[str]] = mapped_column(String(50))
    floor: Mapped[Optional[str]] = mapped_column(String(20))
    room_number: Mapped[Optional[str]] = mapped_column(String(20))
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    testtypes: Mapped[List['Testtypes']] = relationship('Testtypes', back_populates='default_location')
    appointments: Mapped[List['Appointments']] = relationship('Appointments', back_populates='location')


class Patients(Base):
    __tablename__ = 'patients'
    __table_args__ = (
        PrimaryKeyConstraint('patient_id', name='patients_pkey'),
    )

    patient_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    full_name: Mapped[str] = mapped_column(String(100))
    gender: Mapped[Optional[str]] = mapped_column(String(20))
    date_of_birth: Mapped[Optional[datetime.date]] = mapped_column(Date)
    ethnicity: Mapped[Optional[str]] = mapped_column(String(50))
    occupation: Mapped[Optional[str]] = mapped_column(String(100))
    address: Mapped[Optional[str]] = mapped_column(String(255))
    phone_number: Mapped[Optional[str]] = mapped_column(String(20))
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    patientmedicalrecord: Mapped[List['Patientmedicalrecord']] = relationship('Patientmedicalrecord', back_populates='patient')
    appointments: Mapped[List['Appointments']] = relationship('Appointments', back_populates='patient')


class Doctors(Base):
    __tablename__ = 'doctors'
    __table_args__ = (
        ForeignKeyConstraint(['department_id'], ['departments.department_id'], name='doctors_department_id_fkey'),
        PrimaryKeyConstraint('doctor_id', name='doctors_pkey')
    )

    doctor_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    full_name: Mapped[str] = mapped_column(String(100))
    department_id: Mapped[Optional[int]] = mapped_column(Integer)
    specialization: Mapped[Optional[str]] = mapped_column(String(100))
    qualification: Mapped[Optional[str]] = mapped_column(String(100))
    availability_schedule: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    department: Mapped[Optional['Departments']] = relationship('Departments', back_populates='doctors')
    appointments: Mapped[List['Appointments']] = relationship('Appointments', back_populates='doctor')


class Patientmedicalrecord(Base):
    __tablename__ = 'patientmedicalrecord'
    __table_args__ = (
        ForeignKeyConstraint(['patient_id'], ['patients.patient_id'], name='patientmedicalrecord_patient_id_fkey'),
        PrimaryKeyConstraint('record_id', name='patientmedicalrecord_pkey')
    )

    record_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    patient_id: Mapped[Optional[int]] = mapped_column(Integer)
    chief_complaint: Mapped[Optional[str]] = mapped_column(Text)
    symptoms_description: Mapped[Optional[str]] = mapped_column(Text)
    self_history: Mapped[Optional[str]] = mapped_column(Text)
    family_history: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    patient: Mapped[Optional['Patients']] = relationship('Patients', back_populates='patientmedicalrecord')


class Testtypes(Base):
    __tablename__ = 'testtypes'
    __table_args__ = (
        ForeignKeyConstraint(['default_location_id'], ['locations.location_id'], name='testtypes_default_location_id_fkey'),
        ForeignKeyConstraint(['department_id'], ['departments.department_id'], name='testtypes_department_id_fkey'),
        PrimaryKeyConstraint('test_type_id', name='testtypes_pkey')
    )

    test_type_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    test_name: Mapped[str] = mapped_column(String(100))
    preparation_instructions: Mapped[Optional[str]] = mapped_column(Text)
    contraindication_description: Mapped[Optional[str]] = mapped_column(Text)
    duration_minutes: Mapped[Optional[int]] = mapped_column(Integer)
    price: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(10, 2))
    default_location_id: Mapped[Optional[int]] = mapped_column(Integer)
    department_id: Mapped[Optional[int]] = mapped_column(Integer)
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    default_location: Mapped[Optional['Locations']] = relationship('Locations', back_populates='testtypes')
    department: Mapped[Optional['Departments']] = relationship('Departments', back_populates='testtypes')
    appointments: Mapped[List['Appointments']] = relationship('Appointments', back_populates='test_type')


class Appointments(Base):
    __tablename__ = 'appointments'
    __table_args__ = (
        ForeignKeyConstraint(['department_id'], ['departments.department_id'], name='appointments_department_id_fkey'),
        ForeignKeyConstraint(['doctor_id'], ['doctors.doctor_id'], name='appointments_doctor_id_fkey'),
        ForeignKeyConstraint(['location_id'], ['locations.location_id'], name='appointments_location_id_fkey'),
        ForeignKeyConstraint(['patient_id'], ['patients.patient_id'], name='appointments_patient_id_fkey'),
        ForeignKeyConstraint(['test_type_id'], ['testtypes.test_type_id'], name='appointments_test_type_id_fkey'),
        PrimaryKeyConstraint('appointment_id', name='appointments_pkey')
    )

    appointment_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    appointment_date: Mapped[datetime.date] = mapped_column(Date)
    appointment_time: Mapped[datetime.time] = mapped_column(Time)
    status: Mapped[str] = mapped_column(String(20))
    patient_id: Mapped[Optional[int]] = mapped_column(Integer)
    doctor_id: Mapped[Optional[int]] = mapped_column(Integer)
    test_type_id: Mapped[Optional[int]] = mapped_column(Integer)
    department_id: Mapped[Optional[int]] = mapped_column(Integer)
    location_id: Mapped[Optional[int]] = mapped_column(Integer)
    reason: Mapped[Optional[str]] = mapped_column(Text)
    notes: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    department: Mapped[Optional['Departments']] = relationship('Departments', back_populates='appointments')
    doctor: Mapped[Optional['Doctors']] = relationship('Doctors', back_populates='appointments')
    location: Mapped[Optional['Locations']] = relationship('Locations', back_populates='appointments')
    patient: Mapped[Optional['Patients']] = relationship('Patients', back_populates='appointments')
    test_type: Mapped[Optional['Testtypes']] = relationship('Testtypes', back_populates='appointments')
