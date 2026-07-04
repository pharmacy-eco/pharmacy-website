// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useGeneralStore } from "@/stores/general";
// import CardRoot from "../../atoms/card-atom/card-root";
// import { IGeneral } from "@/types/cms/general";
// import InputField from "../../atoms/next-input/input-field";
// import TextareaRoot from "../../atoms/textarea-atom/textarea-root";
// import SocialForm from "../../molecules/social-form";

// interface IProps {}

// const normalizeSocial = (social?: IGeneral["social"]) => {
//   if (!Array.isArray(social)) return [];

//   return social.map((item) => {
//     if (typeof item === "string") {
//       return {
//         image: "",
//         name: "",
//         link: item
//       };
//     }

//     return item;
//   });
// };

// const TGeneral: React.FC<IProps> = () => {
//   const [data, setData] = useState<IGeneral>();
//   const { _fnGetDetailGeneral } = useGeneralStore();
//   const [nameError, setNameError] = useState<string | null>(null);
//   useEffect(() => {
//     fnFetchData();
//   }, []);

//   const fnFetchData = () => {
//     _fnGetDetailGeneral()
//       .then((res) => {
//         const items = res?.data;
//         setData(items);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <CardRoot>
//       <div className="grid grid-cols-12 gap-4">
//         <div className="col-span-6 flex flex-col gap-4">
//           <InputField
//             name="name"
//             label="Tên cửa hàng"
//             value={data?.company}
//             error={nameError}
//             placeholder="Nhập tên cửa hàng..."
//             onChange={(evt) => {
//               setData({ ...data, company: evt.target.value });
//               setNameError(null);
//             }}
//           />
//           <InputField
//             name="address"
//             label="Địa chỉ"
//             value={data?.address}
//             placeholder="Nhập địa chỉ ..."
//             onChange={(evt) => {
//               setData({ ...data, address: evt.target.value });
//             }}
//           />
//           <InputField
//             name="link_map"
//             label="Link map"
//             value={data?.link_map}
//             onChange={(evt) => {
//               setData({ ...data, link_map: evt.target.value });
//             }}
//           />
//           <InputField
//             name="iframe_map"
//             label="Iframe map"
//             value={data?.iframe_map}
//             onChange={(evt) => {
//               setData({ ...data, iframe_map: evt.target.value });
//             }}
//           />
//           <TextareaRoot
//             name="info"
//             label="Thông tin"
//             className=""
//             value={data?.info}
//             onChange={(evt) => {
//               setData({ ...data, info: evt.target.value });
//             }}
//           />
//           <div className="w-full flex gap-2">
//             <div className="w-1/2">
//               <InputField
//                 name="hotline"
//                 className="col-span-1"
//                 label="Hotline"
//                 value={data?.hotline}
//                 onChange={(evt) => {
//                   setData({ ...data, hotline: evt.target.value });
//                 }}
//               />
//             </div>
//             <div className="w-1/2">
//               <InputField
//                 name="email"
//                 label="Email"
//                 value={data?.email}
//                 onChange={(evt) => {
//                   setData({ ...data, email: evt.target.value });
//                 }}
//               />
//             </div>
//           </div>
//           <SocialForm
//             items={normalizeSocial(data?.social)}
//             onChange={(val) => setData({ ...data, social: val })}
//           ></SocialForm>
//         </div>
//         <div className="col-span-6  flex flex-col gap-4">
//           <InputField
//             name="meta_name"
//             label="Meta name"
//             value={data?.meta_title}
//             placeholder="Nhập meta name ..."
//             onChange={(evt) => {
//               setData({ ...data, meta_title: evt.target.value });
//             }}
//           />
//           <InputField
//             name="meta_keyword"
//             label="Meta keyword"
//             value={data?.meta_keyword}
//             placeholder="Nhập meta keyword ..."
//             onChange={(evt) => {
//               setData({ ...data, meta_keyword: evt.target.value });
//             }}
//           />
//           <TextareaRoot
//             name="meta_description"
//             label="Meta description"
//             value={data?.meta_description}
//             placeholder="Nhập meta description ..."
//             onChange={(evt) => {
//               setData({ ...data, meta_description: evt.target.value });
//             }}
//           />
//           <TextareaRoot
//             name="add_head"
//             label="Thẻ chèn head"
//             value={data?.add_head}
//             placeholder="Nhập thẻ chèn head ..."
//             onChange={(evt) => {
//               setData({ ...data, add_head: evt.target.value });
//             }}
//           />
//           <TextareaRoot
//             name="add_body"
//             label="Thẻ chèn body"
//             value={data?.add_body}
//             placeholder="Nhập thẻ chèn body ..."
//             onChange={(evt) => {
//               setData({ ...data, add_body: evt.target.value });
//             }}
//           />
//         </div>
//       </div>
//     </CardRoot>
//   );
// };

// TGeneral.displayName = "TGeneral";
// export default TGeneral;
