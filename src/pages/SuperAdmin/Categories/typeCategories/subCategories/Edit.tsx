// // import React, { useState, useEffect } from 'react';
// // import { useForm, SubmitHandler } from 'react-hook-form';
// // import { useNavigate, useParams, useLocation } from 'react-router-dom';
// // import NavigateBtn from '../../../../../components/button/NavigateBtn';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import { Button } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import ClearIcon from '@mui/icons-material/Clear';
// // import callApi from '../../../../../util/admin_api';
// // import { AxiosResponse } from 'axios';

// // // Default image
// // import defaultImg from '../../../../../assets/items/chicken leg piece.png';

// // // Define API response type
// // interface ApiResponse<T> {
// //     statusCode: number;
// //     success: boolean;
// //     message: string;
// //     data: T;
// //     meta: any | null;
// // }

// // interface SubCategory {
// //     _id: string;
// //     name: string;
// //     type: string[];
// //     quality: string;
// //     weight: string;
// //     pieces: string;
// //     serves: number;
// //     totalEnergy: number;
// //     carbohydrate: number;
// //     fat: number;
// //     protein: number;
// //     description?: string;
// //     img?: string;
// //     price: number;
// // }

// // interface FormInputs {
// //     subCategoryName: string;
// //     type: string;
// //     quality: string;
// //     weight: string;
// //     pieces: string;
// //     serves: string;
// //     totalEnergy: string;
// //     carbohydrate: string;
// //     fat: string;
// //     protein: string;
// //     description: string;
// //     subCategoryImage: FileList | null;
// //     price: string;
// // }

// // interface UserData {
// //     token?: string;
// // }

// // const SubCategoriesEdit: React.FC = () => {
// //     const {
// //         register,
// //         handleSubmit,
// //         formState: { errors, isSubmitting },
// //         watch,
// //         setValue,
// //         reset,
// //     } = useForm<FormInputs>({
// //         defaultValues: {
// //             subCategoryName: '',
// //             type: '',
// //             quality: '',
// //             weight: '',
// //             pieces: '',
// //             serves: '',
// //             totalEnergy: '',
// //             carbohydrate: '',
// //             fat: '',
// //             protein: '',
// //             description: '',
// //             subCategoryImage: null,
// //             price: '',
// //         },
// //     });

// //     const navigate = useNavigate();
// //     const { id } = useParams<{ id: string }>();
// //     const location = useLocation();
// //     console.log("🚀 ~ SubCategoriesAdd ~ location:", location.state.product)
// //     const [preview, setPreview] = useState<string | null>(null);
// //     const [types, setTypes] = useState<string[]>([]);
// //     const [inputValue, setInputValue] = useState<string>('');
// //     const categoryId = id || (location.state as { categoryId?: string })?.categoryId;
// //     console.log("🚀 ~ SubCategoriesAdd ~ categoryId:", categoryId)

// //     // Watch file changes and set preview
// //     const fileWatch = watch('subCategoryImage');
// //     useEffect(() => {
// //         if (fileWatch && fileWatch.length > 0) {
// //             const file = fileWatch[0];
// //             if (file.size > 5 * 1024 * 1024) {
// //                 toast.error('Image size must be less than 5MB', {
// //                     toastId: 'image-size-error',
// //                     position: 'top-right',
// //                     autoClose: 3000,
// //                 });
// //                 setValue('subCategoryImage', null);
// //                 setPreview(null);
// //                 return;
// //             }
// //             if (!file.type.startsWith('image/')) {
// //                 toast.error('Please upload a valid image file', {
// //                     toastId: 'image-type-error',
// //                     position: 'top-right',
// //                     autoClose: 3000,
// //                 });
// //                 setValue('subCategoryImage', null);
// //                 setPreview(null);
// //                 return;
// //             }
// //             const objectUrl = URL.createObjectURL(file);
// //             setPreview(objectUrl);
// //             return () => URL.revokeObjectURL(objectUrl);
// //         } else {
// //             setPreview(defaultImg);
// //         }
// //     }, [fileWatch, setValue]);

// //     // Handle adding a type
// //     const handleAddType = () => {
// //         if (inputValue.trim()) {
// //             setTypes((prev) => [...prev, inputValue.trim()]);
// //             setInputValue('');
// //             setValue('type', '');
// //         }
// //     };

// //     // Handle removing a type
// //     const handleRemoveType = (typeToRemove: string) => {
// //         setTypes((prev) => prev.filter((type) => type !== typeToRemove));
// //     };

// //     const onSubmit: SubmitHandler<FormInputs> = async (data) => {
// //         if (!data.subCategoryName.trim()) {
// //             toast.error('Please enter a sub category name', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (types.length === 0) {
// //             toast.error('Please add at least one type', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.quality.trim()) {
// //             toast.error('Please enter a quality', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.weight.trim()) {
// //             toast.error('Please enter a weight', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.pieces.trim()) {
// //             toast.error('Please enter the number of pieces', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.serves.trim()) {
// //             toast.error('Please enter the number of serves', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.totalEnergy.trim()) {
// //             toast.error('Please enter the total energy', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.carbohydrate.trim()) {
// //             toast.error('Please enter the carbohydrate amount', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.fat.trim()) {
// //             toast.error('Please enter the fat amount', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.protein.trim()) {
// //             toast.error('Please enter the protein amount', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!data.price.trim()) {
// //             toast.error('Please enter the price', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         if (!categoryId) {
// //             toast.error('No category ID provided.', {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });
// //             return;
// //         }

// //         try {
// //             const userDataString = localStorage.getItem('superAdminUser');
// //             const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
// //             const token = userData.token;

// //             if (!token) {
// //                 throw new Error('No authentication token found. Please log in.');
// //             }

// //             const formData = new FormData();
// //             formData.append('name', data.subCategoryName);
// //             formData.append('type', JSON.stringify(types));
// //             formData.append('quality', data.quality);
// //             formData.append('weight', data.weight);
// //             formData.append('pieces', data.pieces);
// //             formData.append('serves', data.serves);
// //             formData.append('totalEnergy', data.totalEnergy);
// //             formData.append('carbohydrate', data.carbohydrate);
// //             formData.append('fat', data.fat);
// //             formData.append('protein', data.protein);
// //             if (data.description) {
// //                 formData.append('description', data.description);
// //             }
// //             if (data.subCategoryImage && data.subCategoryImage.length > 0) {
// //                 formData.append('img', data.subCategoryImage[0]);
// //             }
// //             formData.append('price', data.price);

