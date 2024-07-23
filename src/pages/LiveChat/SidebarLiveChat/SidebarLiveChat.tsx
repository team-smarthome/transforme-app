import React, { useEffect, useRef, useState } from 'react';
import IconProfile from '../../../../assets/icon.png';
import LiveChatDisplay from '../Chat/LiveChatDisplay';
import BeforeActiveChat from '../Chat/BeforeActiveChat';
import SearchChat from './SearchChat';
import { dummyData } from '../Misc/dataDummy.js';

function SidebarLiveChat() {
  const [isActiveButton, setIsActiveButton]: any = useState(null);
  const [isActiveChat, setIsActiveChat]: any = useState(false);
  const [searchResult, setSearchResult]: any = useState(null);
  const [profilePicture, setProfilePicture]: any = useState(null);

  const handlePersonClick = (index: any, data: any) => {
    setIsActiveButton(index);
    setIsActiveChat(true);
    setSearchResult(data);
    setSearchTerm('');
  };

  {
    /* Handle Search Start */
  }
  const [searchTerm, setSearchTerm]: any = useState('');

  const filtered = dummyData.filter((item: { nama: string }) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseSearch = () => {
    setSearchTerm('');
  };

  console.log('HASIL SEARCH', filtered);
  {
    /* Handle Search  End */
  }

  return (
    <div className="mt-6 flex">
      <div className="bg-slate-600 w-[60%] rounded-md">
        <div className="bg-slate-600 rounded-t-md p-[10px] text-white flex items-center h-[50px]">
          <label className="pl-2">Chat</label>
        </div>

        <SearchChat
          handleChange={handleChange}
          handleClose={handleCloseSearch}
          searchTerm={searchTerm}
        ></SearchChat>

        <div className="overflow-scroll  h-[490px] pt-2 px-2">
          {filtered.length === 0 ? (
            <div className="text-center mt-4">
              <p className="font-bold text-slate-300">Nama tidak ada</p>
            </div>
          ) : (
            filtered.map((data: any, index: any) => {
              return (
                <>
                  <button
                    key={index}
                    onClick={() => handlePersonClick(index, data)}
                    className={`w-full hover:bg-slate-400  rounded-lg text-white hover:text-black  ${
                      isActiveButton === index ? 'bg-slate-400' : ''
                    } `}
                  >
                    <div className="px-2 flex items-center ">
                      <img
                        className="w-15 h-15 rounded-full"
                        src={IconProfile}
                        alt="iconProfilr"
                      />
                      <div className="ml-4 items-center">
                        <div className="flex items-center">
                          <label className="font-semibold ">{data.nama}</label>
                          <label className="pl-1 font-light text-[10px] align-bottom italic ">
                            (Petugas {data.instansi})
                          </label>
                        </div>
                        <div className="flex items-start">
                          {data.dataChat[data.dataChat?.length - 1].from ===
                          'you' ? (
                            <p className="text-sm font-light">
                              You:{' '}
                              {data.dataChat[data.dataChat.length - 1]?.content}{' '}
                            </p>
                          ) : (
                            <p className="text-sm font-light">
                              {data.dataChat[data.dataChat.length - 1]?.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                  <div className="border-b items-center mb-2 opacity-30"></div>
                </>
              );
            })
          )}
        </div>
      </div>
      {isActiveChat ? (
        <LiveChatDisplay FilteredData={searchResult}></LiveChatDisplay>
      ) : (
        <BeforeActiveChat></BeforeActiveChat>
      )}
    </div>
  );
}

export default SidebarLiveChat;
