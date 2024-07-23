import React, { useRef, useState } from 'react';

const InputChat = (props:any) => {
  const {handleChangeChatValue,chatValue,setChatValue} = props

//untuk handle button kirim
  const handleSend = () => {
    if (chatValue=== ''){
      alert('ini kosong')
    } else {
      alert('Sending Message');
    }
    setChatValue('')
  };

  // Agar tidak bisa enter untuk menambah baru baru , harus shift+enter 
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter' && event.shiftKey) {
      setChatValue((prevValue:any) => prevValue );
    } else if (event.key === 'Enter' ) {
      event.preventDefault();
      handleSend();
    }
  }


  // Untuk fitur upload
  const imgInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleDocClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className=" bg-white rounded-b-md items-center flex justify-between gap-4 shadow-inner overflow-hidden">
      <textarea
        className="px-4 py-2 w-[100%] outline-none border-none text-black h-[50px] resize-none"
        
        placeholder="Type a message...."
        value={chatValue}
        onChange={handleChangeChatValue}
        onKeyDown={handleKeyDown}
      ></textarea>
      <input type='file' ref={fileInputRef} accept=".pdf, .doc, .docx" className='hidden'></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-8 h-8 cursor-pointer"
          onClick={handleDocClick}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
     
      
      <input type='file' accept="image/*" ref={imgInputRef} className='hidden'/>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-8 h-8 cursor-pointer"
          onClick={handleImgClick}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>


      

      <button
        onClick={handleSend}
        className="mx-2 px-4 py-1 bg-slate-600 text-white rounded-md hover:opacity-60"
      >
        Send
      </button>
    </div>
  );
};

export default InputChat;