// //             const response: AxiosResponse<ApiResponse<SubCategory>> = await callApi(
// //                 `/admin/sub-product-categories/${categoryId}`,
// //                 {
// //                     method: 'PATCH',
// //                     headers: {
// //                         'Authorization': `Bearer ${token}`,
// //                     },
// //                     data: formData,
// //                 }
// //             );

// //             if (!response.data.success) {
// //                 throw new Error(response.data.message || 'Failed to edit sub category');
// //             }

// //             toast.success(`Sub category "${data.subCategoryName}" added successfully!`, {
// //                 toastId: 'add-sub-category-success',
// //                 position: 'top-right',
// //                 autoClose: 2000,
// //                 onClose: () => navigate(`/sub/categories/full-details`, { state: { id: categoryId } }),
// //             });
// //             reset();
// //             setTypes([]);
// //             setPreview(null);
// //         } catch (error: unknown) {
// //             const errorMessage = error instanceof Error ? error.message : 'Failed to edit sub category';
// //             console.error('Error adding sub category:', errorMessage);

// //             toast.error(errorMessage, {
// //                 toastId: 'add-sub-category-error',
// //                 position: 'top-right',
// //                 autoClose: 3000,
// //             });

// //             if (errorMessage.includes('token') || errorMessage.includes('Unauthorized')) {
// //                 localStorage.removeItem('superAdminUser');
// //                 navigate('/admin/login');
// //             }
// //         }
// //     };

// //     return (
// //         <>
// //             <ToastContainer
// //                 position="top-right"
// //                 autoClose={3000}
// //                 hideProgressBar={false}
// //                 newestOnTop
// //                 closeOnClick
// //                 rtl={false}
// //                 pauseOnFocusLoss
// //                 draggable
// //                 pauseOnHover
// //                 theme="light"
// //                 style={{ zIndex: 9999 }}
// //             />
// //             <div className="bg-gradient-to-br px-0 py-8 sm:px-6 md:px-10 min-h-[60vh] min-w-[20rem] max-w-[40rem] m-auto">
// //                 <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
// //                     {/* Header */}
// //                     <div className="mb-8 flex items-start justify-between">
// //                         <h2 className="text-2xl font-bold text-gray-800">Edit Sub Category</h2>
// //                         <NavigateBtn
// //                             to={`/sub/categories/full-details`}
// //                             state={{ id: categoryId }}
// //                             label={
// //                                 <>
// //                                     {/* Desktop / sm and up */}
// //                                     <span className="hidden sm:flex items-center gap-1">
// //                                         <ArrowBackIcon fontSize="small" />
// //                                         <span>Back to List</span>
// //                                     </span>

// //                                     {/* Mobile / below sm */}
// //                                     <span className="flex sm:hidden items-center gap-1">
// //                                         <ClearIcon fontSize="small" />
// //                                     </span>
// //                                 </>
// //                             }
// //                             className="text-sm"
// //                         />
// //                     </div>

// //                     {/* Form */}
// //                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //                         {/* Sub Category Name */}
// //                         <div>
// //                             <label
// //                                 htmlFor="subCategoryName"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Name *
// //                             </label>
// //                             <input
// //                                 id="subCategoryName"
// //                                 type="text"
// //                                 {...register('subCategoryName', {
// //                                     required: 'Sub category name is required',
// //                                     minLength: { value: 2, message: 'Name must be at least 2 characters' },
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.subCategoryName ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter sub category name"
// //                                 aria-invalid={errors.subCategoryName ? 'true' : 'false'}
// //                             />
// //                             {errors.subCategoryName && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.subCategoryName.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Types */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Types *
// //                             </label>
// //                             <div className="flex gap-2 mb-2">
// //                                 <input
// //                                     type="text"
// //                                     {...register('type', {
// //                                         required: 'Please add at least one type',
// //                                     })}
// //                                     value={inputValue}
// //                                     onChange={(e) => setInputValue(e.target.value)}
// //                                     placeholder="Add type..."
// //                                     className="px-3 py-2 border rounded-lg flex-1"
// //                                 />
// //                                 <button
// //                                     type="button"
// //                                     onClick={handleAddType}
// //                                     className="px-3 py-2 bg-blue-500 text-white rounded-lg"
// //                                 >
// //                                     Add
// //                                 </button>
// //                             </div>
// //                             {errors.type && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.type.message}
// //                                 </p>
// //                             )}
// //                             <div className="flex flex-wrap gap-2">
// //                                 {types.map((type) => (
// //                                     <span
// //                                         key={type}
// //                                         className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
// //                                     >
// //                                         {type}
// //                                         <button
// //                                             type="button"
// //                                             onClick={() => handleRemoveType(type)}
// //                                             className="text-red-500 font-bold"
// //                                         >
// //                                             x
// //                                         </button>
// //                                     </span>
// //                                 ))}
// //                             </div>
// //                         </div>

