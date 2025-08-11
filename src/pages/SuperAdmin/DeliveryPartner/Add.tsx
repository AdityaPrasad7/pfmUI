// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import NavigateBtn from '../../../components/button/NavigateBtn';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import SubmitButton from '../../../components/button/SubmitBtn';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// interface FormInputs {
//   centerName: string;
//   location: string;
//   manager: string;
// }

// const DeliveryPartnerAdd: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormInputs>({
//     defaultValues: {
//       centerName: '',
//       location: '',
//       manager: '',
//     },
//   });

//   const navigate = useNavigate();

//   const onSubmit: SubmitHandler<FormInputs> = (data) => {
//     console.log('Form Data:', data);
//     toast.success('Center added successfully!');
//     setTimeout(() => {
//       navigate('/delivery-partner');
//     }, 3000);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="bg-gradient-to-br px-4 py-8 sm:px-6 md:px-10 min-h-[60vh]">
//         <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
//           {/* Header */}
//           <div className="mb-8 flex items-center justify-between">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//               Add New Partners
//             </h2>
//             <NavigateBtn
//               to="/delivery-partner"
//               label={
//                 <span className="flex items-center gap-1">
//                   <ArrowBackIcon fontSize="small" />
//                   <span className="hidden sm:inline">Back to List</span>
//                   <span className="sm:hidden">Back</span>
//                 </span>
//               }
//               className="text-sm"
//             />
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Center Name & Manager in one row on desktop */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Center Name */}
//               <div>
//                 <label
//                   htmlFor="centerName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                    Name
//                 </label>
//                 <input
//                   id="centerName"
//                   type="text"
//                   {...register('centerName', {
//                     required: 'Center name is required',
//                     minLength: {
//                       value: 2,
//                       message: 'Center name must be at least 2 characters',
//                     },
//                   })}
//                   className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
//                     errors.centerName ? 'border-red-400' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter center name"
//                   aria-invalid={errors.centerName ? 'true' : 'false'}
//                 />
//                 {errors.centerName && (
//                   <p className="mt-1 text-xs text-red-600" role="alert">
//                     {errors.centerName.message}
//                   </p>
//                 )}
//               </div>

//               {/* Manager */}
//               <div>
//                 <label
//                   htmlFor="manager"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Store Name
//                 </label>
//                 <input
//                   id="manager"
//                   type="text"
//                   {...register('manager', {
//                     required: 'Manager name is required',
//                     minLength: {
//                       value: 2,
//                       message: 'Manager name must be at least 2 characters',
//                     },
//                   })}
//                   className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
//                     errors.manager ? 'border-red-400' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter manager name"
//                   aria-invalid={errors.manager ? 'true' : 'false'}
//                 />
//                 {errors.manager && (
//                   <p className="mt-1 text-xs text-red-600" role="alert">
//                     {errors.manager.message}
//                   </p>
//                 )}
//               </div>
//             </div>

         

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <SubmitButton label="Add Center" isSubmitting={isSubmitting} />
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DeliveryPartnerAdd;

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import NavigateBtn from '../../../components/button/NavigateBtn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubmitButton from '../../../components/button/SubmitBtn';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormInputs {
  staffName: string;
  storeName: string;
  // staffId: string;
}

const StoreStaffAdd: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      staffName: '',
      storeName: '',
      // staffId: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Form Data:', data);
    toast.success('Staff member added successfully!');
    setTimeout(() => {
      navigate('/delivery-partner');
    }, 2000);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gradient-to-br px-4 py-8 sm:px-6 md:px-10 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Delivery Partner
            </h2>
            <NavigateBtn
              to="/delivery-partner"
              label={
                <span className="flex items-center gap-1">
                  <ArrowBackIcon fontSize="small" />
                  <span className="hidden sm:inline">Back to List</span>
                  <span className="sm:hidden">Back</span>
                </span>
              }
              className="text-sm"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Staff ID */}
            {/* <div>
              <label
                htmlFor="staffId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Staff ID
              </label>
              <input
                id="staffId"
                type="text"
                {...register('staffId', {
                  required: 'Staff ID is required',
                  pattern: {
                    value: /^ST\d{3}$/,
                    message: 'Staff ID must be in format ST001'
                  }
                })}
                className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                  errors.staffId ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Enter staff ID (e.g. ST001)"
                aria-invalid={errors.staffId ? 'true' : 'false'}
              />
              {errors.staffId && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.staffId.message}
                </p>
              )}
            </div> */}

            {/* Staff Name & Store Name in one row on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Staff Name */}
              <div>
                <label
                  htmlFor="staffName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Staff Name
                </label>
                <input
                  id="staffName"
                  type="text"
                  {...register('staffName', {
                    required: 'Staff name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                    errors.staffName ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Enter staff name"
                  aria-invalid={errors.staffName ? 'true' : 'false'}
                />
                {errors.staffName && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors.staffName.message}
                  </p>
                )}
              </div>

              {/* Store Name */}
              <div>
                <label
                  htmlFor="storeName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Store Name
                </label>
                <input
                  id="storeName"
                  type="text"
                  {...register('storeName', {
                    required: 'Store name is required',
                    minLength: {
                      value: 2,
                      message: 'Store name must be at least 2 characters',
                    },
                  })}
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                    errors.storeName ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Enter store name"
                  aria-invalid={errors.storeName ? 'true' : 'false'}
                />
                {errors.storeName && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors.storeName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <SubmitButton 
                label={isSubmitting ? "Adding..." : "Add Staff Member"} 
                isSubmitting={isSubmitting} 
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StoreStaffAdd;