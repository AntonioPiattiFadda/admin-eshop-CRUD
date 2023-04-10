//import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addProduct } from '../Services/api/products';

// No se porque no me funciona la peticion con Formik.

export default function Example() {
  const onSubmit = (data) => {
    const newData = { ...data, categoryId: parseInt(values.categoryId, 10) };
    console.log(newData);
    addProduct(newData)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  const { handleSubmit, handleChange, values, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      title: '',
      price: '',
      description: '',
      categoryId: '',
      images: '',
    },

    validationSchema: Yup.object({
      title: Yup.string().min(3, 'El nombre debe tener al menos 6 caracteres').required('El title es obligatorio'),
      price: Yup.number('El precio tiene que ser un numero').required('El precio es obligatorio'),
      description: Yup.string()
        .test('min-words', 'La descripción debe tener al menos 5 palabras', (value) => value && value.match(/\b\w+\b/g).length >= 5)
        .min(15, 'La descripción debe tener al menos 15 caracteres')
        .required('La descripción es obligatoria'),
      categoryId: Yup.number().min(1, 'Please select a category').max(5, 'Please select a category').required('Please select a category'),
      images: Yup.array().min(1, 'Necesitas al menos una foto').required('Necesitas un foto'),
    }),
    onSubmit,
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.title && touched.title && <div className="text-red-500">{errors.title}</div>}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                onChange={handleChange}
                type="number"
                name="price"
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.price && touched.price && <div className="text-red-500">{errors.price}</div>}
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              {errors.categoryId && touched.categoryId && <div className="text-red-500">{errors.categoryId}</div>}
              <select
                onChange={handleChange}
                id="categoryId"
                name="categoryId"
                defaultValue=""
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled hidden>
                  Select a category
                </option>
                <option value={1}>Clothes</option>
                <option value={2}>Electronics</option>
                <option value={3}>Furniture</option>
                <option value={4}>Toys</option>
                <option value={5}>Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                onChange={handleChange}
                name="description"
                id="description"
                autoComplete="description"
                rows="3"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.description && touched.description && <div className="text-red-500">{errors.description}</div>}
            </div>
            <div className="col-span-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          multiple
                          onChange={(event) => {
                            const files = event.currentTarget.files;
                            const images = Array.from(files).map((file) => URL.createObjectURL(file));
                            setFieldValue('images', images);
                          }}
                          id="images"
                          name="images"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {errors.images && touched.images && <div className="text-red-500">{errors.images}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
