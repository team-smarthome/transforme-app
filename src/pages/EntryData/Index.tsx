import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import AddBAP from './AddBAP';
import AddPenyidikan from './AddPenyidikan';
import AddSidang from './AddSidang';
import BarangBukti from './BarangBukti';
import DetailKasus from './DetailKasus';

import dayjs from 'dayjs';
import { apiReadBAP, apiReadKasus, apiReadPenyidikan } from '../../services/api';
import { WbpInsert } from './WbpInsert';
const EntryData = () => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState(0);
  const [nomorPenyidikan, setNomorPenyidikan] = useState("")
  const [nomorKasus, setNomorKasus] = useState("")
  const [namaDokumenBap, setNamaDokumenBap] = useState("")
  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const generateNomorPenyidikan = async() => {
    function convertToRoman(num: number) {
      const romanNumerals = [
        'M',
        'CM',
        'D',
        'CD',
        'C',
        'XC',
        'L',
        'XL',
        'X',
        'IX',
        'V',
        'IV',
        'I',
      ];
      const decimalValues = [
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
      ];

      let result = '';

      for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= decimalValues[i]) {
          result += romanNumerals[i];
          num -= decimalValues[i];
        }
      }

      return result;
    }
    const type = 'Sp.Sidik';
    const day = dayjs(new Date()).format('DD');
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const year = new Date().getFullYear().toString();
    const lokasi = 'Otmil';
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;
    const penyidikan = await apiReadPenyidikan({}, token);
     const resultPenyidikan = penyidikan.data.records;
     resultPenyidikan.forEach((item: any) => {
      if (item.nomor_penyidikan) {
        const nomorPenyidikan = item.nomor_penyidikan.split('/')[0]; // Get the first part of the case number
        const angka = parseInt(nomorPenyidikan, 10);

        if (!isNaN(angka) && item.nomor_penyidikan.includes(currentDate)) {
          angkaTerbesar = Math.max(angkaTerbesar, angka);
        }
      }
    });

    // Increment the largest number by 1 if the date is the same
    if (angkaTerbesar === 0) {
      // No matching cases for the current date
      angkaTerbesar = 1;
    } else {
      angkaTerbesar += 1;
    }
    const output =`${angkaTerbesar}/${type}/${currentDate}/${lokasi}`
    console.log(output, "outputnya")
    setNomorPenyidikan(output)
    
   
  };

  const generateNomorKasus = async() => {
    function convertToRoman(num:number) {
      const romanNumerals = [
        'M',
        'CM',
        'D',
        'CD',
        'C',
        'XC',
        'L',
        'XL',
        'X',
        'IX',
        'V',
        'IV',
        'I',
      ];
      const decimalValues = [
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
      ];

      let result = '';

      for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= decimalValues[i]) {
          result += romanNumerals[i];
          num -= decimalValues[i];
        }
      }
    
      return result;
    }
    const type = 'Pid.K';
    const day = dayjs(new Date()).format('DD');
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const year = new Date().getFullYear().toString();
    const lokasi = 'Otmil';
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;
    const kasus = await apiReadKasus({}, token);
    const resultKasus = kasus.data.records;
    resultKasus.forEach((item: any) => {
      if (item.nomor_kasus) {
        const nomorKasus = item.nomor_kasus.split('/')[0];
        const angka = parseInt(nomorKasus, 10);

        if (!isNaN(angka) && item.nomor_kasus.includes(currentDate)) {
          angkaTerbesar = Math.max(angkaTerbesar, angka);
        }
      }
    });

    if (angkaTerbesar ===0) {
      angkaTerbesar = 1;
    } else {
      angkaTerbesar += 1;
    }
    const output =`${angkaTerbesar}/${type}/${currentDate}/${lokasi}`
    console.log(output, "Nomor kasus")
    setNomorKasus(output)
  };
  
  useEffect(() => {
    Promise.all([
      generateNomorPenyidikan(),
      generateNomorKasus()
    ])
    return () => {
      localStorage.removeItem('formState');
    }
  }, [])