// //                         {/* Quality */}
// //                         <div>
// //                             <label
// //                                 htmlFor="quality"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Quality *
// //                             </label>
// //                             <input
// //                                 id="quality"
// //                                 type="text"
// //                                 {...register('quality', {
// //                                     required: 'Quality is required',
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.quality ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter quality (e.g., Fresh)"
// //                                 aria-invalid={errors.quality ? 'true' : 'false'}
// //                             />
// //                             {errors.quality && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.quality.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Weight */}
// //                         <div>
// //                             <label
// //                                 htmlFor="weight"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Weight *
// //                             </label>
// //                             <input
// //                                 id="weight"
// //                                 type="text"
// //                                 {...register('weight', {
// //                                     required: 'Weight is required',
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.weight ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter weight (e.g., 500g)"
// //                                 aria-invalid={errors.weight ? 'true' : 'false'}
// //                             />
// //                             {errors.weight && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.weight.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Pieces */}
// //                         <div>
// //                             <label
// //                                 htmlFor="pieces"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Pieces *
// //                             </label>
// //                             <input
// //                                 id="pieces"
// //                                 type="text"
// //                                 {...register('pieces', {
// //                                     required: 'Pieces is required',
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.pieces ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter pieces (e.g., 5-6 slices)"
// //                                 aria-invalid={errors.pieces ? 'true' : 'false'}
// //                             />
// //                             {errors.pieces && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.pieces.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Serves */}
// //                         <div>
// //                             <label
// //                                 htmlFor="serves"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Serves *
// //                             </label>
// //                             <input
// //                                 id="serves"
// //                                 type="number"
// //                                 {...register('serves', {
// //                                     required: 'Serves is required',
// //                                     min: { value: 1, message: 'Serves must be at least 1' },
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.serves ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter serves (e.g., 2)"
// //                                 aria-invalid={errors.serves ? 'true' : 'false'}
// //                             />
// //                             {errors.serves && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.serves.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Total Energy */}
// //                         <div>
// //                             <label
// //                                 htmlFor="totalEnergy"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Total Energy (kcal) *
// //                             </label>
// //                             <input
// //                                 id="totalEnergy"
// //                                 type="number"
// //                                 {...register('totalEnergy', {
// //                                     required: 'Total energy is required',
// //                                     min: { value: 0, message: 'Total energy must be at least 0' },
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.totalEnergy ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter total energy (e.g., 380)"
// //                                 aria-invalid={errors.totalEnergy ? 'true' : 'false'}
// //                             />
// //                             {errors.totalEnergy && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.totalEnergy.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Carbohydrate */}
// //                         <div>
// //                             <label
// //                                 htmlFor="carbohydrate"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Carbohydrate (g) *
// //                             </label>
// //                             <input
// //                                 id="carbohydrate"
// //                                 type="number"
// //                                 {...register('carbohydrate', {
// //                                     required: 'Carbohydrate is required',
// //                                     min: { value: 0, message: 'Carbohydrate must be at least 0' },
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.carbohydrate ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter carbohydrate (e.g., 0)"
// //                                 aria-invalid={errors.carbohydrate ? 'true' : 'false'}
// //                             />
// //                             {errors.carbohydrate && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.carbohydrate.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Fat */}
// //                         <div>
// //                             <label
// //                                 htmlFor="fat"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Fat (g) *
// //                             </label>
// //                             <input
// //                                 id="fat"
// //                                 type="number"
// //                                 {...register('fat', {
// //                                     required: 'Fat is required',
// //                                     min: { value: 0, message: 'Fat must be at least 0' },
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.fat ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter fat (e.g., 12)"
// //                                 aria-invalid={errors.fat ? 'true' : 'false'}
// //                             />
// //                             {errors.fat && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.fat.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Protein */}
// //                         <div>
// //                             <label
// //                                 htmlFor="protein"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Protein (g) *
// //                             </label>
// //                             <input
// //                                 id="protein"
// //                                 type="number"
// //                                 {...register('protein', {
// //                                     required: 'Protein is required',
// //                                     min: { value: 0, message: 'Protein must be at least 0' },
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.protein ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter protein (e.g., 42)"
// //                                 aria-invalid={errors.protein ? 'true' : 'false'}
// //                             />
// //                             {errors.protein && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.protein.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Description */}
// //                         <div>
// //                             <label
// //                                 htmlFor="description"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Description (Optional)
// //                             </label>
// //                             <textarea
// //                                 id="description"
// //                                 rows={3}
// //                                 {...register('description')}
// //                                 className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
// //                                 placeholder="Enter sub category description"
// //                             />
// //                         </div>

// //                         {/* Price */}
// //                         <div>
// //                             <label
// //                                 htmlFor="price"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Sub Category Price *
// //                             </label>
// //                             <input
// //                                 id="price"
// //                                 type="number"
// //                                 {...register('price', {
// //                                     required: 'Price is required',
// //                                     min: { value: 0, message: 'Price must be at least 0' },
// //                                 })}
// //                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.price ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                                 placeholder="Enter price (e.g., 350)"
// //                                 aria-invalid={errors.price ? 'true' : 'false'}
// //                             />
// //                             {errors.price && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.price.message}
// //                                 </p>
// //                             )}
// //                         </div>

// //                         {/* Sub Category Image Upload */}
// //                         <div>
// //                             <label
// //                                 htmlFor="subCategoryImage"
// //                                 className="block text-sm font-medium text-gray-700 mb-1"
// //                             >
// //                                 Upload Sub Category Image (Optional)
// //                             </label>
// //                             <input
// //                                 id="subCategoryImage"
// //                                 type="file"
// //                                 accept="image/*"
// //                                 {...register('subCategoryImage')}
// //                                 className={`block w-full px-3 py-2 border rounded-lg text-sm cursor-pointer focus:outline-none ${errors.subCategoryImage ? 'border-red-400' : 'border-gray-300'
// //                                     }`}
// //                             />
// //                             {errors.subCategoryImage && (
// //                                 <p className="mt-1 text-xs text-red-600" role="alert">
// //                                     {errors.subCategoryImage.message}
// //                                 </p>
// //                             )}

// //                             {/* Image Preview */}
// //                             {preview && (
// //                                 <div className="mt-3">
// //                                     <p className="text-sm text-gray-600 mb-1">Preview:</p>
// //                                     <img
// //                                         src={preview}
// //                                         alt="Preview"
// //                                         className="h-32 w-32 object-cover rounded border"
// //                                     />
// //                                 </div>
// //                             )}
// //                         </div>

// //                         {/* Submit Button */}
// //                         <div className="flex justify-center pt-4">
// //                             <Button
// //                                 type="submit"
// //                                 variant="contained"
// //                                 color="primary"
// //                                 disabled={isSubmitting || !watch('subCategoryName').trim() || types.length === 0}
// //                                 startIcon={<AddIcon />}
// //                             >
// //                                 {isSubmitting ? 'Adding...' : 'Add Sub Category'}
// //                             </Button>
// //                         </div>
// //                     </form>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default SubCategoriesEdit;

// import React, { useState, useEffect } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import NavigateBtn from '../../../../../components/button/NavigateBtn';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Button } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ClearIcon from '@mui/icons-material/Clear';
// import callApi from '../../../../../util/admin_api';
// import { AxiosResponse } from 'axios';

// // Default image
// import defaultImg from '../../../../../assets/items/chicken leg piece.png';

// // Define API response type
// interface ApiResponse<T> {
//     statusCode: number;
//     success: boolean;
//     message: string;
//     data: T;
//     meta: any | null;
// }

// interface SubCategory {
//     _id: string;
//     name: string;
//     type: string[];
//     quality: string;
//     weight: string;
//     pieces: string;
//     serves: number;
//     totalEnergy: number;
//     carbohydrate: number;
//     fat: number;
//     protein: number;
//     description?: string;
//     img?: string;
//     price: number;
// }

