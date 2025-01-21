"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phone_input",
  DATE_PICKER = "date_picker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>
            Thank you for checking out our project! We re excited to have you
            onboard.
          </p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='name'
          label='Full Name'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='email'
          label='Email'
          placeholder='example@example.com'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
