// "use client";

// import { POST } from "@/constants/apiMethods";
// import { useApiMutation } from "@/hooks/useApiMutation";
// import { MapSchema } from "@/schemas/ContentSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// export const Map = ({ data, isDataLoading, isAdmin = true }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEdit, setIsEdit] = useState(false);

//   const handleLoad = () => {
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     const fallback = setTimeout(() => setIsLoading(false), 3000);
//     return () => clearTimeout(fallback);
//   }, []);

//   const form = useForm({
//     resolver: zodResolver(MapSchema),
//     defaultValues: {
//       link: "https://www.google.com/maps?q=2nd+Floor,+Raj+Ghar,+Kanti+Factory+Road,+Mahatma+Gandhi+Nagar,+Kankarbagh,+Patna,+India+800020&z=16&output=embed",
//     },
//   });

//   const {
//     handleSubmit,
//     reset,
//     watch,
//     formState: { isSubmitted, submitCount },
//   } = form;

//   const { _id = "", content } = data || {};

//   useEffect(() => {
//     if (data) reset(content);
//   }, [data, reset]);

//   const {
//     mutateAsync: submitForm,
//     isPending: isSubmitFormLoading,
//     data: result,
//   } = useApiMutation({
//     url: `/admin/content?id=${_id}`,
//     method: POST,
//     invalidateKey: ["content", "contact-us", "map"],
//   });

//   useEffect(() => {
//     if (isSubmitted && result) setIsEdit(false);
//   }, [submitCount]);

//   const onSubmit = (values) => {
//     const apiData = {
//       pageName: "contact-us",
//       sectionName: "map",
//       content: values,
//     };
//     submitForm(apiData);
//   };

//   const currentLink = watch("link") || content?.link || "";

//   return (
//     <div className="w-full max-w-[1500px] mx-auto relative">
//       {isLoading && (
//         <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
//           <span className="loader" />
//         </div>
//       )}

//       {isAdmin && (
//         <div className="mb-4 flex justify-end gap-2">
//           <button
//             type="button"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             onClick={() => setIsEdit(!isEdit)}
//           >
//             {isEdit ? "Cancel" : "Edit Map"}
//           </button>
//         </div>
//       )}

//       {isEdit && isAdmin && (
//         <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex gap-2">
//           <input
//             type="text"
//             {...form.register("link")}
//             placeholder="Enter Google Maps link or address"
//             className="flex-1 border rounded px-3 py-2"
//           />
//           <button
//             type="submit"
//             disabled={isSubmitFormLoading}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             {isSubmitFormLoading ? "Saving..." : "Save"}
//           </button>
//         </form>
//       )}

//       <div className="w-full h-[400px] sm:h-[600px] relative">
//         <iframe
//           src={
//             currentLink ||
//             "https://www.google.com/maps?q=2nd+Floor,+Raj+Ghar,+Kanti+Factory+Road,+Mahatma+Gandhi+Nagar,+Kankarbagh,+Patna,+India+800020&z=16&output=embed"
//           }
//           width="100%"
//           height="100%"
//           allowFullScreen
//           loading="lazy"
//           onLoad={handleLoad}
//           style={{ border: 0 }}
//           title="Google Map"
//         />
//       </div>
//     </div>
//   );
// };


"use client";

import React, { useEffect, useState } from "react";

export const Map = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Fallback: hide loader after 3s even if onLoad doesn't trigger
    const fallback = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className="w-full h-[400px] sm:h-[600px] max-w-[1500px] mx-auto relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
          <span className="loader" />
        </div>
      )}
      <iframe
        src={`https://www.google.com/maps?q=2nd+Floor,+Raj+Ghar,+Kanti+Factory+Road,+Mahatma+Gandhi+Nagar,+Kankarbagh,+Patna,+India+800020&z=16&output=embed`}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        onLoad={handleLoad}
        style={{ border: 0 }}
        title="Google Map"
      />
    </div>
  );
};
