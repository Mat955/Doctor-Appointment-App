import Image from "next/image";
import Link from "next/link";
import React from "react";
import {getAppointment} from "../../../../../lib/actions/appointment.actions";
import {Doctors} from "../../../../../../constants";
import {formatDateTime} from "../../../../../../lib/utils";
import {Button} from "../../../../../components/ui/button";

const SuccessPage = async ({
  params: {userId},
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='success-img'
            width={1000}
            height={1000}
            className='h-10 w-fit'
          />
        </Link>
        <section className='flex flex-col items-center'>
          <Image
            src='/assets/gifs/success.gif'
            alt='success'
            width={300}
            height={300}
          />
          <h2 className='header mb-6 max-w-[600px] text-center '>
            Your <span className='text-green-500'>appointment request</span> has
            been successfully sent!
          </h2>
          <p>Will be in touch soon!</p>
        </section>
        <section className='request-details'>
          <p>Requested appointment details:</p>
          <div className='flex items-center gap-3'>
            <Image
              src={doctor?.image!}
              alt='doctor-img'
              width={100}
              height={100}
              className='size-6'
            />
            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
            <div className='flex gap-2'>
              <Image
                src='/assets/icons/calendar.svg'
                alt='calendar'
                width={24}
                height={24}
              />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </div>
        </section>
        <Button variant='outline' className='shad-primary-btn' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className='copyright py-12'>© 2025 Patiento. All rights reserved.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