// interface FormInputs {
//     subCategoryName: string;
//     type: string;
//     quality: string;
//     weight: string;
//     pieces: string;
//     serves: string;
//     totalEnergy: string;
//     carbohydrate: string;
//     fat: string;
//     protein: string;
//     description: string;
//     subCategoryImage: FileList | null;
//     price: string;
// }

// interface UserData {
//     token?: string;
// }

// const SubCategoriesEdit: React.FC = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//         watch,
//         setValue,
//         reset,
//     } = useForm<FormInputs>();

//     const navigate = useNavigate();
//     const { id } = useParams<{ id: string }>();
//     const location = useLocation();
//     const [preview, setPreview] = useState<string | null>(null);
//     const [types, setTypes] = useState<string[]>([]);
//     const [inputValue, setInputValue] = useState<string>('');
//     const [loading, setLoading] = useState(false);

//     // Get product data from location state or fetch it
//     const product = location.state?.product as SubCategory | undefined;
//     const subCategoryId = id || product?._id;

//     // Initialize form with product data
//     useEffect(() => {
//         if (product) {
//             setValue('subCategoryName', product.name);
//             setValue('quality', product.quality);
//             setValue('weight', product.weight);
//             setValue('pieces', product.pieces);
//             setValue('serves', product.serves.toString());
//             setValue('totalEnergy', product.totalEnergy.toString());
//             setValue('carbohydrate', product.carbohydrate.toString());
//             setValue('fat', product.fat.toString());
//             setValue('protein', product.protein.toString());
//             setValue('description', product.description || '');
//             setValue('price', product.price.toString());

//             setTypes(product.type || []);

//             // Set preview image
//             if (product.img) {
//                 setPreview(product.img);
//             } else {
//                 setPreview(defaultImg);
//             }
//         }
//     }, [product, setValue]);

//     // Watch file changes and set preview
//     const fileWatch = watch('subCategoryImage');
//     useEffect(() => {
//         if (fileWatch && fileWatch.length > 0) {
//             const file = fileWatch[0];
//             if (file.size > 5 * 1024 * 1024) {
//                 toast.error('Image size must be less than 5MB', {
//                     toastId: 'image-size-error',
//                     position: 'top-right',
//                     autoClose: 3000,
//                 });
//                 setValue('subCategoryImage', null);
//                 return;
//             }
//             if (!file.type.startsWith('image/')) {
//                 toast.error('Please upload a valid image file', {
//                     toastId: 'image-type-error',
//                     position: 'top-right',
//                     autoClose: 3000,
//                 });
//                 setValue('subCategoryImage', null);
//                 return;
//             }
//             const objectUrl = URL.createObjectURL(file);
//             setPreview(objectUrl);
//             return () => URL.revokeObjectURL(objectUrl);
//         }
//     }, [fileWatch, setValue]);

//     // Handle adding a type
//     const handleAddType = () => {
//         if (inputValue.trim()) {
//             setTypes((prev) => [...prev, inputValue.trim()]);
//             setInputValue('');
//         }
//     };

//     // Handle removing a type
//     const handleRemoveType = (typeToRemove: string) => {
//         setTypes((prev) => prev.filter((type) => type !== typeToRemove));
//     };

//     const onSubmit: SubmitHandler<FormInputs> = async (data) => {
//         if (!subCategoryId) {
//             toast.error('No sub category ID provided.', {
//                 toastId: 'edit-sub-category-error',
//                 position: 'top-right',
//                 autoClose: 3000,
//             });
//             return;
//         }

//         // Validation
//         const validations = [
//             { condition: !data.subCategoryName.trim(), message: 'Please enter a sub category name' },
//             { condition: types.length === 0, message: 'Please add at least one type' },
//             { condition: !data.quality.trim(), message: 'Please enter a quality' },
//             { condition: !data.weight.trim(), message: 'Please enter a weight' },
//             { condition: !data.pieces.trim(), message: 'Please enter the number of pieces' },
//             { condition: !data.serves.trim(), message: 'Please enter the number of serves' },
//             { condition: !data.totalEnergy.trim(), message: 'Please enter the total energy' },
//             { condition: !data.carbohydrate.trim(), message: 'Please enter the carbohydrate amount' },
//             { condition: !data.fat.trim(), message: 'Please enter the fat amount' },
//             { condition: !data.protein.trim(), message: 'Please enter the protein amount' },
//             { condition: !data.price.trim(), message: 'Please enter the price' },
//         ];

//         for (const validation of validations) {
//             if (validation.condition) {
//                 toast.error(validation.message, {
//                     toastId: 'edit-sub-category-error',
//                     position: 'top-right',
//                     autoClose: 3000,
//                 });
//                 return;
//             }
//         }

//         try {
//             const userDataString = localStorage.getItem('superAdminUser');
//             const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
//             const token = userData.token;

//             if (!token) {
//                 throw new Error('No authentication token found. Please log in.');
//             }

//             const formData = new FormData();
//             formData.append('name', data.subCategoryName);
//             formData.append('type', JSON.stringify(types));
//             formData.append('quality', data.quality);
//             formData.append('weight', data.weight);
//             formData.append('pieces', data.pieces);
//             formData.append('serves', data.serves);
//             formData.append('totalEnergy', data.totalEnergy);
//             formData.append('carbohydrate', data.carbohydrate);
//             formData.append('fat', data.fat);
//             formData.append('protein', data.protein);
//             formData.append('description', data.description || '');
//             formData.append('price', data.price);

//             if (data.subCategoryImage && data.subCategoryImage.length > 0) {
//                 formData.append('img', data.subCategoryImage[0]);
//             }

//             const response: AxiosResponse<ApiResponse<SubCategory>> = await callApi({
//                 url: `/admin/sub-product-categories/${subCategoryId}`,
//                 method: 'PATCH',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 data: formData,
//             });

//             if (!response.data.success) {
//                 throw new Error(response.data.message || 'Failed to edit sub category');
//             }

//             toast.success(`Sub category "${data.subCategoryName}" updated successfully!`, {
//                 toastId: 'edit-sub-category-success',
//                 position: 'top-right',
//                 autoClose: 2000,
//                 onClose: () => navigate(`/sub/categories/full-details`, { state: { id: subCategoryId } }),
//             });

//         } catch (error: unknown) {
//             const errorMessage = error instanceof Error ? error.message : 'Failed to edit sub category';
//             console.error('Error editing sub category:', errorMessage);

//             toast.error(errorMessage, {
//                 toastId: 'edit-sub-category-error',
//                 position: 'top-right',
//                 autoClose: 3000,
//             });

