import Image from "next/image";
import PatientForm from "../components/forms/PatientForm";
import Link from "next/link";
import PasskeyModal from "../components/PasskeyModal";

export default function Home({searchParams}: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className='flex h-screen max-h-screen'>
      {isAdmin && <PasskeyModal />}
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[496px]'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='logo'
            width={100}
            height={100}
            className='mb-12 h-10 w-fit'
          />
          <PatientForm />
          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-item-end text-dark-600 xl:text-left'>
              © 2025 Patiento. All rights reserved.
            </p>
            <Link href='/?admin=true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src='/assets/images/onboarding-img.png'
        alt='onboarding-bg'
        height={1000}
        width={1000}
        className='size-img max-w-[50]'
      />
    </div>
  );
}
