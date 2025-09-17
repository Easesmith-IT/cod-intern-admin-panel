import Image from "next/image";
import { Info } from "./info";
import { SendUsMessageForm } from "./send-us-message-form";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendUsMessageSchema } from "@/schemas/ContentSchema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

export const SendUsMessage = ({ data, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(SendUsMessageSchema),
    defaultValues: {
      phone: "7311155738",
      email: "info@codintern.com",
      location:
        "2nd Floor, Raj Ghar, Kanti Factory Road, Mahatma Gandhi Nagar, Kankarbagh, Patna, India 800020",
    },
  });

  const [isDescEdit, setIsDescEdit] = useState(false);

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitted, submitCount },
  } = form;

  const { _id = "", content } = data || {};

  useEffect(() => {
    // Only reset if the incoming data is actually different
    if (data) {
      reset(content);
    }
  }, [data, reset]);

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: `/admin/content?id=${_id}`,
    method: POST,
    invalidateKey: ["content", "contact-us", "send-us-message"],
  });

  useEffect(() => {
    if (isSubmitted && result) {
      setIsDescEdit(false);
    }
  }, [submitCount]);

  const onSubmit = (values) => {
    console.log("Data:", values);

    const apiData = {
      pageName: "contact-us",
      sectionName: "send-us-message",
      content: values,
    };
    submitForm(apiData);
  };

  return (
    <section className="section-container flex flex-col md:flex-row py-12 md:py-0 justify-between gap-10 items-center">
      <SendUsMessageForm />

      <div className="md:h-[660px] md:w-[340px] flex flex-col justify-center md:bg-[linear-gradient(263.55deg,_#F3F1F5_8.66%,_#F3F4FF_100%)] relative">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:w-[355px] rounded-tr-lg rounded-br-lg md:-translate-x-[50px] bg-white shadow-[0px_8px_25px_0px_#0000001F] p-4">
              <h3 className="font-stolzl font-medium text-xl md:text-2xl text-para-3">
                Contact Information
              </h3>
              <div className="space-y-9 mt-9">
                <Info
                  icon="/contact-us/phone.svg"
                  alt="Phone"
                  width={14}
                  height={24}
                  title="Feel Free to Contact US"
                  name="phone"
                  isLoading={isLoading}
                />
                <Info
                  icon="/contact-us/mail.svg"
                  alt="Mail"
                  width={18}
                  height={10}
                  title="Get Email"
                  name="email"
                  isLoading={isLoading}
                />
                <Info
                  icon="/contact-us/map-pin-2.svg"
                  alt="Location"
                  width={15}
                  height={21}
                  title="Location"
                  name="location"
                  isLoading={isLoading}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  disabled={isSubmitFormLoading}
                  className="mt-4"
                  variant="codIntern"
                >
                  {isSubmitFormLoading ? <Spinner /> : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <Image
          className="-translate-x-[50px] hidden md:block"
          src="/contact-us/contact-icon.svg"
          width={51}
          height={49}
          alt="contact-icon"
        />
      </div>
    </section>
  );
};