//             if (errorMessage.includes('token') || errorMessage.includes('Unauthorized')) {
//                 localStorage.removeItem('superAdminUser');
//                 navigate('/admin/login');
//             }
//         }
//     };

//     if (!product && !subCategoryId) {
//         return (
//             <div className="text-center py-12">
//                 <div className="mx-auto max-w-md">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <h3 className="mt-2 text-lg font-medium text-gray-900">Subcategory not found</h3>
//                     <p className="mt-1 text-sm text-gray-500">The subcategory you're looking for doesn't exist.</p>
//                     <div className="mt-6">
//                         <button
//                             onClick={() => navigate(-1)}
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
//                         >
//                             Go Back
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 style={{ zIndex: 9999 }}
//             />
//             <div className="bg-gradient-to-br px-0 py-8 sm:px-6 md:px-10 min-h-[60vh] min-w-[20rem] max-w-[40rem] m-auto">
//                 <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
//                     {/* Header */}
//                     <div className="mb-8 flex items-start justify-between">
//                         <h2 className="text-2xl font-bold text-gray-800">Edit Sub Category</h2>
//                         <NavigateBtn
//                             to={`/sub/categories/full-details`}
//                             state={{ id: subCategoryId }}
//                             label={
//                                 <>
//                                     <span className="hidden sm:flex items-center gap-1">
//                                         <ArrowBackIcon fontSize="small" />
//                                         <span>Back to Details</span>
//                                     </span>
//                                     <span className="flex sm:hidden items-center gap-1">
//                                         <ClearIcon fontSize="small" />
//                                     </span>
//                                 </>
//                             }
//                             className="text-sm"
//                         />
//                     </div>

//                     {/* Current Information */}
//                     {/* {product && (
//                         <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//                             <h3 className="text-lg font-semibold text-blue-800 mb-2">Editing: {product.name}</h3>
//                             <div className="text-sm text-blue-700">
//                                 <p>ID: {product._id}</p>
//                                 <p>Current Types: {product.type?.join(', ') || 'None'}</p>
//                                 {product.img && (
//                                     <div className="mt-2">
//                                         <p>Current Image:</p>
//                                         <img src={product.img} alt={product.name} className="h-20 w-20 object-cover rounded border mt-1" />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     )} */}

//                     {/* Form */}
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                         {/* Sub Category Name */}
//                         <div>
//                             <label htmlFor="subCategoryName" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Sub Category Name *
//                             </label>
//                             <input
//                                 id="subCategoryName"
//                                 type="text"
//                                 {...register('subCategoryName', {
//                                     required: 'Sub category name is required',
//                                     minLength: { value: 2, message: 'Name must be at least 2 characters' },
//                                 })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.subCategoryName ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter sub category name"
//                             />
//                             {errors.subCategoryName && (
//                                 <p className="mt-1 text-xs text-red-600">{errors.subCategoryName.message}</p>
//                             )}
//                         </div>

//                         {/* Types */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Types *</label>
//                             <div className="flex gap-2 mb-2">
//                                 <input
//                                     type="text"
//                                     value={inputValue}
//                                     onChange={(e) => setInputValue(e.target.value)}
//                                     placeholder="Add type..."
//                                     className="px-3 py-2 border rounded-lg flex-1"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={handleAddType}
//                                     className="px-3 py-2 bg-blue-500 text-white rounded-lg"
//                                 >
//                                     Add
//                                 </button>
//                             </div>
//                             <div className="flex flex-wrap gap-2">
//                                 {types.map((type) => (
//                                     <span key={type} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
//                                         {type}
//                                         <button
//                                             type="button"
//                                             onClick={() => handleRemoveType(type)}
//                                             className="text-red-500 font-bold"
//                                         >
//                                             ×
//                                         </button>
//                                     </span>
//                                 ))}
//                             </div>
//                             {types.length === 0 && (
//                                 <p className="mt-1 text-xs text-red-600">Please add at least one type</p>
//                             )}
//                         </div>

//                         {/* Quality */}
//                         <div>
//                             <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Quality *
//                             </label>
//                             <input
//                                 id="quality"
//                                 type="text"
//                                 {...register('quality', { required: 'Quality is required' })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.quality ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter quality"
//                             />
//                             {errors.quality && <p className="mt-1 text-xs text-red-600">{errors.quality.message}</p>}
//                         </div>

//                         {/* Weight */}
//                         <div>
//                             <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Weight *
//                             </label>
//                             <input
//                                 id="weight"
//                                 type="text"
//                                 {...register('weight', { required: 'Weight is required' })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.weight ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter weight"
//                             />
//                             {errors.weight && <p className="mt-1 text-xs text-red-600">{errors.weight.message}</p>}
//                         </div>

//                         {/* Pieces */}
//                         <div>
//                             <label htmlFor="pieces" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Pieces *
//                             </label>
//                             <input
//                                 id="pieces"
//                                 type="text"
//                                 {...register('pieces', { required: 'Pieces is required' })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.pieces ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter pieces"
//                             />
//                             {errors.pieces && <p className="mt-1 text-xs text-red-600">{errors.pieces.message}</p>}
//                         </div>

//                         {/* Serves */}
//                         <div>
//                             <label htmlFor="serves" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Serves *
//                             </label>
//                             <input
//                                 id="serves"
//                                 type="number"
//                                 {...register('serves', {
//                                     required: 'Serves is required',
//                                     min: { value: 1, message: 'Serves must be at least 1' },
//                                 })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.serves ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter serves"
//                             />
//                             {errors.serves && <p className="mt-1 text-xs text-red-600">{errors.serves.message}</p>}
//                         </div>

//                         {/* Total Energy */}
//                         <div>
//                             <label htmlFor="totalEnergy" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Total Energy (kcal) *
//                             </label>
//                             <input
//                                 id="totalEnergy"
//                                 type="number"
//                                 {...register('totalEnergy', {
//                                     required: 'Total energy is required',
//                                     min: { value: 0, message: 'Total energy must be at least 0' },
//                                 })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.totalEnergy ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter total energy"
//                             />
//                             {errors.totalEnergy && <p className="mt-1 text-xs text-red-600">{errors.totalEnergy.message}</p>}
//                         </div>

//                         {/* Carbohydrate */}
//                         <div>
//                             <label htmlFor="carbohydrate" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Carbohydrate (g) *
//                             </label>
//                             <input
//                                 id="carbohydrate"
//                                 type="number"
//                                 {...register('carbohydrate', {
//                                     required: 'Carbohydrate is required',
//                                     min: { value: 0, message: 'Carbohydrate must be at least 0' },
//                                 })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.carbohydrate ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter carbohydrate"
//                             />
//                             {errors.carbohydrate && <p className="mt-1 text-xs text-red-600">{errors.carbohydrate.message}</p>}
//                         </div>

