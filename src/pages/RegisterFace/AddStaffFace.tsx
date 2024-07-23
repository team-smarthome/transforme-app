import React, { useState } from 'react';
import * as yup from 'yup';
import { apiVisitorInsert } from '../../services/api';

const AddInnmateFace = () => {
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formValues, setFormValues] = useState({
    name: '',
    visitorId: '',
    identity: '',
    status_vaksin: 0,
    countryId: 100,
    gender: '',
    userId: localStorage.getItem('loginUser')?.replace(/^"(.*)"$/, '$1'),
    dob: new Date(),
    image: null, // Add a field for image data
  });

  const handleInsertVisitor = async () => {
    try {
      setLoading(true);
console.log(formValues, 'formValues formValues');

// console.log(imagePreview, 'imagePreview imagePreview');

      const response = await apiVisitorInsert(formValues);

      if (response.data.code === 1000) {
        setIsAdded(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader.result, 'reader reader');
      
      reader.onloadend = () => {
        console.log(reader.result, 'reader.result reader.result');
        setFormValues({ ...formValues, image: reader.result })

        // setImagePreview(reader.result);
        console.log(formValues.image, 'imagePreview imagePreview');
        
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex gap-20">
        <div>Add Prajurit Binaan</div>
        <div>
          <form
            style={{
              padding: '0px 40px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              alignItems: 'center',
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleInsertVisitor();
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <div
                className="maxWidth: 300 mt-3 pt-2 flex flex-col items-center"
              >
                {imagePreview ? (
                  <img
                    className="h-300 w-200 mb-2 border-2 border-gray-200 border-dashed rounded-md"
                    src={imagePreview}
                    alt="Image Preview"
                  />
                ) : (
                  <img
                    className="h-300 w-200 mb-2 border-2 border-gray-200 border-dashed rounded-md"
                    src="https://via.placeholder.com/200x300"
                    alt="Placeholder"
                  />
                )}
                <input
                  accept="image/*"
                  type="file"
                  id="image-upload"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload Image
                  </div>
                </label>
              </div>
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                  className="w-full mt-2"
                  placeholder="Visitor Name"
                />
                <input
                  type="text"
                  id="visitorId"
                  name="visitorId"
                  value={formValues.visitorId}
                  onChange={(e) =>
                    setFormValues({ ...formValues, visitorId: e.target.value })
                  }
                  className="w-full mt-2"
                  placeholder="Visitor ID"
                />
                <input
                  type="text"
                  id="identity"
                  name="identity"
                  value={formValues.identity}
                  onChange={(e) =>
                    setFormValues({ ...formValues, identity: e.target.value })
                  }
                  className="w-full mt-2"
                  placeholder="ID Card Number"
                />
                <input
                  className="w-full mt-2"
                  label="Tanggal Lahir"
                  name="dob"
                  type="date"
                  value={formValues.dob}
                  onChange={(e) =>
                    setFormValues({ ...formValues, dob: e.target.value })
                  }
                />
                <div className="w-full mt-2">
                  <div>Select Status Vaksin</div>
                  <select
                    name="status_vaksin"
                    value={formValues.status_vaksin}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        status_vaksin: e.target.value,
                      })
                    }
                    className="w-full mt-2 h-10"
                  >
                    <option value={0}>Belum Vaksin</option>
                    <option value={1}>Vaksin Dosis 1</option>
                    <option value={2}>Vaksin Dosis 2</option>
                    <option value={3}>Vaksin Booster 1</option>
                    <option value={4}>Vaksin Booster 2</option>
                  </select>
                </div>
                <div className="w-full mt-2">
                  <div>Select Gender</div>
                  <select
                    className="w-full mt-2 h-10"
                    name="gender"
                    value={formValues.gender}
                    onChange={(e) =>
                      setFormValues({ ...formValues, gender: e.target.value })
                    }
                  >
                    <option value="t">Pria</option>
                    <option value="f">Wanita</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end m-3">
              <button disabled={!formValues.image} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {isAdded && (
        <div
          className={`fixed bottom-4 right-4 ${isAdded ? 'block' : 'hidden'}`}
        >
          <div className="bg-green-500 text-white px-4 py-2 rounded font-semibold">
            Data have been saved successfully
            <button className="ml-2" onClick={() => setIsAdded(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInnmateFace;
