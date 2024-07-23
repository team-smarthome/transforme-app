import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import {
  apiReadAllWBP,
  apiReadJaksaPenyidik,
  apiReadKasus,
  apiReadSaksi,
} from '../../../services/api';

const dataUserItem = localStorage.getItem('dataUser');

export const AddPenyidikanModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      wbp_profile_id: '',
      kasus_id: '',
      alasan_penyidikan: '',
      lokasi_penyidikan: '',
      waktu_penyidikan: '',
      agenda_penyidikan: '',
      hasil_penyidikan: '',
      nomor_penyidikan: '',
      jenis_perkara_id: '',
      kategori_perkara_id: '',
      role_ketua_jaksa_id: '',
      jaksa_penyidik: [],
      saksi: [],
    },
  );
  console.log('formstate', formState);

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  //Data
  const [dataWbp, setDataWbp] = useState([
    {
      wbp_profile_id: '',
      nama: '',
    },
  ]);
  const [dataKasus, setDataKasus] = useState([
    {
      kasus_id: '',
      nama_kasus: '',
      jenis_perkara_id: '',
      nama_jenis_perkara: '',
      kategori_perkara_id: '',
      nama_kategori_perkara: '',
    },
  ]);

  const [dataJaksaPenyidik, setDataJaksaPenyidik] = useState([
    {
      jaksa_penyidik_id: '',
      nama_jaksa: '',
    },
  ]);

  const [dataSaksi, setdataSaksi] = useState([
    {
      saksi_id: '',
      nama_saksi: '',
    },
  ]);

  useEffect(() => {
    const params = {
      pageSize: Number.MAX_SAFE_INTEGER,
    };
    const fetchData = async () => {
      const Wbp = await apiReadAllWBP(params, token);
      const kasus = await apiReadKasus(params, token);
      const jaksaPenyidik = await apiReadJaksaPenyidik(params, token);
      const saksi = await apiReadSaksi(params, token);
      setDataWbp(Wbp.data.records);
      setDataKasus(kasus.data.records);
      setDataJaksaPenyidik(jaksaPenyidik.data.records);
      setdataSaksi(saksi.data.records);
    };
    fetchData();
  }, []);

  //select Wbp
  const wbpOptions = dataWbp.map((item: any) => ({
    value: item.wbp_profile_id,
    label: item.nama,
  }));

  const wbpOptionsValue = {
    value: defaultValue?.wbp_profile_id,
    label: defaultValue?.nama_wbp,
  };
  console.log('opstions', wbpOptionsValue);

  const onChangeWbp = (e: any) => {
    setFormState({ ...formState, wbp_profile_id: e.value });
  };

  //select kasus
  const kasusOptions = dataKasus.map((item: any) => ({
    value: item.kasus_id,
    label: item.nama_kasus,
  }));

  const kasusOptionsValue = {
    value: defaultValue.kasus_id,
    label: defaultValue.nama_kasus,
  };

  //select jenis perkara
  const jaksaPenyidikOptions = dataJaksaPenyidik.map((item: any) => ({
    value: item.jaksa_penyidik_id,
    label: item.nama_jaksa,
  }));

  const [jaksaPenyidikKetua, setJaksaPenyidikKetua] = useState([
    {
      value: '',
      label: '',
    },
  ]);

  const jaksaPenyidikKetuaOptions = jaksaPenyidikKetua.map((item: any) => ({
    value: item.value,
    label: item.label,
  }));
  const handleSelectJaksa = (e: any) => {
    let arrayTemp: any = [];
    let arrayAnggota: any = [];
    for (let i = 0; i < e?.length; i++) {
      arrayTemp.push(e[i].value);
      arrayAnggota.push(e[i]);
    }
    setFormState({ ...formState, jaksa_penyidik: arrayTemp });
    setJaksaPenyidikKetua(arrayAnggota);
  };

  const handleSelectKetuaJaksa = (e: any) => {
    setFormState({ ...formState, role_ketua_jaksa_id: e.value });
  };

  //select saksi
  const saksiOpstions = dataSaksi.map((item: any) => ({
    value: item.saksi_id,
    label: item.nama_saksi,
  }));

  const handleSelectSaksi = (e: any) => {
    let arrayTemp: any = [];
    for (let i = 0; i < e?.length; i++) {
      arrayTemp.push(e[i].value);
    }
    setFormState({ ...formState, saksi: arrayTemp });
  };

  const onChangeKasus = (e: any) => {
    const kasusFilter = dataKasus.filter(
      (item: any) => item.kasus_id === e.value,
    );
    setFormState({
      ...formState,
      kasus_id: kasusFilter[0]?.kasus_id,
      jenis_perkara_id: kasusFilter[0]?.jenis_perkara_id,
      kategori_perkara_id: kasusFilter[0]?.kategori_perkara_id,
      nama_jenis_perkara: kasusFilter[0].nama_jenis_perkara,
      nama_kategori_perkara: kasusFilter[0]?.nama_kategori_perkara,
    });
  };

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (!value) {
        errorFields.push(key);
      }
    }

    if (
      !Array.isArray(formState.jaksa_penyidik) ||
      formState.jaksa_penyidik.length === 0
    ) {
      errorFields.push('jaksa_penyidik');
    }
    if (!Array.isArray(formState.saksi) || formState.saksi.length === 0) {
      errorFields.push('saksi');
    }
    if (errorFields.length > 0) {
      setErrors(errorFields);
      return false;
    }

    setErrors([]);
    return true;
  };
  console.log('erros', errors);

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState).then(() => setButtonLoad(false));
  };

  const modalStyles: any = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)', // Background color with transparency for the blur effect
      backdropFilter: 'blur(5px)', // Adjust the blur intensity as needed
      zIndex: 40, // Ensure the backdrop is behind the modal
    },
    modalContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // Add your other modal styles here
    },
  };

  //react Select
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'rgb(30 41 59)',
      borderColor: 'rgb(30 41 59)',
      color: 'white',
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 3,
      paddingRight: 4.5,
      borderRadius: 5,

      '&:hover': {
        borderColor: 'rgb(30 41 59)',
      },
      '&:active': {
        borderColor: 'rgb(30 41 59)',
      },
      '&:focus': {
        borderColor: 'rgb(30 41 59)',
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'white',
      height: '35px',
    }),
    menu: (provided: any) => ({
      ...provided,
      color: 'white',
      paddingLeft: '5px',
      paddingRight: '5px',
      backgroundColor: 'rgb(30 41 59)',
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        borderRadius: '6px',

        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? ''
            : isFocused
              ? 'rgb(51, 133, 255)'
              : undefined,

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled,
        },
      };
    },
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: '16px',
      color: 'grey',
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: '16px',
      color: 'white',
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'rgb(51, 133, 255)',
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: 'white',
    }),
  };

  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full w-[80vh]"> */}
        <div className="modal rounded-sm w-full">
          {isLoading ? (
            <div>
              <div className="flex flex-row-reverse pr-5 pt-3">
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <div className="h-[500px] justify-center flex items-center">
                <svg
                  className="animate-spin h-20 w-20 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Data Penyidikan'
                      : isEdit
                        ? 'Edit Data Penyidikan'
                        : 'Tambah Data Penyidikan'}
                  </h3>
                </div>
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor Penyidikan
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nomor_penyidikan"
                      placeholder="Nomor Penyidikan"
                      onChange={handleChange}
                      value={formState.nomor_penyidikan}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nomor_penyidikan'
                          ? 'Masukan Nomor Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Wbp
                    </label>
                    <Select
                      placeholder="Nama Wbp"
                      onChange={onChangeWbp}
                      isDisabled={isDetail}
                      defaultValue={wbpOptionsValue}
                      options={wbpOptions}
                      styles={customStyles}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'wbp_profile_id' ? 'Masukan Nama Wbp' : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Kasus
                    </label>
                    <Select
                      placeholder="Nama Kasus"
                      isDisabled={isDetail}
                      onChange={onChangeKasus}
                      defaultValue={kasusOptionsValue}
                      options={kasusOptions}
                      styles={customStyles}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'kasus_id' ? 'Masukan Nama Kasus' : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jenis Perkara
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_jenis_perkara"
                      placeholder="Jenis Perkara"
                      onChange={handleChange}
                      value={formState.nama_jenis_perkara}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_jenis_perkara'
                          ? 'Masukan Jenis Perkara'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Kategori Perkara
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_kategori_perkara"
                      placeholder="Kategori Perkara"
                      onChange={handleChange}
                      value={formState.nama_kategori_perkara}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_kategori_perkara'
                          ? 'Masukan Kategori Perkara'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Agenda Penyidikan
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="agenda_penyidikan"
                      placeholder="Agenda Penyidikan"
                      onChange={handleChange}
                      value={formState.agenda_penyidikan}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'agenda_penyidikan'
                          ? 'Masukan Agenda Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Penyidikan
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="waktu_penyidikan"
                      placeholder="Waktu Penyidikan"
                      onChange={handleChange}
                      value={formState.waktu_penyidikan}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'waktu_penyidikan'
                          ? 'Masukan Waktu Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="form-group w-full mt-4">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Lokasi Penyidikan
                  </label>
                  <textarea
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                    name="lokasi_penyidikan"
                    placeholder="Lokasi Penyidikan"
                    onChange={handleChange}
                    value={formState.lokasi_penyidikan}
                    disabled={isDetail}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === 'lokasi_penyidikan'
                        ? 'Masukan Lokasi Penyidikan'
                        : '',
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-1">
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Alasan Penyidikan
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="alasan_penyidikan"
                      id="textArea"
                      placeholder="Alasan Penyidikan"
                      onChange={handleChange}
                      value={formState.alasan_penyidikan}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'alasan_penyidikan'
                          ? 'Masukan Alasan Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Hasil Penyidikan
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="hasil_penyidikan"
                      placeholder="Hasil Penyidikan"
                      onChange={handleChange}
                      value={formState.hasil_penyidikan}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'hasil_penyidikan'
                          ? 'Masukan Hasil Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Anggota Jaksa Penyidik
                    </label>
                    <Select
                      className="capitalize"
                      isMulti
                      options={jaksaPenyidikOptions}
                      isDisabled={isDetail}
                      onChange={handleSelectJaksa}
                      placeholder="Select Jaksa Penyidik"
                      styles={customStyles}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'jaksa_penyidik'
                          ? 'Masukan Jaksa Penyidik'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Ketua Jaksa Penyidik
                    </label>
                    <Select
                      className="capitalize"
                      options={jaksaPenyidikKetuaOptions}
                      isDisabled={isDetail}
                      onChange={handleSelectKetuaJaksa}
                      placeholder="Select Ketua Jaksa Penyidik"
                      styles={customStyles}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'role_ketua_jaksa_id'
                          ? 'Masukan Ketua Jaksa Penyidik'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="form-group w-full mt-4">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Saksi
                  </label>
                  <Select
                    className={`${isDetail ? 'hidden' : 'capitalize'}`}
                    styles={customStyles}
                    isDisabled={isDetail}
                    isMulti
                    onChange={handleSelectSaksi}
                    options={saksiOpstions}
                  />
                  {!isDetail ? null : (
                    <div className="dark:bg-slate-800 mt-3 rounded-sm">
                      <div className="grid grid-cols-2 pl-3 dark:bg-slate-500 rounded-t-sm">
                        <h1>Nama</h1>
                        <h1>Keterangan Saksi</h1>
                      </div>

                      {formState.saksi.map((item: any) => {
                        return (
                          <div className="grid grid-cols-2 pl-3">
                            <input
                              className="bg-slate-800 capitalize "
                              value={item.nama_saksi}
                            />
                            <input
                              className="bg-slate-800 capitalize"
                              value={item.keterangan}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <p className="error-text">
                    {errors.map((item) =>
                      item === 'saksi' ? 'Masukan Saksi' : '',
                    )}
                  </p>
                </div>
                <div
                  className={`form-group w-full mt-4 ${!isDetail ? 'hidden' : ''}`}
                >
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Histori Penyidikan
                  </label>
                  {defaultValue?.histori_penyidikan?.length === 0 ? null : (
                    <div className="dark:bg-slate-800 mt-3 rounded-sm">
                      <div className="flex items-center pl-3 dark:bg-slate-500 rounded-t-sm">
                        <h1 className="w-2/3">Hasil Penyidikan</h1>
                        <h1 className="w-1/3">Lama Masa Tahanan</h1>
                      </div>
                      {defaultValue?.histori_penyidikan.map((item: any) => {
                        return (
                          <div className="flex items-center pl-3 mb-1">
                            <input
                              className="bg-slate-800 capitalize w-2/3"
                              value={item.hasil_penyidikan}
                            />
                            <input
                              className="bg-slate-800 capitalize w-1/3"
                              value={item.lama_masa_tahanan}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <p className="error-text">
                    {errors.map((item) =>
                      item === 'nomor_penyidikan'
                        ? 'Masukan Nomor Penyidikan'
                        : '',
                    )}
                  </p>
                </div>

                {errors.filter((item: string) => item.startsWith('INVALID_ID'))
                  .length > 0 && (
                  <>
                    <br />
                    <div className="error">
                      {errors
                        .filter((item: string) =>
                          item.startsWith('INVALID_ID'),
                        )[0]
                        .replace('INVALID_ID_', '')}{' '}
                      is not a valid bond
                    </div>
                  </>
                )}

                <br></br>
                {isDetail ? null : isEdit ? (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? 'bg-slate-400' : ''
                    }`}
                    type="submit"
                    disabled={buttonLoad}
                  >
                    {buttonLoad ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      ''
                    )}
                    Ubah Data Penyidikan
                  </button>
                ) : (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? 'bg-slate-400' : ''
                    }`}
                    type="submit"
                    disabled={buttonLoad}
                  >
                    {buttonLoad ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      ''
                    )}
                    Tambah Data Penyidikan
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
