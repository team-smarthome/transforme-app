import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dataGedung } from "../../../utils/constants";
import MapToggleButtons from "../../../components/BuildingMap/components/MapToggleButtons";
import { useAtom } from "jotai";
import { HiExclamationCircle } from "react-icons/hi2";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  NASVisibleAtom,
  NVRVisibleAtom,
  accessDoorVisibleAtom,
  allVisibleAtom,
  cameraVisibleAtom,
  faceRecognitionVisibleAtom,
  gatewayVisibleAtom,
  interactiveDesktopVisibleAtom,
  interactiveTVisibleAtom,
  routerVisibleAtom,
  selfRegKioskVisibleAtom,
  wbpVisibleAtom,
  NotificationAtom,
  petugasVisibleAtom,
  pengunjungVisibleAtom,
  CurrentLayerAtom,
  isToggleWithDescriptionAtom,
} from "../../../utils/atomstates";
import { Gateway } from "../../../components/BuildingMap/components";
import Camera from "../../../components/BuildingMap/components/Camera";
import AccessDoor from "../../../components/BuildingMap/components/AccessDoor";
import FaceRecognition from "../../../components/BuildingMap/components/FaceRecognition";
import InteractiveDesktop from "../../../components/BuildingMap/components/InteractiveDesktop";
import InteractiveTV from "../../../components/BuildingMap/components/InteractiveTV";
import SelfRegKiosk from "../../../components/BuildingMap/components/SelfRegKiosk";
import NVR from "../../../components/BuildingMap/components/NVR";
import NAS from "../../../components/BuildingMap/components/NAS";
import DropdownNotification from "../../../components/DropdownNotification";
import WBP from "../../../components/BuildingMap/components/WBP";
import Petugas from "../../../components/BuildingMap/components/Petugas";
import Pengunjung from "../../../components/BuildingMap/components/Pengunjung";
import {
  apiIndoorMap,
  apiIndoorMapV2,
  apiIndoorMapVVIP,
  apiPeopleDummy,
} from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { ids } from "webpack";

