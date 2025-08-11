// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import NavigateBtn from '../../../components/button/NavigateBtn';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import SubmitButton from '../../../components/button/SubmitBtn';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// interface FormInputs {
//   staffName: string;
//   storeName: string;
//   // staffId: string;
// }

// const AddCategories: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormInputs>({
//     defaultValues: {
//       staffName: '',
//       storeName: '',
//       // staffId: '',
//     },
//   });

//   const navigate = useNavigate();

//   const onSubmit: SubmitHandler<FormInputs> = (data) => {
//     console.log('Form Data:', data);
//     toast.success('Staff member added successfully!');
//     setTimeout(() => {
//       navigate('/categories');
//     }, 2000);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="bg-gradient-to-br px-4 py-8 sm:px-6 md:px-10 min-h-[60vh]">
//         <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
//           {/* Header */}
//           <div className="mb-8 flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-800">
//            Add Product Categories
//             </h2>
//             <NavigateBtn
//               to="/categories"
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
           
//             {/* Staff Name & Store Name in one row on desktop */}
//             <div className="">
//               {/* Staff Name */}
//               <div>
//                 <label
//                   htmlFor="staffName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Staff Name
//                 </label>
//                 <input
//                   id="staffName"
//                   type="text"
//                   {...register('staffName', {
//                     required: 'Staff name is required',
//                     minLength: {
//                       value: 2,
//                       message: 'Name must be at least 2 characters',
//                     },
//                   })}
//                   className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
//                     errors.staffName ? 'border-red-400' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter staff name"
//                   aria-invalid={errors.staffName ? 'true' : 'false'}
//                 />
//                 {errors.staffName && (
//                   <p className="mt-1 text-xs text-red-600" role="alert">
//                     {errors.staffName.message}
//                   </p>
//                 )}
//               </div>

//               {/* Store Name */}
//               <div>
//                 <label
//                   htmlFor="storeName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Store Name
//                 </label>
//              <input type="file" />
//                 {errors.storeName && (
//                   <p className="mt-1 text-xs text-red-600" role="alert">
//                     {errors.storeName.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4">
//               <SubmitButton 
//                 label={isSubmitting ? "Adding..." : "Add Staff Member"} 
//                 isSubmitting={isSubmitting} 
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddCategories;

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import NavigateBtn from '../../../components/button/NavigateBtn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubmitButton from '../../../components/button/SubmitBtn';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormInputs {
  productName: string;
  productImage: FileList;
}

const AddCategories: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      productName: '',
      productImage: undefined,
    },
  });

  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Form Data:', data);
    toast.success('Product category added successfully!', { toastId: 'add-category-success' });
    setTimeout(() => {
      navigate('/categories');
    }, 2000);
  };

  // Watch file changes and set preview
  const fileWatch = watch('productImage');
  React.useEffect(() => {
    if (fileWatch && fileWatch.length > 0) {
      const file = fileWatch[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [fileWatch]);

  return (
    <>
      <ToastContainer />
      <div className="bg-gradient-to-br px-4 py-8 sm:px-6 md:px-10 min-h-[60vh] w-[40rem] m-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Add Product Categories</h2>
            <NavigateBtn
              to="/categories"
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
            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                {...register('productName', {
                  required: 'Product name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
                className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                  errors.productName ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
                aria-invalid={errors.productName ? 'true' : 'false'}
              />
              {errors.productName && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Product Image Upload */}
            <div>
              <label
                htmlFor="productImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Product Image
              </label>
              <input
                id="productImage"
                type="file"
                accept="image/*"
                {...register('productImage', { required: 'Product image is required' })}
                className={`block w-full px-3 py-2 border rounded-lg text-sm cursor-pointer focus:outline-none ${
                  errors.productImage ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errors.productImage && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.productImage.message}
                </p>
              )}

              {/* Image Preview */}
              {preview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <SubmitButton
                label={isSubmitting ? 'Adding...' : 'Add Category'}
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategories;
