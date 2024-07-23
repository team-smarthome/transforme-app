import React from 'react';

const Kasasi = () => {
  return (
    <div className="p-4 dark:bg-slate-200">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">DATA PARA PIHAK</h2>
        <table className="w-full mb-8">
          <thead>
            <th
              className={`p-4 w-[5%] bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
            >
              No
            </th>
            <th
              className={`p-4 w-[15%] bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
            >
              Status
            </th>
            <th
              className={`p-4 w-[40%] bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
            >
              Nama
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
            >
              Diwakili
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
            >
              Diwakili Oleh
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-center border border-b lg:table-cell relative lg:static`}
              >
                1
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Pemohon (Terdakwa)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Norman Alamsyah, S.H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Tidak
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-center border border-b lg:table-cell relative lg:static`}
              >
                2
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Termohon (Oditur)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Sahat M Nasution, S. H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Tidak
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">DATA PEMOHON KASASI</h2>
        <table className="w-full mb-8 text-black">
          <thead>
            <th
              className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Tanggal Permohonan
            </th>
            <th
              className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Pemohon Banding
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Keterangan
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Jumat, 05 Jan. 2024
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Norman Alamsyah, S.H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">
          TANGGAL PEMBERITAHUAN PERMOHONAN KASASI
        </h2>
        <table className="w-full mb-8 text-black">
          <thead>
            <th
              className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Status
            </th>
            <th
              className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Nama
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Tanggal
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Termohon (Oditur)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Sahat M Nasution, S. H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">TANGGAL PENERIMAAN MEMORI KASASI</h2>
        <table className="w-full mb-8 text-black">
          <thead>
            <th
              className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Status
            </th>
            <th
              className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Nama
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Tanggal
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Pemohon (Terdakwa)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Norman Alamsyah, S.H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">TANGGAL PENYERAHAN MEMORI KASASI</h2>
        <table className="w-full mb-8 text-black">
          <thead>
            <th
              className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Status
            </th>
            <th
              className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Nama
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Tanggal
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Termohon (Oditur)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Sahat M Nasution, S. H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">
          TANGGAL PENERIMAAN KONTRA MEMORI KASASI
        </h2>
        <table className="w-full mb-8 text-black">
          <thead>
            <th
              className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Status
            </th>
            <th
              className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Nama
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Tanggal
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Termohon (Oditur)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Sahat M Nasution, S. H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">
          TANGGAL PENYERAHAN KONTRA MEMORI KASASI
        </h2>
        <table className="w-full mb-8 text-black">
          <thead>
            <th
              className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Status
            </th>
            <th
              className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Nama
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Tanggal
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Pemohon (Terdakwa)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Norman Alamsyah, S.H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">TANGGAL PEMBERITAHUAN INZAGE</h2>
        <table className="w-full mb-8 text-black">
          <thead>
            <th
              className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Status
            </th>
            <th
              className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Nama
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Tanggal
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Pemohon (Terdakwa)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Norman Alamsyah, S.H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Termohon (Oditur)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Sahat M Nasution, S. H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <h2 className="font-bold pl-2 text-black">TANGGAL PENGIRIMAN BERKAS KASASI</h2>
        <table className="border-collapse w-full mt-6">
          <tbody>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
              >
                Tanggal Pengiriman Berkas Kasasi{' '}
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
              >
                Nomor Surat Pengiriman Berkas Kasasi
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <h2 className="font-bold pl-2 text-black">PUTUSAN KASASI</h2>
        <table className="border-collapse w-full mt-6">
          <tbody>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400  text-black border border-gray-300`}
              >
                Tanggal Putusan Kasasi
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400  text-black border border-gray-300`}
              >
                Nomor Putusan Kasasi
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400  text-black border border-gray-300`}
              >
                Amar Putusan Kasasi
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400  text-black border border-gray-300`}
              >
                Majelis Hakim Kasasi
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400  text-black border border-gray-300`}
              >
                Panitera Pengganti Kasasi
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400  text-black border border-gray-300`}
              >
                Tanggal Penerimaan Kembali Berkas Kasasi
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
            <tr>
              <th
                className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400  text-black border border-gray-300`}
              >
                Tanggal Pengarsipan Kasasi
              </th>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold pl-2 text-black">TANGGAL PEMBERITAHUAN PUTUSAN KASASI</h2>
        <table className="w-full mb-8 text-black">
          <thead>
            <th
              className={`p-4 w-[5%] text-center  bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              No
            </th>
            <th
              className={`p-4 w-[15%] bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Status
            </th>
            <th
              className={`p-4 w-[40%] bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Nama
            </th>
            <th
              className={`p-4   bg-gray-2 dark:bg-slate-400 text-gray-600 border border-gray-300`}
            >
              Tanggal
            </th>
          </thead>
          <tbody>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-center border border-b lg:table-cell relative lg:static`}
              >
                1
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Pemohon (Terdakwa)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Norman Alamsyah, S.H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-center border border-b lg:table-cell relative lg:static`}
              >
                2
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Termohon (Oditur)
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                Sahat M Nasution, S. H.
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}
              >
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kasasi;
