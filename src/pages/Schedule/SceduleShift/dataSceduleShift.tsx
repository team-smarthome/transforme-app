import { useEffect, useState } from 'react';
import AddDataShiftKerja from './addDataShiftKerja';
import {
  apiCreateShift,
  apiDeleteShift,
  apiEditShift,
  apiReadAllShift,
} from '../../../services/api';
import { Alerts } from './Alert';
import Loader from '../../../common/Loader';
import { DeleteShiftModal } from './deleteDataShift';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../../utils/constants';
import { Breadcrumbs } from '../../../components/Breadcrumbs';

interface Item {
  nama_shift: any;
  shift_id: any;
  waktu_mulai: any;
  waktu_selesai: any;
}

const DataSceduleShift = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dataShift, setDataShift] = useState([
    {
      nama_shift: '',
      shift_id: '',
      waktu_mulai: '',
      waktu_selesai: '',
    },
  ]);

  const [detailData, setDetailData] = useState<Item | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isOperator, setIsOperator] = useState<boolean>();

  const dataUserItem = localStorage.getItem('dataUser');
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  useEffect(() => {
    if (dataAdmin?.role_name === 'operator') {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }

    console.log(isOperator, 'Operator');
  }, [isOperator]);

  const [deleteData, setDeleteData] = useState({
    shift_id: '',
  });

  const handleEditClick = (item: Item) => {
    setDetailData(item);
    setModalEditOpen(true);
  };

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
    setModalEditOpen(false);
  };

  //get Token
  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const params = {
      shift_id: '',
      nama_shift: '',
      waktu_mulai: '',
      waktu_selesai: '',
    };
    try {
      const response = await apiReadAllShift(params, token);
      setDataShift(response.data.records);
      console.log(response, 'response shift');
      if (response.data.status !== 'OK') {
        throw new Error(response.data.message);
      }
      setIsLoading(false);
    } catch (e: any) {
      if (e.response.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  const handleAddShift = async (params: any) => {
    try {
      const AddData = await apiCreateShift(params, token);
      if (AddData.data.status === 'OK') {
        handleCloseAddModal();
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        fetchData();
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal menambah data',
        });
      }
    } catch (e: any) {
      console.error('Error adding shift data:', e);
      if (e.data.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  const handleEditShift = async (params: any) => {
    try {
      const EditShift = await apiEditShift(params, token);
      if (EditShift.data.status === 'OK') {
        handleCloseAddModal();
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil mengubah data',
        });
        fetchData();
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal mengubah data',
        });
      }
    } catch (e: any) {
      console.log(e);
      // if (e.data.status === 403) {
      //   navigate('/auth/signin', {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      // Alerts.fire({
      //   icon: e.data.status === 403 ? 'warning' : 'error',
      //   title: e.data.status === 403 ? Error403Message : e.message,
      // });
    }
  };

  //detail Data Shift
  const handleDetailClick = (item: Item) => {
    setDetailData(item);
    setModalDetailOpen(true);
  };

  //delete
  const handleDeleteClick = (item: any) => {
    console.log(item, 'del');
    setDeleteData({ shift_id: item });
    setModalDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const handleSubmitDeleteShift = async (params: any) => {
    try {
      const data = {};
      const AddData = await apiDeleteShift(params, token);
      if (AddData.data.status === 'OK') {
        handleCloseDeleteModal();
        const response = await apiReadAllShift(data, token);
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menghapus data',
        });
        setDataShift(response.data.records);
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal menghapus data',
        });
      }
    } catch (e: any) {
      if (e.response.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    } finally {
      setModalDeleteOpen(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="pb-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {modalAddOpen && (
          <AddDataShiftKerja
            closeModal={handleCloseAddModal}
            onSubmit={handleAddShift}
          />
        )}
        {modalEditOpen && (
          <AddDataShiftKerja
            closeModal={handleCloseAddModal}
            onSubmit={handleEditShift}
            defaultValue={detailData}
            isEdit={true}
          />
        )}

        {modalDetailOpen && (
          <AddDataShiftKerja
            closeModal={() => setModalDetailOpen(false)}
            onSubmit={handleAddShift}
            defaultValue={detailData}
            isDetail={true}
          />
        )}
        {modalDeleteOpen && (
          <DeleteShiftModal
            closeModal={handleCloseDeleteModal}
            onSubmit={handleSubmitDeleteShift}
            defaultValue={deleteData}
          />
        )}
        <div className="flex justify-between mb-3">
          <h1 className="text-xl font-semibold text-black dark:text-white">
            Data Jam Shift Kerja
          </h1>
          {!isOperator && (
            <button
              onClick={() => setModalAddOpen(!modalAddOpen)}
              className="text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
            >
              Tambah
            </button>
          )}
        </div>
        <div className="flex flex-col mb-5  ">
          <div className="rounded-b-md rounded-t-md">
            <ul>
              <li className="py-2.5 flex rounded-t-md bg-gray-2 dark:bg-slate-600">
                <ul className="w-full py-2.5">
                  <li className="flex items-center justify-center grid grid-cols-4">
                    <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
                      Nama Shift
                    </div>
                    <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
                      Waktu Mulai
                    </div>
                    <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
                      Waktu Selesai
                    </div>
                    <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base ">
                      Aksi
                    </div>
                  </li>
                </ul>
              </li>
              <li className="py-2.5 flex rounded-b-md bg-gray-2 dark:bg-meta-4 ">
                <ul className="w-full py-2.5 space-y-4">
                  {dataShift.map((item: any, index) => {
                    return (
                      <>
                        <li
                          key={index}
                          className="flex items-center justify-center grid grid-cols-4"
                        >
                          <div className="capitalize flex items-center justify-center text-sm font-medium xsm:text-base">
                            {item.nama_shift}
                          </div>
                          <div className="capitalize flex items-center justify-center text-sm font-medium xsm:text-base">
                            {item.waktu_mulai}
                          </div>
                          <div className=" capitalize flex items-center justify-center text-sm font-medium xsm:text-base">
                            {item.waktu_selesai}
                          </div>
                          <div className="flex items-center justify-center space-x-1 text-sm font-medium uppercase xsm:text-base ">
                            <button
                              onClick={() => handleDetailClick(item)}
                              className="py-1 text-sm px-2 text-black rounded-md bg-blue-300"
                            >
                              Detail
                            </button>
                            {!isOperator && (
                              <>
                                <button
                                  onClick={() => handleEditClick(item)}
                                  className="py-1 text-sm px-2 text-black rounded-md bg-blue-300"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteClick(item.shift_id)
                                  }
                                  className="py-1 text-sm px-2 text-white rounded-md bg-red-500"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataSceduleShift;
