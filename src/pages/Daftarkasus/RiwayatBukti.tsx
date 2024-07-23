import React from 'react';
import { RiwayatBuktiData } from './DataDumyKasus';

const RiwayatBukti = () => {
  const formatDate: any = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="">
      {RiwayatBuktiData.map((data, index) => (
        <React.Fragment key={index}>
          <div className="p-2 dark:bg-slate-200">
            <table className="w-full text-black">
              <tbody>
                <tr>
                  <td className="border py-2 dark:bg-slate-400">Tanggal Penerimaan</td>
                  <td className="pl-2 dark:bg-slate-300">{formatDate(data.tanggal_penerima)}</td>
                </tr>
                <tr>
                  <td className="border py-2 dark:bg-slate-400">
                    Jenis dan Uraian lengkap Barang Bukti
                  </td>
                  <td className="pl-2 dark:bg-slate-300">{data.jenis_uraian}</td>
                </tr>
                <tr>
                  <td className="border py-2 dark:bg-slate-400">Tempat Penyimpanan</td>
                  <td className="pl-2 dark:bg-slate-300">{data.tempat_penyimpanan}</td>
                </tr>
                <tr>
                  <td className="border py-2 dark:bg-slate-400">Nama Penerima</td>
                  <td className="pl-2 dark:bg-slate-300">{data.nama_penerima}</td>
                </tr>
                <tr>
                  <td className="border py-2 dark:bg-slate-400">Tgl Penyerahan Barang Bukti</td>
                  <td className="pl-2 dark:bg-slate-300">{formatDate(data.tgl_penyerahan)}</td>
                </tr>
                <tr>
                  <td className="border py-2 dark:bg-slate-400">Catatan</td>
                  <td className="pl-2 dark:bg-slate-300">{data.catatan}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RiwayatBukti;
