import React from 'react';

const Banding = () => {
  return (
    <div className='p-4 bg-gray-3 dark:bg-slate-200'>
            <div className="flex flex-col gap-1">
                <h2 className='font-bold pl-2 text-black'>DATA PARA PIHAK</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[5%] bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>No</th>
                    <th className={`p-4 w-[15%] bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Status</th>
                    <th className={`p-4 w-[40%] bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nama</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal Pemberitahuan Putusan</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-3 dark:bg-slate-300 text-center border border-b lg:table-cell relative lg:static`}>1</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-3 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Pembanding (Terdakwa)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-3 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Hadi Syafruddin, S.E., S.T., M.T.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-3 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Tidak</td>
                    </tr>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-3 dark:bg-slate-300 text-center border border-b lg:table-cell relative lg:static`}>2</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-3 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Terbanding (Oditur)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-3 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Sahat M Nasution, S. H.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-3 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Tidak</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="flex flex-col gap-1 darsk:bg-slate-200">
                <h2 className='font-bold pl-2 text-black'>DATA PEMOHON BANDING</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal Pemohon</th>
                    <th className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Pemohon Banding</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Keterangan</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Senin, 22 Jan. 2024</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Hadi Syafruddin, S.E., S.T., M.T.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className='font-bold pl-2 text-black'>TANGGAL PEMBERITAHUAN PERMOHONAN BANDING</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Status</th>
                    <th className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nama</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Terbanding (Oditur)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Sahat M Nasution, S. H.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className='font-bold pl-2 text-black'>TANGGAL PENERIMAAN MEMORI BANDING</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Status</th>
                    <th className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nama</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Pembanding (Terdakwa)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Hadi Syafruddin, S.E., S.T., M.T.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className='font-bold pl-2 text-black'>TANGGAL PENYERAHAN MEMORI BANDING</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Status</th>
                    <th className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nama</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Terbanding (Oditur)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Sahat M Nasution, S. H.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className='font-bold pl-2 text-black'>TANGGAL PENERIMAAN KONTRA MEMORI BANDING</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Status</th>
                    <th className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nama</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Terbanding (Oditur)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Sahat M Nasution, S. H.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Pidana Denda Rp.150.000,00</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className='font-bold pl-2 text-black'>TANGGAL PENYERAHAN KONTRA MEMORI BANDING</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Status</th>
                    <th className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nama</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Pembanding (Terdakwa)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Hadi Syafruddin, S.E., S.T., M.T.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className='font-bold pl-2 text-black'>TANGGAL PEMBERITAHUAN INZAGE</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[15%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Status</th>
                    <th className={`p-4 w-[40%]   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nama</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Pembanding (Terdakwa)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Hadi Syafruddin, S.E., S.T., M.T.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                    </tr>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Terbanding (Oditur)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Sahat M Nasution, S. H.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                    </tr>
                </tbody>
            </table>
            </div>
            {/* TANGGAL PENGIRIMAN BERKAS BANDING */}
            <div className="flex flex-col gap-1 mb-4">
                <h2 className='font-bold pl-2 text-black'>TANGGAL PENGIRIMAN BERKAS BANDING</h2>
                <table className="border-collapse w-full mt-6">
                    <tbody>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal Pengiriman Berkas Banding </th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nomor Surat Pengiriman Berkas Banding</th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* PUTUSAN BANDING */}
            <div className="flex flex-col gap-1 mb-4">
                <h2 className='font-bold pl-2 text-black'>PUTUSAN BANDING</h2>
                <table className="border-collapse w-full mt-6">
                    <tbody>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal Putusan Banding</th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nomor Putusan Banding</th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Amar Putusan Banding</th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Majelis Hakim Banding</th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Panitera Pengganti Banding</th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal Penerimaan Kembali Berkas Banding</th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                        <tr>
                            <th className={`p-4 w-[20%] text-left   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal Pengarsipan Banding</th>
                            <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className='font-bold pl-2 text-black'>TANGGAL PEMBERITAHUAN PUTUSAN BANDING</h2>
                <table className='w-full mb-8'>
                <thead>
                    <th className={`p-4 w-[5%] text-center  bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>No</th>
                    <th className={`p-4 w-[15%] bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Status</th>
                    <th className={`p-4 w-[40%] bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Nama</th>
                    <th className={`p-4   bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}>Tanggal</th>
                </thead>
                <tbody>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-center border border-b lg:table-cell relative lg:static`}>1</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Pembanding (Terdakwa)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Hadi Syafruddin, S.E., S.T., M.T.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>~</td>
                    </tr>
                    <tr>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-center border border-b lg:table-cell relative lg:static`}>2</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Terbanding (Oditur)</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>Sahat M Nasution, S. H.</td>
                        <td className={`w-full lg:w-auto p-3 text-black bg-gray-2 dark:bg-slate-300 text-left border border-b lg:table-cell relative lg:static`}>~</td>
                    </tr>
                </tbody>
            </table>
            </div>
    </div>
  );
};

export default Banding;
