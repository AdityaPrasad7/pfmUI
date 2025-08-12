import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateBtn from '../../../components/button/NavigateBtn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubmitButton from '../../../components/button/SubmitBtn';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClearIcon from '@mui/icons-material/Clear';


interface FormInputs {
  id: string;
  name: string;
  store: string;
  status: 'Verified' | 'Pending Docs';
}

const DeliveryPartnerEdit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, store, status } = (location.state as FormInputs) || {
    id: '',
    name: '',
    store: '',
    status: 'Verified' as 'Verified' | 'Pending Docs',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      id,
      name,
      store,
      status,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    try {
      // const storedData = localStorage.getItem('storeStaff');
      // let staffData: FormInputs[] = storedData ? JSON.parse(storedData) : [];
      // const updatedData = staffData.map((staff) =>
      //   staff.id === data.id ? data : staff
      // );
      // localStorage.setItem('storeStaff', JSON.stringify(updatedData));
      toast.success('Delivery Partner updated successfully!');
      setTimeout(() => {
        navigate('/delivery-partner');
      }, 2000);
    } catch (error) {
      console.error('Error updating staff:', error);
      toast.error('Failed to update staff.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center bg-gradient-to-br  px-0 py-8 sm:px-6 lg:px-8 max-w-[40rem] m-auto">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Edit Delivery Partner
            </h2>
            <NavigateBtn
              to="/delivery-partner"
              label={
                <>
                  {/* Desktop / sm and up */}
                  <span className="hidden sm:flex items-center gap-1">
                    <ArrowBackIcon fontSize="small" />
                    <span>Back to List</span>
                  </span>

                  {/* Mobile / below sm */}
                  <span className="flex sm:hidden items-center gap-1">
                    <ClearIcon fontSize="small" />
                    {/* <span>Back</span> */}
                  </span>
                </>
              }
            // className="text-sm font-medium text-blue-600 hover:text-blue-800"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            {/* Staff ID */}
            {/* <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Staff ID
              </label>
              <input
                id="id"
                type="text"
                {...register('id', {
                  required: 'Staff ID is required',
                  pattern: {
                    value: /^ST\d{3}$/,
                    message: 'Staff ID must be in format ST001',
                  },
                })}
                className={`block w-full px-3 sm:px-4 py-2 border rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                  errors.id ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Enter staff ID (e.g. ST001)"
                aria-invalid={errors.id ? 'true' : 'false'}
                readOnly
              />
              {errors.id && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.id.message}
                </p>
              )}
            </div> */}

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
                className={`block w-full px-3 sm:px-4 py-2 border rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.name ? 'border-red-400' : 'border-gray-300'
                  }`}
                placeholder="Enter name"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Store Name */}
            <div>
              <label
                htmlFor="store"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Store Name
              </label>
              <input
                id="store"
                type="text"
                {...register('store', {
                  required: 'Store name is required',
                  minLength: {
                    value: 2,
                    message: 'Store name must be at least 2 characters',
                  },
                })}
                className={`block w-full px-3 sm:px-4 py-2 border rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.store ? 'border-red-400' : 'border-gray-300'
                  }`}
                placeholder="Enter store name"
                aria-invalid={errors.store ? 'true' : 'false'}
              />
              {errors.store && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.store.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Status
              </label>
              <select
                id="status"
                {...register('status', {
                  required: 'Status is required',
                })}
                className={`block w-full px-3 sm:px-4 py-2 border rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.status ? 'border-red-400' : 'border-gray-300'
                  }`}
                aria-invalid={errors.status ? 'true' : 'false'}
              >
                <option value="Verified">Verified</option>
                <option value="Pending Docs">Pending Docs</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <SubmitButton
                label="Update"
                isSubmitting={isSubmitting}
              // className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeliveryPartnerEdit;