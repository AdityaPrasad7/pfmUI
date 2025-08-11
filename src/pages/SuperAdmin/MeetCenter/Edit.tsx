import React, { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import NavigateBtn from '../../../components/button/NavigateBtn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubmitButton from '../../../components/button/SubmitBtn';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

type FormInputs = {
  storeName: string;
  location: string;
  manager: string;
  latitude: string;
  longitude: string;
  products: {
    chicken: boolean;
    mutton: boolean;
    pork: boolean;
    fish: boolean;
    meat: boolean;
  };
};

const MeetCenterEdit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {
    name: '',
    location: '',
    manager: '',
    latitude: '',
    longitude: '',
    products: {
      chicken: false,
      mutton: false,
      pork: false,
      fish: false,
      meat: false,
    },
  };

  const defaultValues = useMemo(() => ({
    storeName: state.name,
    location: state.location,
    manager: state.manager,
    latitude: state.latitude || '',
    longitude: state.longitude || '',
    products: {
      chicken: state.products?.chicken || false,
      mutton: state.products?.mutton || false,
      pork: state.products?.pork || false,
      fish: state.products?.fish || false,
      meat: state.products?.meat || false,
    },
  }), [state]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormInputs>({ defaultValues });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Form Data:', data);
    toast.success('Store updated successfully!');
    setTimeout(() => {
      navigate('/meet-center');
    }, 3000);
  };

  const handleProductChange = (product: keyof FormInputs['products']) => {
    setValue(`products.${product}`, !watch(`products.${product}`));
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gradient-to-br px-4 py-8 sm:px-6 md:px-10 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {state.name ? 'Edit Store' : 'Add New Store'}
            </h2>
            <NavigateBtn
              to="/meet-center"
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
            {/* Store Name & Manager in one row on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Name */}
              <div>
                <label
                  htmlFor="storeName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Store Name *
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

              {/* Manager */}
              <div>
                <label
                  htmlFor="manager"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Manager *
                </label>
                <input
                  id="manager"
                  type="text"
                  {...register('manager', {
                    required: 'Manager name is required',
                    minLength: {
                      value: 2,
                      message: 'Manager name must be at least 2 characters',
                    },
                  })}
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                    errors.manager ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Enter manager name"
                  aria-invalid={errors.manager ? 'true' : 'false'}
                />
                {errors.manager && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors.manager.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location *
              </label>
              <textarea
                id="location"
                rows={4}
                {...register('location', {
                  required: 'Location is required',
                  minLength: {
                    value: 2,
                    message: 'Location must be at least 2 characters',
                  },
                })}
                className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none ${
                  errors.location ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Enter location address"
                aria-invalid={errors.location ? 'true' : 'false'}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Latitude & Longitude */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Latitude *
                </label>
                <input
                  id="latitude"
                  type="text"
                  {...register('latitude', {
                    required: 'Latitude is required',
                    pattern: {
                      value: /^-?([0-8]?[0-9]|90)(\.[0-9]{1,6})?$/,
                      message: 'Enter valid latitude (-90 to 90)',
                    },
                  })}
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                    errors.latitude ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="e.g. 12.345678"
                  aria-invalid={errors.latitude ? 'true' : 'false'}
                />
                {errors.latitude && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors.latitude.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Longitude *
                </label>
                <input
                  id="longitude"
                  type="text"
                  {...register('longitude', {
                    required: 'Longitude is required',
                    pattern: {
                      value: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,6})?$/,
                      message: 'Enter valid longitude (-180 to 180)',
                    },
                  })}
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                    errors.longitude ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="e.g. 98.765432"
                  aria-invalid={errors.longitude ? 'true' : 'false'}
                />
                {errors.longitude && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors.longitude.message}
                  </p>
                )}
              </div>
            </div>

            {/* Products */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Products *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={watch('products.chicken')}
                    onChange={() => handleProductChange('chicken')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Chicken</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={watch('products.mutton')}
                    onChange={() => handleProductChange('mutton')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Mutton</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={watch('products.pork')}
                    onChange={() => handleProductChange('pork')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Pork</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={watch('products.fish')}
                    onChange={() => handleProductChange('fish')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Fish</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={watch('products.meat')}
                    onChange={() => handleProductChange('meat')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Meat</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <SubmitButton 
                label={state.name ? 'Update Store' : 'Add Store'} 
                isSubmitting={isSubmitting} 
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MeetCenterEdit;