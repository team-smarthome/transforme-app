import React, { useEffect, useState } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import IndoorMap from '../../components/IndoorMap';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const MapPageCopy = () => {
  const [activeMarker, setActiveMarker] = useState<any>({});
  const [selectedPlace, setSelectedPlace] = useState<any>({});
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [markers, setMarkers] = useState<Array<any>>([{ lat: 0, lng: 0 }]);
  const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [roomName, setRoomName] = useState<string>('Ruangan 101');

  const [listWargaBinaan, setListWargaBinaan] = useState<any>(rooms[0].wbList);

  const handleSelectRoom = (room: any) => {
    setRoomName(room.name);
    setListWargaBinaan(room.wbList);
    setTabIndex(1);
  };

  return (
    <>
      <div className="mb-10">
        <h3 className="text-2xl font-semibold">Peta Lemasmil</h3>
      </div>
      {tabIndex === 0 ? (
        <div className="p-10" style={{ backgroundColor: '#d82525be' }}>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 20,
              backgroundColor: '#42d316ab',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#575757',
            }}
          >
            <div
              style={{
                // width: "40%",
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                // gridAutoRows: "auto",
                rowGap: 50,
              }}
            >
              {rooms.map((room, index) => (
                <div
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#575757',
                    backgroundColor: '#42d316ab',
                    height: 200,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSelectRoom(room)}
                >
                  <span className="text-white text-lg">{room.name}</span>
                </div>
              ))}
            </div>
            <div>
              <div
                className="relative"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#575757',
                  backgroundColor: '#fff714a6',
                  height: 300,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                // onClick={() => handleSelectRoom(room)}
              >
                <span className="text-white text-2xl">Lapangan</span>
                <div
                  className="w-16 h-24 border border-graydark absolute right-0 top-0 flex justify-center items-center"
                  style={{ backgroundColor: '#d82525be' }}
                >
                  <span className="text-white text-center">Pintu Masuk</span>
                </div>
              </div>
              <div className="flex w-full">
                <div
                  className="flex-1"
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#575757',
                    backgroundColor: '#fff714a6',
                    height: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  // onClick={() => handleSelectRoom(room)}
                >
                  <span className="text-white text-lg">Gereja</span>
                </div>
                <div
                  className="flex-1"
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#575757',
                    backgroundColor: '#fff714a6',
                    height: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  // onClick={() => handleSelectRoom(room)}
                >
                  <span className="text-white text-lg">Masjid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : tabIndex === 1 ? (
        <div>
          <div
            style={{
              display: 'flex',
              // justifyContent: "space-between",
              alignItems: 'center',
              marginBottom: 20,
              gap: 10,
            }}
          >
            <button onClick={() => setTabIndex(0)}>
              <ArrowLeftIcon />
            </button>
            <span>{roomName}</span>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <IndoorMap
              listWB={listWargaBinaan}
              dimension={{ width: 55, height: 40 }}
              gateway1={{ position: 'A', name: 'Gateway 1' }}
              gateway2={{ position: 'D', name: 'Gateway 2' }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

const rooms = [
  {
    name: 'Ruangan 101',
    wbList: [
      {
        name: 'Supardi',
        rssi: ['-70', '-48'],
        batt: '3500',
        dmac: 'dd340206fb3d',
        temp: '36.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Korupsi Militer',
          pasal: 'Pasal 123',
          sidangTanggal: '2023-08-24',
          vonisTanggal: '2023-08-30',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-05-15',
          tanggalBebas: '2033-08-30',
        },
        time: '2023-02-24 14:17:30',
        position: { x: 521, y: 322 },
      },
      {
        name: 'Rohiyan',
        rssi: ['-38', '-60'],
        batt: '4000',
        dmac: 'dd340206fb01',
        temp: '39.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pencurian Militer',
          pasal: 'Pasal 87',
          sidangTanggal: '2022-07-12',
          vonisTanggal: '2022-07-18',
          hukuman: '5 tahun penjara',
          sisaMasaTahanan: '2 tahun',
          awalMasuk: '2020-03-20',
          tanggalBebas: '2025-07-18',
        },
        time: '2023-02-24 14:20:30',
        position: { x: 210, y: 380 },
      },
      {
        name: 'Samosa',
        rssi: ['-65', '-40'],
        batt: '800',
        dmac: 'dd340206fb02',
        temp: '36.8',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Penipuan Militer',
          pasal: 'Pasal 155',
          sidangTanggal: '2023-01-05',
          vonisTanggal: '2023-01-10',
          hukuman: '8 tahun penjara',
          sisaMasaTahanan: '6 tahun',
          awalMasuk: '2021-09-02',
          tanggalBebas: '2030-01-10',
        },
        time: '2023-02-24 14:27:30',
        position: { x: 100, y: 200 },
      },
    ],
    xAxis: 40,
    yAxis: 30,
  },
  {
    name: 'Ruangan 102',
    wbList: [
      {
        name: 'Rahmat',
        rssi: ['-70', '-48'],
        batt: '3500',
        dmac: 'dd340206fb3d',
        temp: '36.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembakaran Militer',
          pasal: 'Pasal 212',
          sidangTanggal: '2023-04-20',
          vonisTanggal: '2023-04-25',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '9 tahun',
          awalMasuk: '2022-02-15',
          tanggalBebas: '2032-04-25',
        },
        time: '2023-02-24 14:17:30',
        position: { x: 600, y: 400 },
      },
      {
        name: 'Supri',
        rssi: ['-38', '-60'],
        batt: '4000',
        dmac: 'dd340206fb01',
        temp: '39.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pemerasan Militer',
          pasal: 'Pasal 188',
          sidangTanggal: '2021-11-10',
          vonisTanggal: '2021-11-15',
          hukuman: '7 tahun penjara',
          sisaMasaTahanan: '4 tahun',
          awalMasuk: '2020-09-25',
          tanggalBebas: '2027-11-15',
        },
        time: '2023-02-24 14:20:30',
        position: { x: 290, y: 133 },
      },
      {
        name: 'Udin',
        rssi: ['-65', '-40'],
        batt: '1203',
        dmac: 'dd340206fb02',
        temp: '36.8',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:27:30',
        position: { x: 422, y: 422 },
      },
    ],
    xAxis: 40,
    yAxis: 30,
  },
  {
    name: 'Ruangan 103',
    wbList: [
      {
        name: 'Bader',
        rssi: ['-70', '-48'],
        batt: '3500',
        dmac: 'dd340206fb3d',
        temp: '36.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:17:30',
        position: { x: 102, y: 356 },
      },
      {
        name: 'Ngadimin',
        rssi: ['-38', '-60'],
        batt: '4000',
        dmac: 'dd340206fb01',
        temp: '39.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:20:30',
        position: { x: 422, y: 89 },
      },
      {
        name: 'Badrun',
        rssi: ['-65', '-40'],
        batt: '800',
        dmac: 'dd340206fb02',
        temp: '36.8',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:27:30',
        position: { x: 35, y: 389 },
      },
    ],
    xAxis: 40,
    yAxis: 30,
  },
  {
    name: 'Ruangan 104',
    wbList: [
      {
        name: 'Robin',
        rssi: ['-70', '-48'],
        batt: '2522',
        dmac: 'dd340206fb3d',
        temp: '36.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:17:30',
        position: { x: 355, y: 179 },
      },
      {
        name: 'Ujang',
        rssi: ['-38', '-60'],
        batt: '4090',
        dmac: 'dd340206fb01',
        temp: '39.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:20:30',
        position: { x: 22, y: 44 },
      },
      {
        name: 'Maman',
        rssi: ['-65', '-40'],
        batt: '6200',
        dmac: 'dd340206fb02',
        temp: '36.8',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:27:30',
        position: { x: 32, y: 49 },
      },
    ],
    xAxis: 40,
    yAxis: 30,
  },
  {
    name: 'Ruangan 105',
    wbList: [
      {
        name: 'Bambang',
        rssi: ['-70', '-48'],
        batt: '3520',
        dmac: 'dd340206fb3d',
        temp: '36.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:17:30',
        position: { x: 49, y: 32 },
      },
      {
        name: 'Arhan',
        rssi: ['-38', '-60'],
        batt: '4001',
        dmac: 'dd340206fb01',
        temp: '39.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:20:30',
        position: { x: 58, y: 25 },
      },
      {
        name: 'Pratomo',
        rssi: ['-65', '-40'],
        batt: '1800',
        dmac: 'dd340206fb02',
        temp: '36.8',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:27:30',
        position: { x: 66, y: 44 },
      },
    ],
    xAxis: 40,
    yAxis: 30,
  },
  {
    name: 'Ruangan 106',
    wbList: [
      {
        name: 'Sodikin',
        rssi: ['-70', '-48'],
        batt: '2390',
        dmac: 'dd340206fb3d',
        temp: '36.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:17:30',
        position: { x: 353, y: 363 },
      },
      {
        name: 'Kaesar',
        rssi: ['-38', '-60'],
        batt: '4000',
        dmac: 'dd340206fb01',
        temp: '39.5',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:20:30',
        position: { x: 320, y: 341 },
      },
      {
        name: 'Tarmiji',
        rssi: ['-65', '-40'],
        batt: '300',
        dmac: 'dd340206fb02',
        temp: '36.8',
        step: 6910,
        heartRate: '80',
        spo: '96',
        systolic: '110',
        diastolic: '80',
        crimeRecord: {
          perkara: 'Pembobolan Militer',
          pasal: 'Pasal 178',
          sidangTanggal: '2022-11-05',
          vonisTanggal: '2022-11-10',
          hukuman: '10 tahun penjara',
          sisaMasaTahanan: '8 tahun',
          awalMasuk: '2021-03-15',
          tanggalBebas: '2031-11-10',
        },
        time: '2023-02-24 14:27:30',
        position: { x: 289, y: 286 },
      },
    ],
    xAxis: 40,
    yAxis: 30,
  },
];

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAvM9Ow4c24huLBdFS3dFw9byoNa-UkmfI',
})(MapPageCopy);
