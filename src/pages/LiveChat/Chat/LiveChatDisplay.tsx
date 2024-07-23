import React, { useState } from 'react'
import Message from './Message';
import iconPicture from '../../../../assets/icon.png'
import InputChat from './InputChat';
import Messages from './Messages';

const LiveChatDisplay = (props:any) => {
    const {FilteredData} = props;

    const [chatValue , setChatValue] = useState('')

    const handleChangeChatValue = (event: any) => {
      if (event.target.value === ' '){
        setChatValue(event.target.value.trim());

      }else {
        setChatValue(event.target.value)
      }
     
    };

    console.log('CLICK',FilteredData)
  return (
    <div className='w-full ml-3 '>
        <div className='bg-slate-600 rounded-t-md px-4 py-2 text-white flex items-center h-[50px]'>
          <img src={iconPicture} className='w-10 h-10'></img>
          <div className='flex flex-col'>

          <label className='pl-2'>{FilteredData.nama}</label>
          <label className='pl-2 text-[9px] font-light'>Petugas {FilteredData.instansi}</label>
          </div>
        </div>
        <Messages FilteredData={FilteredData}></Messages>
        <InputChat handleChangeChatValue = {handleChangeChatValue} chatValue = {chatValue} setChatValue={setChatValue}></InputChat>
    </div>
  )
}

export default LiveChatDisplay