const GedungDummy = [
  {
    id: 11,
    nama: "gedung tahanan kelas A",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[12/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          {
            id: 1,
            nama: "ruang tahanan A1",
            positionX: "left-[66.6%]",
            positionY: "bottom-[0%]",
            height: "h-[60%]",
            width: "w-[33.333%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A1",
            aspectRatio: "aspect-[7/5]",
            gateway: [
              {
                id: 2,
                positionX: "left-[100%]",
                positionY: "bottom-[0%]",
                item: {
                  name: "Gateaway satu",
                },
              },
            ],
          },
          {
            id: 2,
            nama: "ruang tahanan A2",
            positionX: "left-[33.333%]",
            positionY: "bottom-[0%]",
            height: "h-[60%]",
            width: "w-[33.333%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A2",
            aspectRatio: "aspect-[7/5]",
            nas: [
              {
                id: 1,
                positionX: "left-[50%]",
                positionY: "bottom-[75%]",
                item: {
                  nama: "nas 1",
                },
              },
            ],
            accessDoor: [
              {
                id: 1,
                positionX: "bottom-[0%]",
                positionY: "left-[50%]",
                item: {
                  name: "Access Door 1",
                },
              },
            ],
          },
          {
            id: 3,
            nama: "ruang tahanan A3",
            positionX: "left-[0%]",
            positionY: "bottom-[0%]",
            height: "h-[60%]",
            width: "w-[33.333%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A3",
            aspectRatio: "aspect-[7/5]",
            cameras: [
              {
                id: 1,
                positionX: "bottom-[0%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 4,
            nama: "ruang tahanan A4",
            positionX: "left-[0%]",
            positionY: "bottom-[60%]",
            height: "h-[40%]",
            width: "w-[100%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //11
  {
    id: 111,
    nama: "Gedung Parkir Selatan",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[14/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "Ruang Kantor",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "G. Pemeriksaan",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //12
  {
    id: 12,
    nama: "Gedung Parkir Utara",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "G. Pemeriksaan",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "Ruang Kantor",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[1%]",
            positionY: "bottom-[90%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[97%]",
            positionY: "bottom-[17%]",
            item: {
              name: "Gateaway satu",
            },
          },
          {
            id: 3,
            positionX: "left-[1%]",
            positionY: "bottom-[17%]",
            item: {
              name: "Gateaway satu",
            },
          },
          {
            id: 4,
            positionX: "left-[97%]",
            positionY: "bottom-[90%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //1
  {
    id: 1,
    nama: "Gedung Parkir Selatan",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "Ruang Kantor",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "G. Pemeriksaan",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //2
  {
    id: 2,
    nama: "Gedung Parkir Utara",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "G. Pemeriksaan",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "Ruang Kantor",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //3
  {
    id: 3,
    nama: "Gedung Parkir Selatan",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "Ruang Kantor",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "G. Pemeriksaan",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //4
  {
    id: 4,
    nama: "Gedung Parkir Utara",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "G. Pemeriksaan",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "Ruang Kantor",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //5
  {
    id: 5,
    nama: "Gedung Parkir Selatan",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "Ruang Kantor",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "G. Pemeriksaan",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //6
  {
    id: 6,
    nama: "Gedung Parkir Utara",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "G. Pemeriksaan",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "Ruang Kantor",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //7
  {
    id: 7,
    nama: "Gedung Parkir Selatan",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "Ruang Kantor",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "G. Pemeriksaan",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //8
  {
    id: 8,
    nama: "Gedung Parkir Utara",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "G. Pemeriksaan",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "Ruang Kantor",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //9
  {
    id: 9,
    nama: "Gedung Parkir Selatan",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "Ruang Kantor",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "G. Pemeriksaan",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
  //10
  {
    id: 10,
    nama: "Gedung Parkir Utara",
    positionX: "left-[7.4%]",
    positionY: "bottom-[85.5%]",
    height: "h-[10%]",
    width: "w-[25.5%]",
    zone_positionX: "left-[6%]",
    zone_positionY: "bottom-[84.5%]",
    zone_height: "h-[12%]",
    zone_width: "w-[28%]",
    zone_color: "bg-red-500",
    color: "bg-green-600",
    pathname: "gedung-tahanan-kelas-A",
    aspectRatio: "aspect-[16/6]",
    lantai: [
      {
        id: 1,
        nama: "Lantai 1",
        ruangan: [
          //start here
          {
            id: 4,
            nama: "Pintu Masuk",
            positionX: "left-[0]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here
          //start here
          {
            id: 5,
            nama: "Pintu Keluar",
            positionX: "left-[82%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          //end here

          {
            id: 6,
            nama: "Parkir A",
            positionX: "left-[24%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 7,
            nama: "Parkir B",
            positionX: "left-[34.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 8,
            nama: "Parkir C",
            positionX: "left-[45%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 9,
            nama: "Parkir D",
            positionX: "left-[55.5%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 10,
            nama: "Parkir E",
            positionX: "left-[66%]",
            positionY: "bottom-[75%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },

          {
            id: 11,
            nama: "G. Pemeriksaan",
            positionX: "left-[0]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 12,
            nama: "Ruang Kantor",
            positionX: "left-[82%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[18%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[12/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 13,
            nama: "Parkir F",
            positionX: "left-[24%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 14,
            nama: "Parkir G",
            positionX: "left-[34.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 15,
            nama: "Parkir H",
            positionX: "left-[45%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 16,
            nama: "Parkir I",
            positionX: "left-[55.5%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 17,
            nama: "Parkir J",
            positionX: "left-[66%]",
            positionY: "bottom-[0%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 18,
            nama: "Parkir K",
            positionX: "left-[29%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 19,
            nama: "Parkir L",
            positionX: "left-[39.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 20,
            nama: "Parkir M",
            positionX: "left-[50%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
          {
            id: 21,
            nama: "Parkir N",
            positionX: "left-[60.5%]",
            positionY: "bottom-[38%]",
            height: "h-[25%]",
            width: "w-[10%]",
            color: "bg-yellow-600",
            color2: "bg-yellow-500",
            pathname: "ruang-tahanan-A4",
            aspectRatio: "aspect-[2/5]",
            gateway: [
              {
                id: 1,
                positionX: "left-[0%]",
                positionY: "bottom-[100%]",
                item: {
                  name: "Gateaway Gedung Tengah satu",
                },
              },
            ],
            cameras: [
              {
                id: 1,
                positionX: "bottom-[98%]",
                positionY: "left-[98%]",
                item: {
                  name: "Camera 1",
                },
              },
            ],
          },
        ],
        nas: [
          {
            id: 1,
            positionX: "left-[50%]",
            positionY: "bottom-[50%]",
            item: {
              nama: "nas 1",
            },
          },
        ],
        gateway: [
          {
            id: 1,
            positionX: "left-[0%]",
            positionY: "bottom-[100%]",
            item: {
              name: "Gateaway Gedung Tengah satu",
            },
          },
          {
            id: 2,
            positionX: "left-[100%]",
            positionY: "bottom-[0%]",
            item: {
              name: "Gateaway satu",
            },
          },
        ],
        cameras: [
          {
            id: 1,
            positionX: "bottom-[98%]",
            positionY: "left-[98%]",
            item: {
              name: "Camera 1",
            },
          },
          {
            id: 2,
            positionX: "bottom-[0%]",
            positionY: "left-[30%]",
            item: {
              name: "Camera 1",
            },
          },
        ],
        accessDoor: [
          {
            id: 1,
            positionX: "bottom-[0%]",
            positionY: "left-[50%]",
            item: {
              name: "Access Door 1",
            },
          },
        ],
      },
    ],
  },
];

const MapGedungDummy = {
  records: {
    layer2: GedungDummy,
  },
};

const Gedung = () => {
  const [dataIndormap, setDataIndormap] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await apiIndoorMapVVIP();
        setDataIndormap(data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);

  //hit api
  const { data: dynamicDataVVIP } = useQuery({
    queryKey: ["mapdatavvip"],
    queryFn: apiIndoorMapVVIP,
    staleTime: Infinity,
  });

  console.log("DataGedungAPI", dataIndormap);

  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  console.log(dataIndormap, "THINKPADLAHMANAMAEN");
  console.log(data, "datanyaManaMase");

  console.log(data.id, "DataYangTerpilih");

  const filteredDataLayerTwo = dataIndormap?.data?.records?.layer2.gedung.find(
    (list: any) => list.id == data.id
  );

  console.log("dataUtamaThinkpad", filteredDataLayerTwo);
  // const filteredDataLayerTwo = data;

  // console.log(filteredDataLayerTwo, "dataFromState");

  // const { data: dynamicData } = useQuery({
  //   queryKey: ["mapdata"],
  //   queryFn: apiIndoorMap,
  //   staleTime: Infinity,
  // });

  // const { data: dynamicData } = useQuery({
  //   queryKey: ["mapdata"],
  //   queryFn: apiIndoorMapV2,
  //   staleTime: Infinity,
  // });

  // const { data: dynamicDataVVIP } = useQuery({
  //   queryKey: ["mapdata"],
  //   queryFn: apiIndoorMapVVIP,
  //   staleTime: Infinity,
  // });

  // const filteredDataLayerTwo = MapGedungDummy?.records?.layer2.find(
  //   (list) => list.id == 111
  // );

  // const filteredDataLayerTwo =
  //   dynamicDataVVIP?.data?.records?.layer2.gedung.find(
  //     (list: any) => list.id == data.id
  //   );

  // console.log("filternyaTHinkPad", filteredDataLayerTwo);
  // console.log(
  //   "filternyaTHinkPad2",
  //   dynamicDataVVIP?.data?.records?.layer2?.gedung[15]
  // );

  // console.log("ruanganNyaThinkpad", filteredDataLayerTwo);

  // const filteredDataLayerTwo = dynamicData?.data?.records?.layer2.gedung.find(
  //   (list: any) => list.id == data.id
  // );

  // console.log("DataID", data.id)
  // console.log("DataIDList", dynamicData?.data?.records?.layer2.gedung[15])

  // const testiedData = dynamicData?.data?.records?.layer2.gedung;

  // console.log(testiedData, "bagaimana_ini");
  // console.log(filteredDataLayerTwo, "testfilterdatamase");
  // console.log(dynamicData, "dynamicData")
  // console.log(dynamicData?.data?.records?.layer1.camera, "data indoor map")
  // const [rooms, setRooms] = useState([]);
  console.log(filteredDataLayerTwo?.lantai[0], "dataLantainya");
  const [rooms, setRooms] = useState(
    filteredDataLayerTwo?.lantai[0]?.ruangan || []
  );

  //bikin useEffect jika data filter sudah ada
  useEffect(() => {
    setRooms(filteredDataLayerTwo?.lantai[0]?.ruangan || []);
  }, [filteredDataLayerTwo]);

  const [wbpDummy, setWbpDummy] = useState(
    filteredDataLayerTwo?.lantai[0]?.wbpDummy
  );
  const [pengunjungDummy, setPengunjungDummy] = useState(
    filteredDataLayerTwo?.lantai[0]?.pengunjungDummy
  );
  const [petugasDummy, setPetugasDummy] = useState(
    filteredDataLayerTwo?.lantai[0]?.petugasDummy
  );
  // const [WBP, setWBP] = useState(filteredDataLayerTwo?.lantai[0]?.WBP);
  const [gateways, setGateways] = useState(
    filteredDataLayerTwo?.lantai[0]?.gateway
  );
  const [cameras, setCameras] = useState(
    filteredDataLayerTwo?.lantai[0]?.cameras
  );
  const [accessDoor, setAccessDoor] = useState(
    filteredDataLayerTwo?.lantai[0]?.accessDoor
  );
  const [faceRecognition, setFaceRecognition] = useState(
    filteredDataLayerTwo?.lantai[0]?.faceRecognition
  );
  const [interactiveDesktop, setInteractiveDesktop] = useState(
    filteredDataLayerTwo?.lantai[0]?.interactiveDesktop
  );
  const [interactiveTV, setInteractiveTV] = useState(
    filteredDataLayerTwo?.lantai[0]?.interactiveTV
  );
  const [selfRegKiosk, setSelfRegKiosk] = useState(
    filteredDataLayerTwo?.lantai[0]?.selfRegKiosk
  );
  const [nvr, setNvr] = useState(filteredDataLayerTwo?.lantai[0]?.nvr);
  const [nas, setNas] = useState(filteredDataLayerTwo?.lantai[0]?.nas);
  const [notification, setNotification] = useState(
    filteredDataLayerTwo?.lantai[0]?.notification
  );
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allVisible, setAllVisible] = useAtom(allVisibleAtom);

  const [gatewayVisible, setGatewayVisible] = useAtom(gatewayVisibleAtom);
  const [WBPVisible, setWBPVisible] = useAtom(wbpVisibleAtom);
  const [petugasVisible, setPetugasVisible] = useAtom(petugasVisibleAtom);
  const [pengunjungVisible, setPengunjungVisible] = useAtom(
    pengunjungVisibleAtom
  );
  const [routerVisible, setRouterVisible] = useAtom(routerVisibleAtom);
  const [cameraVisible, setCameraVisible] = useAtom(cameraVisibleAtom);
  const [accessDoorVisible, setAccessDoorVisible] = useAtom(
    accessDoorVisibleAtom
  );
  const [faceRecognitionVisible, setFaceRecognitionVisible] = useAtom(
    faceRecognitionVisibleAtom
  );
  const [interactiveDesktopVisible, setInteractiveDesktopVisible] = useAtom(
    interactiveDesktopVisibleAtom
  );
  const [interactiveTVisible, setInteractiveTVisible] = useAtom(
    interactiveTVisibleAtom
  );
  const [selfRegKioskVisible, setSelfRegKioskVisible] = useAtom(
    selfRegKioskVisibleAtom
  );
  const [NVRVisible, setNVRVisible] = useAtom(NVRVisibleAtom);
  const [NASVisible, setNASVisible] = useAtom(NASVisibleAtom);
  const [NotificationVisible, setNotificationVisible] =
    useAtom(NotificationAtom);
  //   const [detailDataGedung, setDetailDataGedung] = useState({});
  const [isToggleWithDescription, setIsToggleWithDescription] = useAtom(
    isToggleWithDescriptionAtom
  );

  const toggleAllVisibility = () => {
    const areAllVisible =
      gatewayVisible &&
      routerVisible &&
      cameraVisible &&
      accessDoorVisible &&
      faceRecognitionVisible &&
      interactiveDesktopVisible &&
      interactiveTVisible &&
      selfRegKioskVisible &&
      NVRVisible &&
      NASVisible &&
      NotificationVisible &&
      WBPVisible &&
      petugasVisible &&
      pengunjungVisible;

    setAllVisible(!areAllVisible);
    setWBPVisible(!areAllVisible);
    setPetugasVisible(!areAllVisible);
    setPengunjungVisible(!areAllVisible);
    setGatewayVisible(!areAllVisible);
    setRouterVisible(!areAllVisible);
    setCameraVisible(!areAllVisible);
    setAccessDoorVisible(!areAllVisible);
    setFaceRecognitionVisible(!areAllVisible);
    setInteractiveDesktopVisible(!areAllVisible);
    setInteractiveTVisible(!areAllVisible);
    setSelfRegKioskVisible(!areAllVisible);
    setNVRVisible(!areAllVisible);
    setNASVisible(!areAllVisible);
    setNotificationVisible(!areAllVisible);
  };

  const toggleVisibility = (setVisible: any) => {
    setVisible((prev: any) => !prev);
    setAllVisible((prevState) => {
      const allVisible =
        gatewayVisible &&
        routerVisible &&
        cameraVisible &&
        accessDoorVisible &&
        faceRecognitionVisible &&
        interactiveDesktopVisible &&
        interactiveTVisible &&
        selfRegKioskVisible &&
        NVRVisible &&
        NASVisible &&
        NotificationVisible &&
        WBPVisible &&
        petugasVisible &&
        pengunjungVisible;
      return allVisible;
    });
  };

  const toggleWBPVisibility = () => {
    toggleVisibility(setWBPVisible);
  };

  const togglePetugasVisibility = () => {
    toggleVisibility(setPetugasVisible);
  };

  const togglePengunjungVisibility = () => {
    toggleVisibility(setPengunjungVisible);
  };
  const toggleGatewayVisibility = () => {
    toggleVisibility(setGatewayVisible);
  };

  const toggleRouterVisibility = () => {
    toggleVisibility(setRouterVisible);
  };

  const toggleCameraVisibility = () => {
    toggleVisibility(setCameraVisible);
  };

  const toggleAccessDoorVisibility = () => {
    toggleVisibility(setAccessDoorVisible);
  };

  const toggleFaceRecognitionVisibility = () => {
    toggleVisibility(setFaceRecognitionVisible);
  };

  const toggleInteractiveDesktopVisibility = () => {
    toggleVisibility(setInteractiveDesktopVisible);
  };

  const toggleInteractiveTVisibility = () => {
    toggleVisibility(setInteractiveTVisible);
  };

  const toggleSelfRegKioskVisibility = () => {
    toggleVisibility(setSelfRegKioskVisible);
  };

  const toggleNVRVisibility = () => {
    toggleVisibility(setNVRVisible);
  };

  const toggleNASVisibility = () => {
    toggleVisibility(setNASVisible);
  };

  const toggleNotificationVisibility = () => {
    toggleVisibility(setNotificationVisible);
  };

  const toggleWithDescription = () => {
    setIsToggleWithDescription((prev) => !prev);
  };

  console.log(data, "data");
  const handleSelectFloor = (i: any) => {
    setIsLoading(true);
    const filterRoom = filteredDataLayerTwo?.lantai[i];
    console.log(filterRoom, "filteredRoom");
    setCurrentFloor(i);
    setRooms(filterRoom?.ruangan);
    setGateways(filterRoom?.gateway);
    setCameras(filterRoom?.cameras);
    setAccessDoor(filterRoom?.accessDoor);
    setFaceRecognition(filterRoom?.faceRecognition);
    setInteractiveDesktop(filterRoom?.interactiveDesktop);
    setInteractiveTV(filterRoom?.interactiveTV);
    setSelfRegKiosk(filterRoom?.selfRegKiosk);
    setNvr(filterRoom?.nvr);
    setNas(filterRoom?.nas);
    setNotification(filterRoom?.notification);
    setWbpDummy(filterRoom?.wbpDummy);
    setPengunjungDummy(filterRoom?.pengunjungDummy);
    setPetugasDummy(filterRoom?.petugasDummy);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const handleSelectRoom = (i) => {
    const getRoomIndex = rooms[i];
    console.log(i, "siniMase"),
      // console.log(getRoomIndex, "sini");
      navigate(
        `/dashboard/peta/${filteredDataLayerTwo?.pathname}/${getRoomIndex.pathname}`,
        {
          state: {
            data: getRoomIndex,
            lantaiSekarang: currentFloor,
            dataRuangan: rooms,
            gedungId: data.id,
            gedungName: data.nama,
            currentLantaiId: filteredDataLayerTwo?.lantai[currentFloor]?.id,
          },
        }
      );
    // navigate(`/peta/${filteredData?.pathname}`,{ state: { data: filteredData } })
  };

  // const [yourLayer, setYourLayer] = useAtom(CurrentLayerAtom)
  // console.log(filteredDataLayerTwo, "filteredDataLayerTwo")
  // console.log(filteredDataLayerTwo?.id, "gedungId")
  // console.log(filteredDataLayerTwo?.lantai[currentFloor]?.id, "lantaiId")
  const [peopleData, setPeopleData] = useState([]);
  let peopleParams = {
    currentLayer: 2,
    gedungId: filteredDataLayerTwo?.id,
    lantaiId: filteredDataLayerTwo?.lantai[currentFloor]?.id,
  };
  async function getPeopleData() {
    try {
      const res = await apiPeopleDummy(peopleParams);
      setPeopleData(res.data.records);
      console.log(res, "res people");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPeopleData();
    setInterval(() => {
      getPeopleData();
    }, 5000);
  }, [currentFloor]);

  // useEffect(() => {
  //   setYourLayer(2)
  // }, [])
  // console.log(yourLayer, "yourLayer")
  const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
  console.log(filteredDataLayerTwo, " filteredDataLayerTwo");
  const fadeInStyle = {
    animationName: "fadeIn",
    animationDuration: "1000ms", // Define the animation duration here
  };
  console.log(wbpDummy, "ada gk sih");
  function getOrientation(aspectRatio: any) {
    if (!aspectRatio) return "square"; // default case

    const match = aspectRatio.match(/aspect-\[(\d+)\/(\d+)\]/);
    if (!match) return "invalid"; // handle invalid aspect ratio format

    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);

    if (width > height) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  function updateNilai(nilai) {
    if (typeof nilai !== "string") {
      // Handle the case where nilai is not a string
      console.warn("Expected a string but got:", nilai);
      return null;
    }

    const match = nilai.match(/\[(\d+\/\d+)\]/);
    const result = match ? match[1] : null;
    console.log(result, "nilainyaadalah");
    return result;
  }

  return (
    <div style={{ ...fadeInStyle }} className="">
      <MapToggleButtons
        allVisible={allVisible}
        toggleAllVisibility={toggleAllVisibility}
        toggleWBPVisibility={toggleWBPVisibility}
        WBPVisible={WBPVisible}
        togglePetugasVisibility={togglePetugasVisibility}
        petugasVisible={petugasVisible}
        togglePengunjungVisibility={togglePengunjungVisibility}
        pengunjungVisible={pengunjungVisible}
        toggleGatewayVisibility={toggleGatewayVisibility}
        gatewayVisible={gatewayVisible}
        toggleRouterVisibility={toggleRouterVisibility}
        routerVisible={routerVisible}
        toggleCameraVisibility={toggleCameraVisibility}
        cameraVisible={cameraVisible}
        toggleAccessDoorVisibility={toggleAccessDoorVisibility}
        accessDoorVisible={accessDoorVisible}
        toggleFaceRecognitionVisibility={toggleFaceRecognitionVisibility}
        faceRecognitionVisible={faceRecognitionVisible}
        toggleInteractiveDesktopVisibility={toggleInteractiveDesktopVisibility}
        interactiveDesktopVisible={interactiveDesktopVisible}
        toggleInteractiveTVisibility={toggleInteractiveTVisibility}
        interactiveTVisible={interactiveTVisible}
        toggleSelfRegKioskVisibility={toggleSelfRegKioskVisibility}
        selfRegKioskVisible={selfRegKioskVisible}
        toggleNVRVisibility={toggleNVRVisibility}
        NVRVisible={NVRVisible}
        toggleNASVisibility={toggleNASVisibility}
        NASVisible={NASVisible}
        toggleWithDescription={toggleWithDescription}
        isToggleWithDescription={isToggleWithDescription}
      />
      <div
        className={`w-full h-[83vh]  flex items-center justify-between content-center	 bg-slate-50 `}
      >
        {/* select ruangan */}

        <div
          style={{
            maxWidth: "85%",
            maxHeight: "85%",
            aspectRatio: updateNilai(filteredDataLayerTwo?.aspectRatio),
            transform: "translate(3%, 0%)",
          }}
          className={` content-center p-4 ${
            getOrientation(filteredDataLayerTwo?.aspectRatio) === "horizontal"
              ? "w-full"
              : "h-full left-[50%] relative"
          }`}
        >
          <div
            className={`h-full w-full bg-white relative border-4 border-black  animate-popupin`}
          >
            {rooms.map((data: any, index) => {
              console.log(data, "dataError");
              return (
                <button
                  className={`absolute ${data.positionX} ${data.positionY} border-4 border-black ${data.height} ${data.width} text-center font-bold capitalize  block hover:bg-slate-400 transition-all ease-in duration-200 text-black`}
                  onClick={() => handleSelectRoom(index)}
                >
                  <h4
                  // className='absolute bottom-8 left-4 text-lg'
                  >
                    {data.nama}
                  </h4>
                </button>
              );
            })}
            {peopleData?.wbpProfile?.map((obj: any, i: number) => (
              <WBP visible={WBPVisible} item={obj} />
            ))}
            {peopleData?.petugas?.map((obj: any, i) => (
              <Petugas visible={petugasVisible} item={obj} />
            ))}
            {peopleData?.pengunjung?.map((obj: any, i) => (
              <Pengunjung visible={pengunjungVisible} item={obj} />
            ))}
            {gateways?.map((data, index) => {
              return (
                <Gateway
                  visible={gatewayVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {cameras?.map((data, index) => {
              return (
                <Camera
                  visible={cameraVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}

            {accessDoor?.map((data, index) => {
              return (
                <AccessDoor
                  visible={accessDoorVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {faceRecognition?.map((data, index) => {
              return (
                <FaceRecognition
                  visible={faceRecognitionVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {interactiveDesktop?.map((data, index) => {
              return (
                <InteractiveDesktop
                  visible={interactiveDesktopVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {interactiveTV?.map((data, index) => {
              return (
                <InteractiveTV
                  visible={interactiveTVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {selfRegKiosk?.map((data, index) => {
              return (
                <SelfRegKiosk
                  visible={selfRegKioskVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {nvr?.map((data, index) => {
              return (
                <NVR
                  visible={NVRVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {nas?.map((data, index) => {
              return (
                <NAS
                  visible={NASVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}

            {/* <NAS 
              visible={true}
              positionX="left-[50%]"
              positionY="bottom-[50%]"
              item={{nama: "Nas 1"}}
            />  */}
          </div>
        </div>
        {filteredDataLayerTwo ? (
          <div className="text-black absolute left-[5%] top-[20%] font-semibold">
            {/* {filteredDataLayerTwo.nama} */}
            <Breadcrumb
              url={window.location.href}
              pageName={filteredDataLayerTwo.nama}
            />
          </div>
        ) : (
          <>Gedung Not Found</>
        )}
        {/* select floor */}
        <div className="flex flex-col items-start w-[10%] h-full gap-4 pt-5 bg-neutral-950 px-2">
          {filteredDataLayerTwo?.lantai?.map((data, index) => {
            return (
              <button
                className={`w-full  ${
                  currentFloor === index
                    ? "bg-slate-400 text-black "
                    : " bg-slate-700"
                }  rounded-lg text-xl text-center py-2 font-bold b  hover:bg-slate-400 hover:text-neutral-950  transition-all ease-in duration-200`}
                onClick={() => handleSelectFloor(index)}
              >
                {data.nama}
              </button>
            );
          })}
          <button
            className="w-full  bg-slate-700  hover:bg-slate-400 hover:text-neutral-950  rounded-lg text-xl py-2 text-center font-bold  transition-all ease-in duration-200 "
            onClick={() => navigate("/dashboard/peta")}
          >
            <div className="">Kembali</div>
            <div className="text-[7px] mt-0">Denah Otmil</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gedung;
