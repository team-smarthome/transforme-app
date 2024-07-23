import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import UserOne from '../images/user/user-01.png';
import { HiDotsVertical, HiOutlineTrash, HiPencilAlt } from 'react-icons/hi';

const DropdownAction = (props: any) => {
  const { handleEditClick, handleDeleteClick } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <button ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)}>
        <HiDotsVertical></HiDotsVertical>
      </button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-5 -mt-13 flex w-fit flex-col px-4 py-2 gap-2 rounded-sm border text-slate-500 border-stroke bg-white shadow-default dark:border-strokedark dark:white
         ${dropdownOpen === true ? 'block' : 'hidden'}`}
      >
        <button
          onClick={handleEditClick}
          className="z-40 flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base "
        >
          <HiPencilAlt className="w-5 h-5" />
          Ubah
        </button>
        <div className="border-[0.5px] border-slate-200"></div>
        <button
          onClick={handleDeleteClick}
          className="z-40 flex items-center gap-2 text-sm  font-medium duration-300 ease-in-out hover:text-red-500 lg:text-base "
        >
          <HiOutlineTrash className="w-5 h-5" />
          Hapus
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownAction;
