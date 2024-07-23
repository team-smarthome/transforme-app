import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { time } from 'console';

const Messages = (props: any) => {
  const { FilteredData } = props;
  console.log('TEST', FilteredData);
  const namaBulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  {
    /* ScrollToBottom Start*/
  }

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  {
    /* ScrollToBottom End */
  }

  {
    /* DATE KONVERT START */
  }

  const newMessage: any = [];

  FilteredData.dataChat.forEach((message: any) => {
    const content = message.content;
    const from = message.from;
    const picture = message.picture;

    const startDate = new Date(message.timestamp);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    const bulanName = namaBulan[startDate.getMonth()];
    let timeAgoString = '';

    if (diffInDays > 0) {
      timeAgoString = `${startDate.getDate()} ${bulanName} ${startDate.getFullYear()}`;
    } else {
      timeAgoString = 'Today';
    }

    const jam = startDate.getHours().toString().padStart(2, '0');
    const menit = startDate.getMinutes().toString().padStart(2, '0');
    const waktuChat = `${jam}:${menit}`;

    const newArray = {
      content: content,
      from: from,
      picture : picture,
      timeAgoString: timeAgoString,
      waktuChat: waktuChat,
      timeStamp: message.timestamp,
    };

    console.log('---------');
    console.log(newArray);

    newMessage.push(newArray);
  });

  console.log('NEW ARRAY', newMessage);

  {
    /* DATE KONVERT START */
  }
  const messagesByDate: any = {};

  {
    /* MEMBUAT ARRAY BARU DARI DATA newMessage*/
  }
  newMessage.forEach((message: any) => {
    const date = message.timeAgoString; 
    if (!messagesByDate[date]) {
      messagesByDate[date] = [];
    }
    messagesByDate[date].push(message);
  });

  console.log('SECOND ARRAY', messagesByDate);

  const messageGroups = Object.keys(messagesByDate).map((date) => {
    return (
      <div key={date}>
        <div className="w-full justify-center flex">
          <p className="bg-slate-600 mb-3 rounded-full px-3 w-fit text-white text-[10px] font-light">
            {date}
          </p>
        </div>
        {messagesByDate[date].map((data: any, index: any) => (
          <Message
            key={index}
            picture = {data.picture}
            content={data.content}
            from={data.from}
            waktuChat={data.waktuChat}
          />
        ))}
      </div>
    );
  });

  useEffect(() => {
    scrollToBottom();
  }, [messageGroups]);

  return (
    <div
      ref={messagesContainerRef}
      className="bg-slate-200 p-[10px] h-[490px] overflow-scroll"
    >
      {messageGroups}
    </div>
  );
};

export default Messages;
