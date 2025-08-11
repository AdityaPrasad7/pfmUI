import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import NavigateBtn from '../../../components/button/NavigateBtn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubmitButton from '../../../components/button/SubmitBtn';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

interface CategoryItem {
  id: number;
  name: string;
  image: string;
  description?: string;
}

interface FormInputs {
  productName: string;
  productImage: FileList | null;
}

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category as CategoryItem | undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      productName: category?.name || '',
      productImage: null,
    },
  });

  const [preview, setPreview] = useState<string | null>(category?.image || null);

  // Pre-populate form with category data
  useEffect(() => {
    if (category) {
      setValue('productName', category.name);
      setPreview(category.image || null);
    }
  }, [category, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (!data.productName.trim()) {
      toast.error('Please enter a category name', {
        toastId: 'edit-category-error',
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    console.log('Updating category:', {
      id,
      name: data.productName,
      image: data.productImage?.[0] || category?.image,
    });

    toast.success(`Category ${data.productName} updated successfully!`, {
      toastId: 'edit-category-success',
      position: 'top-right',
      autoClose: 2000,
      onClose: () => navigate('/categories'),
    });
  };

  // Watch file changes and set preview
  const fileWatch = watch('productImage');
  useEffect(() => {
    if (fileWatch && fileWatch.length > 0) {
      const file = fileWatch[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [fileWatch]);

  if (!category) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No category data found. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
      <div className="bg-gradient-to-br px-4 py-8 sm:px-6 md:px-10 min-h-[60vh] w-[40rem] max-w-[40rem] m-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Edit Product Category :{id}</h2>
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
                {...register('productImage')}
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
                label={isSubmitting ? 'Updating...' : 'Update Category'}
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCategory;