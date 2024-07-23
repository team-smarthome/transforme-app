import React, { useState, useRef, useEffect } from 'react';

export const AddVisitorModal = ({ closeModal, onSubmit, defaultValue ,isDetail, isEdit}) => {

  const [formState, setFormState] = useState(
    defaultValue || {
      username: '',
      password: '',
   
    }
  );
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalContainerRef.current && !modalContainerRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);


  const validateForm = () => {
    if (formState.id && formState.value) {
      setErrors([]);
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        console.log(key);
        console.log(value);
        if (key == 'username' || key == 'password') {
          
          if (!value) {
            errorFields.push(key == 'id' ? 'Bond ID' : key);
          }
        }
      }
      console.log(errorFields);
      setErrors(errorFields);
      if (errorFields.length > 0) {
        return false;
      }
      return true;    }
  };

  const handleChange = (e) => {

    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState, 'formState');
    
    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      ref={modalContainerRef}
      className="modal-container fixed z-50 flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <div className="w-full flex justify-between">
            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {isDetail ? 'Detail User' : isEdit ? 'Edit User' : 'Add User'}
              </h3>
            </div>
            <strong
              className="text-xl align-center cursor-pointer "
              onClick={closeModal}
            >
              &times;
            </strong>
          </div>
          <form>
            <div className="grid grid-cols-3 gap-5 justify-normal">
              <div className="form-group w-full col-span-3">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Username
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="username"
                  onChange={handleChange}
                  value={formState.username}
                  disabled={isDetail}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 justify-normal pt-4">
              <div className="form-group w-full col-span-3">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Password
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="password"
                  type='password'
                  onChange={handleChange}
                  value={formState.password}
                  disabled={isDetail}
                />
              </div>
            </div>
       
            {errors.filter((item: string) => item.startsWith('INVALID_ID'))
              .length > 0 && (
              <>
                <br />
                <div className="error">
                  {errors
                    .filter((item: string) => item.startsWith('INVALID_ID'))[0]
                    .replace('INVALID_ID_', '')}{' '}
                  is not a valid bond
                </div>
              </>
            )}
            {errors.filter((item: string) => !item.startsWith('INVALID_ID'))
              .length > 0 && (
              <div className="error">
                Please input{' '}
                {errors
                  .filter((item: string) => !item.startsWith('INVALID_ID'))
                  .join(', ')}
              </div>
            )}

            <br></br>
            {
              isDetail ? null :

            <button
              className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            }
          </form>
        </div>
      </div>
    </div>
  );
};