// console.log(nomorPenyidikan, "ada nomor gk")
console.log(nomorKasus, "nomor kasusnya")
console.log(nomorPenyidikan, "ada nomor gk")

  const generateNamaDokumenBap = async () => {
    function convertToRoman(num: number) {
      const romanNumerals = [
        'M',
        'CM',
        'D',
        'CD',
        'C',
        'XC',
        'L',
        'XL',
        'X',
        'IX',
        'V',
        'IV',
        'I',
      ];
      const decimalValues = [
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
      ];

      let result = '';

      for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= decimalValues[i]) {
          result += romanNumerals[i];
          num -= decimalValues[i];
        }
      }

      return result;
    }
    const type = 'BAP';
    const day = dayjs(new Date()).format('DD');
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const year = new Date().getFullYear().toString();
    const lokasi = 'Otmil';
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;
    const bap = await apiReadBAP({}, token);
    const resultBap = bap.data.records;

    resultBap.forEach((item:any) => {
      if(item.nama_dokumen_bap){
        const namaDokumenBap = item.nama_dokumen_bap.split('/')[0];
        const angka = parseInt(namaDokumenBap, 10);

        if(!isNaN(angka) && item.nama_dokumen_bap.includes(currentDate)){
          angkaTerbesar = Math.max(angkaTerbesar, angka);
        }
      }
    });

    // Increment the largest number by 1 if the date is the same
    if (angkaTerbesar === 0) {
      // No matching cases for the current date
      angkaTerbesar = 1;
    } else {
      angkaTerbesar += 1;
    }

    const output = `${angkaTerbesar}/${type}/${currentDate}/${lokasi}`
    console.log(output, "output cuyy")
    setNamaDokumenBap(output);
  };

  useEffect(() => {
    generateNamaDokumenBap();
    return() =>{
      localStorage.removeItem('formState');
    }
  }, [])
  console.log(namaDokumenBap, 'ada nama gak')

  function handlePrev() {
    setCurrentForm(currentForm - 1);
  }

  function handleNext() {
    if (currentForm + 1 == formList.length) {
      return navigate('/master-data/tersangka');
    }
    setCurrentForm(currentForm + 1);
    console.log(currentForm, "page")
  }
  const formList = [
    {
      nama: 'Detail Tersangka',
      component: (
        <div>
          <WbpInsert handleNext={handleNext} nomorKasus = {nomorKasus} />
        </div>
      ),
    },
    {
      nama: 'Detail Kasus',
      component: <DetailKasus nomorKasus = {nomorKasus} handleNext={handleNext} />,
    },
    {
      nama: 'Barang Bukti',
      component: <BarangBukti handleNext={handleNext} />,
    },
    {
      nama: 'Detail Penyidikan',
      component: <AddPenyidikan nomorPenyidikan={nomorPenyidikan} handleNext={handleNext} />,
    },
    {
      nama: 'Detail Sidang',
      component: <AddSidang handleNext={handleNext} />,
    },
    {
      nama: 'Tambah BAP',
      component: <AddBAP namaDokumenBap={namaDokumenBap} handleNext={handleNext} />,
    },
  ];
  return (
    <div>
      <ProgressBar list={formList} currentForm={currentForm} />
      <div className="h-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-15 xl:pb-1 flex flex-col gap-12">
        <h1 className="font-bold text-2xl tracking-wide">
          {formList[currentForm].nama}
        </h1>
        <div className="">{formList[currentForm].component}</div>
        <div className="flex justify-end gap-x-3 mb-4">
          {currentForm !== 0 && (
            <button
              className="bg-slate-600 hover:bg-slate-500 text-slate-300 hover:text-slate-50 w-36 py-1 text-lg font-bold rounded-md duration-200"
              onClick={handlePrev}
            >
              Kembali
            </button>
          )}
          <button
            className={`${currentForm + 1 !== formList.length ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-400'} duration-200 w-36 py-1 text-lg text-white font-bold rounded-md`}
            onClick={handleNext}
          >
            {currentForm + 1 !== formList.length ? 'Lanjut' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryData;
