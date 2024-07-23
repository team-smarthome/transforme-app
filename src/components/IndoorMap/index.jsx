/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon, UserIcon } from '@heroicons/react/24/outline';

// porp-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-chartjs-2 components

// @mui material components
// import {
//   Modal,
//   Box,
//   Paper,
//   Typography,
//   Button,
//   IconButton,
//   Divider,
//   Avatar,
// } from "@mui/material";
import { Link } from 'react-router-dom';

// import { Router, Person, Close, Search, ArrowBack } from "@mui/icons-material";
// Material Dashboard 2 React components
// import MDBox from "../../components/MDBox";
// import div from "../../components/div";
import { apiWatchlistHistory, webserviceurl } from '../../services/api';
// IndoorMap configurations
import configs from './configs';

const getPositionStyles = (position) => {
  switch (position) {
    case 'A':
      return { top: 0, left: 0 };
    case 'B':
      return { top: 0, right: 0 };
    case 'C':
      return { bottom: 0, left: 0 };
    case 'D':
      return { bottom: 0, right: 0 };
    case 'E':
      return { top: '40%', left: 0 };
    case 'F':
      return { top: 0, left: '40%' };
    case 'G':
      return { top: '40%', right: 0 };
    case 'H':
      return { bottom: 0, left: '40%' };
    default:
      return { top: 0, left: 0 };
  }
};

function countDistance(cornerX, cornerY, lengthXY) {
  return Math.sqrt(
    Math.pow(lengthXY, 2) +
      Math.pow(lengthXY, 2) -
      2 * lengthXY * lengthXY * Math.cos(((cornerY - cornerX) * Math.PI) / 180)
  );
}

function getDistanceFromRssi(rssi, maxDistance) {
  console.log(parseInt(rssi, 10) / 99);
  console.log('max distance', maxDistance);
  return (parseInt(rssi, 10) / 99) * maxDistance;
}

const getWBPPosition = (WBPList, BoxDiagonal, BoxWidth) => {
  let temp = WBPList;
  for (let i = 0; i < temp.length; i++) {
    const distanceFromA = getDistanceFromRssi(temp[i].rssi[0], BoxDiagonal);
    const distanceFromD = getDistanceFromRssi(temp[i].rssi[1], BoxDiagonal);

    const x =
      (Math.pow(distanceFromA, 2) -
        Math.pow(distanceFromD, 2) +
        Math.pow(BoxWidth, 2)) /
      (2 * BoxWidth);
    const y = Math.sqrt(Math.pow(distanceFromA, 2) - Math.pow(x, 2));
    const yourPosition = { x, y };

    temp[i].position = yourPosition;
  }
  console.log(temp);

  return temp;
};

function IndoorMap({ gateway1, gateway2, dimension, listWB }) {
  const [WBPList, setWBPList] = useState(listWB);
  const BoxWidth = 800;
  const BoxHeightScale = dimension.height / dimension.width;
  const BoxHeight = BoxWidth * BoxHeightScale;
  const BoxDiagonal = Math.sqrt(Math.pow(BoxWidth, 2) + Math.pow(BoxHeight, 2));

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWBP, setSelectedWBP] = useState(null);
  const [detailWBP, setDetailWBP] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const positionGateway1Styles = getPositionStyles(gateway1.position);
  const positionGateway2Styles = getPositionStyles(gateway2.position);

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const openModal = async (visitorId, wbp, position) => {
    console.log('WBP Detail', wbp);

    try {
      let params = {
        visitorId: visitorId,
        pageSize: 20,
      };

      let result = await apiWatchlistHistory(params);
      console.log('res history', result);

      setDetailWBP(result.records);
      setSelectedWBP(wbp);
      setModalPosition(position);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching watchlist history:', error);
      alert('Connection error: tidak dapat mengambil data Prajurit Binaan');
    }
  };

  const closeModal = () => {
    setTabIndex(0);
    setSelectedWBP(null);
    setModalOpen(false);
  };

  const closeModalButton = () => {
    if (tabIndex !== 0) {
      setTabIndex(0);
    } else {
      setSelectedWBP(null);
      setModalOpen(false);
    }
  };

  return (
    <div
      style={{
        width: BoxWidth,
        height: BoxHeight,
        position: 'relative',
        backgroundColor: '#ebebebb8',
      }}
    >
      {WBPList
        ? WBPList.map((row, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: row.position.x,
                top: row.position.y,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <UserIcon
                onClick={(e) =>
                  openModal('ac1da4fd218f13ffd8f915b18894dac4', row, {
                    left: row.position.x,
                    top: row.position.y,
                    // top: e.currentTarget.offsetTop + e.currentTarget.clientHeight,
                    // left: e.currentTarget.offsetLeft,
                  })
                }
                className="h-10 w-10"
                style={{
                  color:
                    parseInt(row.batt) > 3000
                      ? '#8ed31e'
                      : parseInt(row.batt) > 1000
                      ? '#eea620'
                      : '#ef4646',
                }}
              />
              <span className="text-black">{row.name}</span>
            </div>
          ))
        : null}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div
        className="p-2 flex flex-col justify-center items-center absolute"
        style={positionGateway1Styles}
      >
        {/* <RouterIcon className="text-gray-600 text-lg" /> */}
        <div className="text-gray-600 font-medium">{gateway1.name}</div>
      </div>

      <div
        className="p-2 flex flex-col justify-center items-center absolute"
        style={positionGateway2Styles}
      >
        {/* <RouterIcon className="text-gray-600 text-lg" /> */}
        <div className="text-gray-600 font-medium">{gateway2.name}</div>
      </div>
    </div>
  );
}

// Setting default values for the props of IndoorMap
IndoorMap.defaultProps = {
  description: '',
};

// Typechecking props for the IndoorMap
IndoorMap.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
};

export default IndoorMap;
