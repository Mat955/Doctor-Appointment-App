"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl} from "@/components/ui/form";
import CustomFormField, {FormFieldType} from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import {useState} from "react";
import {PatientFormValidation} from "../../lib/validation";
import {useRouter} from "next/navigation";
import {registerPatient} from "../../lib/actions/patient.actions";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "../../../constants";
import {Label} from "../ui/label";
import {SelectItem} from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({user}: {user: User}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-12 flex-1'
      >
        <section className='space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>
            Let us get more information about you to help us serve you better.
          </p>
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Personal Information</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='Full Name'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='email'
            label='Email'
            placeholder='example@example.com'
            iconSrc='/assets/icons/email.svg'
            iconAlt='email'
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name='phone'
            label='Phone Number'
            placeholder='+(country code) 123 456 789'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='birthDate'
            label='Date of birth'
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name='gender'
            label='Gender'
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className='flex h-11 gap-6 xl:justify-between'
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className='radio-group'>
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className='cursor-pointer'>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='address'
            label='Address'
            placeholder='New York, NY'
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='occupation'
            label='Occupation'
            placeholder='DEV'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='emergencyContactName'
            label='Emergency Contact Name'
            placeholder='Guardians name'
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name='emergencyContactNumber'
            label='Emergency Contact Number'
            placeholder='+(country code) 123 456 789'
          />
        </div>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Medical Information</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name='primaryPhysician'
          label='Primary Physician'
          placeholder='Select a Primary Physician'
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className='flex cursor-pointer items-center gap-2'>
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className='rounded-full border border-dark-500'
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='insuranceProvider'
            label='Insurance Provider'
            placeholder='BlueCross BlueShield'
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='insurancePolicyNumber'
            label='Insurance Policy Number'
            placeholder='ABC123456789'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='allergies'
            label='Allergies (if any)'
            placeholder='Red pen, peanuts etc.'
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='currentMedications'
            label='Current Medications (if any)'
            placeholder='Paracetamol, Ibuprofen etc.'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='familyMedicalHistory'
            label='Family Medical History'
            placeholder='Mother had diabetes etc.'
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='pastMedicalHistory'
            label='Past Medical History'
            placeholder='Diabetes, hypertension etc.'
          />
        </div>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Identification and Verification</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name='identifciationType'
          label='Identification type'
          placeholder='Select an identification type'
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='identificationNumber'
          label='Identification Number'
          placeholder='ABC123456789'
        />
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name='identificationDocument'
          label='Scan copy of identification document'
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I consent to receive treatment for my health condition.'
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to the use and disclosure of my health
            information for treatment purposes.'
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I acknowledge that I have reviewed and agree to the
            privacy policy'
          />
        </section>
        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