//                         {/* Fat */}
//                         <div>
//                             <label htmlFor="fat" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Fat (g) *
//                             </label>
//                             <input
//                                 id="fat"
//                                 type="number"
//                                 {...register('fat', {
//                                     required: 'Fat is required',
//                                     min: { value: 0, message: 'Fat must be at least 0' },
//                                 })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.fat ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter fat"
//                             />
//                             {errors.fat && <p className="mt-1 text-xs text-red-600">{errors.fat.message}</p>}
//                         </div>

//                         {/* Protein */}
//                         <div>
//                             <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Protein (g) *
//                             </label>
//                             <input
//                                 id="protein"
//                                 type="number"
//                                 {...register('protein', {
//                                     required: 'Protein is required',
//                                     min: { value: 0, message: 'Protein must be at least 0' },
//                                 })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.protein ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter protein"
//                             />
//                             {errors.protein && <p className="mt-1 text-xs text-red-600">{errors.protein.message}</p>}
//                         </div>

//                         {/* Description */}
//                         <div>
//                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Description
//                             </label>
//                             <textarea
//                                 id="description"
//                                 rows={3}
//                                 {...register('description')}
//                                 className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
//                                 placeholder="Enter description"
//                             />
//                         </div>

//                         {/* Price */}
//                         <div>
//                             <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Price *
//                             </label>
//                             <input
//                                 id="price"
//                                 type="number"
//                                 {...register('price', {
//                                     required: 'Price is required',
//                                     min: { value: 0, message: 'Price must be at least 0' },
//                                 })}
//                                 className={`block w-full px-4 py-2 border rounded-lg shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.price ? 'border-red-400' : 'border-gray-300'
//                                     }`}
//                                 placeholder="Enter price"
//                             />
//                             {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>}
//                         </div>

//                         {/* Image Upload */}
//                         <div>
//                             <label htmlFor="subCategoryImage" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Update Image
//                             </label>
//                             <input
//                                 id="subCategoryImage"
//                                 type="file"
//                                 accept="image/*"
//                                 {...register('subCategoryImage')}
//                                 className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer focus:outline-none"
//                             />

//                             {/* Image Preview */}
//                             {preview && (
//                                 <div className="mt-3">
//                                     <p className="text-sm text-gray-600 mb-1">Current Image:</p>
//                                     <img
//                                         src={preview}
//                                         alt="Preview"
//                                         className="h-32 w-32 object-cover rounded border"
//                                     />
//                                 </div>
//                             )}
//                         </div>

//                         {/* Submit Button */}
//                         <div className="flex justify-center pt-4">
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 disabled={isSubmitting}
//                                 startIcon={<EditIcon />}
//                             >
//                                 {isSubmitting ? 'Updating...' : 'Update Sub Category'}
//                             </Button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SubCategoriesEdit;

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import callApi from '../../../../../util/admin_api';
import { AxiosResponse } from 'axios';

// Default image
import defaultImg from '../../../../../assets/items/chicken leg piece.png';

// Define API response type
interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta: any | null;
}

interface SubCategory {
    _id: string;
    name: string;
    type: string[];
    quality: string;
    weight: string;
    pieces: string;
    serves: number;
    totalEnergy: number;
    carbohydrate: number;
    fat: number;
    protein: number;
    description: string;
    img?: string;
    price: number;
    discount: number;
    discountPrice: number;
    bestSellers: boolean;
}

interface FormInputs {
    subCategoryName: string;
    type: string;
    quality: string;
    weight: string;
    pieces: string;
    serves: string;
    totalEnergy: string;
    carbohydrate: string;
    fat: string;
    protein: string;
    description: string;
    subCategoryImage: FileList | null;
    price: string;
    discount: string;
}

interface UserData {
    token?: string;
}

// Utility function to normalize type tokens (same as used in manager section and FullDetails)
const normalizeTypeTokens = (raw: any): string[] => {
    // Accept arrays, JSON-stringified arrays, comma-separated strings, or single strings
    try {
        if (Array.isArray(raw)) {
            return raw.flatMap((item) => normalizeTypeTokens(item));
        }
        if (typeof raw === 'string') {
            const s = raw.trim();
            if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('"[') && s.endsWith(']"'))) {
                const parsed = JSON.parse(s.replace(/^"|"$/g, ''));
                return Array.isArray(parsed) ? normalizeTypeTokens(parsed) : [String(parsed)];
            }
            if (s.includes(',')) {
                return s.split(',').map((t) => t.trim()).filter(Boolean);
            }
            return [s];
        }
        if (raw == null) return [];
        return [String(raw)];
    } catch {
        return [String(raw)];
    }
};

const SubCategoriesEdit: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        reset,
    } = useForm<FormInputs>();

    const navigate = useNavigate();
    const location = useLocation();
    const [preview, setPreview] = useState<string | null>(null);
    const [types, setTypes] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [product, setProduct] = useState<SubCategory | null>(null);
    const [loading, setLoading] = useState(false);

    // Get product data from location state
    const productFromState = location.state?.subCategory as any; // Using any to handle both interfaces
    const subCategoryId = productFromState?._id || productFromState?.id;
    
    // Debug logging
    console.log('Edit.tsx - subCategoryId:', subCategoryId);
    console.log('Edit.tsx - productFromState:', productFromState);
    console.log('Edit.tsx - location.state:', location.state);

    // Fetch full product details if we have an ID but incomplete data
    useEffect(() => {
        const fetchProductDetails = async () => {
            if (subCategoryId && (!productFromState || !productFromState.quality)) {
                try {
                    setLoading(true);
                    console.log('Edit.tsx - Fetching full product details for ID:', subCategoryId);
                    
                    const userDataString = localStorage.getItem('superAdminUser');
                    const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
                    const token = userData.token;

                    if (!token) {
                        throw new Error('No authentication token found. Please log in.');
                    }

                    const response: AxiosResponse<ApiResponse<SubCategory>> = await callApi({
                        url: `/admin/sub-product-categories-details/${subCategoryId}`,
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.data.success) {
                        throw new Error(response.data.message || 'Failed to fetch product details');
                    }

                    const fullProduct = response.data.data;
                    setProduct(fullProduct);
                    console.log('Edit.tsx - Fetched full product:', fullProduct);
                                    } catch (error: unknown) {
                        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product details';
                        console.error('Error fetching product details:', errorMessage);
                        
                        toast.error(errorMessage, {
                            toastId: 'fetch-product-details-error',
                            position: 'top-right',
                            autoClose: 3000,
                        });
                        
                        // If we can't fetch the details, try to use what we have from state
                        if (productFromState) {
                            setProduct(productFromState);
                            console.log('Edit.tsx - Falling back to product from state:', productFromState);
                        }
                    } finally {
                        setLoading(false);
                    }
                } else if (productFromState) {
                    // Use the data from state if it's complete
                    setProduct(productFromState);
                    console.log('Edit.tsx - Using product from state:', productFromState);
                }
        };

        fetchProductDetails();
    }, [subCategoryId, productFromState]);

    // Initialize form with product data
    useEffect(() => {
        console.log('Edit.tsx - useEffect triggered with product:', product);
        if (product) {
            console.log('Edit.tsx - Setting form values for product:', product.name);
            setValue('subCategoryName', product.name);
            setValue('quality', product.quality);
            setValue('weight', product.weight);
            setValue('pieces', product.pieces);
            setValue('serves', product.serves.toString());
            setValue('totalEnergy', product.totalEnergy.toString());
            setValue('carbohydrate', product.carbohydrate.toString());
            setValue('fat', product.fat.toString());
            setValue('protein', product.protein.toString());
            setValue('description', product.description || '');
            setValue('price', product.price.toString());
            setValue('discount', product.discount.toString());
            setTypes(normalizeTypeTokens(product.type) || []);
            setPreview(product.img || defaultImg);
        } else {
            console.log('Edit.tsx - No product data available');
        }
    }, [product, setValue]);

    // Watch file changes and set preview
    const fileWatch = watch('subCategoryImage');
    useEffect(() => {
        if (fileWatch && fileWatch.length > 0) {
            const file = fileWatch[0];
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB', {
                    toastId: 'image-size-error',
                    position: 'top-right',
                    autoClose: 3000,
                });
                setValue('subCategoryImage', null);
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file', {
                    toastId: 'image-type-error',
                    position: 'top-right',
                    autoClose: 3000,
                });
                setValue('subCategoryImage', null);
                return;
            }
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [fileWatch, setValue]);

    // Handle adding a type
    const handleAddType = () => {
        if (inputValue.trim()) {
            setTypes((prev) => [...prev, inputValue.trim()]);
            setInputValue('');
        }
    };

    // Handle removing a type
    const handleRemoveType = (typeToRemove: string) => {
        setTypes((prev) => prev.filter((type) => type !== typeToRemove));
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (!subCategoryId || subCategoryId === 'undefined') {
            console.error('Invalid subCategoryId:', subCategoryId);
            toast.error('Invalid sub category ID. Please try again.', {
                toastId: 'edit-sub-category-error',
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        // Validation
        const validations = [
            { condition: !data.subCategoryName.trim(), message: 'Please enter a sub category name' },
            { condition: types.length === 0, message: 'Please add at least one type' },
            { condition: !data.quality.trim(), message: 'Please enter a quality' },
            { condition: !data.weight.trim(), message: 'Please enter a weight' },
            { condition: !data.pieces.trim(), message: 'Please enter the number of pieces' },
            { condition: !data.serves.trim(), message: 'Please enter the number of serves' },
            { condition: !data.totalEnergy.trim(), message: 'Please enter the total energy' },
            { condition: !data.carbohydrate.trim(), message: 'Please enter the carbohydrate amount' },
            { condition: !data.fat.trim(), message: 'Please enter the fat amount' },
            { condition: !data.protein.trim(), message: 'Please enter the protein amount' },
            { condition: !data.description.trim(), message: 'Please enter a description' },
            { condition: !data.price.trim(), message: 'Please enter the price' },
            { condition: !data.discount.trim(), message: 'Please enter the discount percentage' },
        ];

        for (const validation of validations) {
            if (validation.condition) {
                toast.error(validation.message, {
                    toastId: 'edit-sub-category-error',
                    position: 'top-right',
                    autoClose: 3000,
                });
                return;
            }
        }

        try {
            const userDataString = localStorage.getItem('superAdminUser');
            const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
            const token = userData.token;

            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }

            const formData = new FormData();
            formData.append('name', data.subCategoryName);
            formData.append('type', JSON.stringify(types));
            formData.append('quality', data.quality);
            formData.append('weight', data.weight);
            formData.append('pieces', data.pieces);
            formData.append('serves', data.serves);
            formData.append('totalEnergy', data.totalEnergy);
            formData.append('carbohydrate', data.carbohydrate);
            formData.append('fat', data.fat);
            formData.append('protein', data.protein);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('discount', data.discount);

            if (data.subCategoryImage && data.subCategoryImage.length > 0) {
                formData.append('img', data.subCategoryImage[0]);
            }

            const response: AxiosResponse<ApiResponse<SubCategory>> = await callApi({
                url: `/admin/sub-product-categories/${subCategoryId}`,
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: formData,
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to edit sub category');
            }

            toast.success(`Sub category "${data.subCategoryName}" updated successfully!`, {
                toastId: 'edit-sub-category-success',
                position: 'top-right',
                autoClose: 2000,
                onClose: () => {
                    console.log('Edit.tsx - Success navigation, subCategoryId:', subCategoryId);
                    if (subCategoryId && subCategoryId !== 'undefined') {
                        console.log('Edit.tsx - Navigating to full-details with ID:', subCategoryId);
                        navigate(`/sub/categories/full-details`, { state: { id: subCategoryId } });
                    } else {
                        console.log('Edit.tsx - Fallback navigation to categories list');
                        // Fallback to main categories page if no valid ID
                        navigate(`/sub/categories`);
                    }
                },
            });

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to edit sub category';
            console.error('Error editing sub category:', errorMessage);

            toast.error(errorMessage, {
                toastId: 'edit-sub-category-error',
                position: 'top-right',
                autoClose: 3000,
            });

            if (errorMessage.includes('token') || errorMessage.includes('Unauthorized')) {
                localStorage.removeItem('superAdminUser');
                navigate('/admin/login');
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto max-w-md">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Loading subcategory...</h3>
                    <p className="mt-1 text-sm text-gray-500">Please wait while we fetch the details.</p>
                </div>
            </div>
        );
    }

    if (!product || !subCategoryId) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto max-w-md">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Subcategory not found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {!product ? 'No subcategory data provided.' : 'Invalid subcategory ID.'}
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
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
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8 sm:px-6 md:px-10">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">Edit Sub Category</h2>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                            <span className="hidden sm:flex items-center gap-1">
                                <ArrowBackIcon fontSize="small" />
                                <span>Back</span>
                            </span>
                            <span className="flex sm:hidden items-center gap-1">
                                <ClearIcon fontSize="small" />
                            </span>
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Sub Category Name */}
                        <div>
                            <label htmlFor="subCategoryName" className="block text-sm font-medium text-gray-700 mb-1">
                                Sub Category Name *
                            </label>
                            <input
                                id="subCategoryName"
                                type="text"
                                {...register('subCategoryName', {
                                    required: 'Sub category name is required',
                                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                                    maxLength: { value: 100, message: 'Name cannot exceed 100 characters' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.subCategoryName ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter sub category name"
                            />
                            {errors.subCategoryName && (
                                <p className="mt-1 text-xs text-red-600">{errors.subCategoryName.message}</p>
                            )}
                        </div>

                        {/* Types */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Types *</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Add type..."
                                    className="flex-1 px-3 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddType}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {types.map((type) => (
                                    <span key={type} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                                        {type}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveType(type)}
                                            className="text-red-500 font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                            {types.length === 0 && (
                                <p className="mt-1 text-xs text-red-600">Please add at least one type</p>
                            )}
                        </div>

                        {/* Quality */}
                        <div>
                            <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">
                                Quality *
                            </label>
                            <input
                                id="quality"
                                type="text"
                                {...register('quality', { required: 'Quality is required' })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.quality ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter quality"
                            />
                            {errors.quality && <p className="mt-1 text-xs text-red-600">{errors.quality.message}</p>}
                        </div>

                        {/* Weight */}
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                                Weight *
                            </label>
                            <input
                                id="weight"
                                type="text"
                                {...register('weight', { required: 'Weight is required' })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.weight ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter weight"
                            />
                            {errors.weight && <p className="mt-1 text-xs text-red-600">{errors.weight.message}</p>}
                        </div>

                        {/* Pieces */}
                        <div>
                            <label htmlFor="pieces" className="block text-sm font-medium text-gray-700 mb-1">
                                Pieces *
                            </label>
                            <input
                                id="pieces"
                                type="text"
                                {...register('pieces', { required: 'Pieces is required' })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pieces ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter pieces"
                            />
                            {errors.pieces && <p className="mt-1 text-xs text-red-600">{errors.pieces.message}</p>}
                        </div>

                        {/* Serves */}
                        <div>
                            <label htmlFor="serves" className="block text-sm font-medium text-gray-700 mb-1">
                                Serves *
                            </label>
                            <input
                                id="serves"
                                type="number"
                                {...register('serves', {
                                    required: 'Serves is required',
                                    min: { value: 1, message: 'Serves must be at least 1' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.serves ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter serves"
                            />
                            {errors.serves && <p className="mt-1 text-xs text-red-600">{errors.serves.message}</p>}
                        </div>

                        {/* Total Energy */}
                        <div>
                            <label htmlFor="totalEnergy" className="block text-sm font-medium text-gray-700 mb-1">
                                Total Energy (kcal) *
                            </label>
                            <input
                                id="totalEnergy"
                                type="number"
                                {...register('totalEnergy', {
                                    required: 'Total energy is required',
                                    min: { value: 0, message: 'Total energy must be at least 0' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.totalEnergy ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter total energy"
                            />
                            {errors.totalEnergy && <p className="mt-1 text-xs text-red-600">{errors.totalEnergy.message}</p>}
                        </div>

                        {/* Carbohydrate */}
                        <div>
                            <label htmlFor="carbohydrate" className="block text-sm font-medium text-gray-700 mb-1">
                                Carbohydrate (g) *
                            </label>
                            <input
                                id="carbohydrate"
                                type="number"
                                {...register('carbohydrate', {
                                    required: 'Carbohydrate is required',
                                    min: { value: 0, message: 'Carbohydrate must be at least 0' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.carbohydrate ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter carbohydrate"
                            />
                            {errors.carbohydrate && <p className="mt-1 text-xs text-red-600">{errors.carbohydrate.message}</p>}
                        </div>

                        {/* Fat */}
                        <div>
                            <label htmlFor="fat" className="block text-sm font-medium text-gray-700 mb-1">
                                Fat (g) *
                            </label>
                            <input
                                id="fat"
                                type="number"
                                {...register('fat', {
                                    required: 'Fat is required',
                                    min: { value: 0, message: 'Fat must be at least 0' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fat ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter fat"
                            />
                            {errors.fat && <p className="mt-1 text-xs text-red-600">{errors.fat.message}</p>}
                        </div>

                        {/* Protein */}
                        <div>
                            <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-1">
                                Protein (g) *
                            </label>
                            <input
                                id="protein"
                                type="number"
                                {...register('protein', {
                                    required: 'Protein is required',
                                    min: { value: 0, message: 'Protein must be at least 0' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.protein ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter protein"
                            />
                            {errors.protein && <p className="mt-1 text-xs text-red-600">{errors.protein.message}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                {...register('description', {
                                    required: 'Description is required',
                                    minLength: { value: 5, message: 'Description must be at least 5 characters long' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter description"
                            />
                            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Price *
                            </label>
                            <input
                                id="price"
                                type="number"
                                {...register('price', {
                                    required: 'Price is required',
                                    min: { value: 0, message: 'Price must be at least 0' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter price"
                            />
                            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>}
                        </div>

                        {/* Discount */}
                        <div>
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                                Discount (%) *
                            </label>
                            <input
                                id="discount"
                                type="number"
                                {...register('discount', {
                                    required: 'Discount is required',
                                    min: { value: 0, message: 'Discount cannot be negative' },
                                })}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.discount ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Enter discount percentage"
                            />
                            {errors.discount && <p className="mt-1 text-xs text-red-600">{errors.discount.message}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="subCategoryImage" className="block text-sm font-medium text-gray-700 mb-1">
                                Update Image
                            </label>
                            <input
                                id="subCategoryImage"
                                type="file"
                                accept="image/*"
                                {...register('subCategoryImage')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer focus:outline-none"
                            />
                            {preview && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-600 mb-1">Current Image:</p>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded border"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                startIcon={<EditIcon />}
                            >
                                {isSubmitting ? 'Updating...' : 'Update Sub Category'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategoriesEdit;