import React from 'react';
import iconPicture from '../../../../assets/icon.png';
import { time } from 'console';

const Message = (props: any) => {
  const { content, from, waktuChat, picture } = props;

  console.log('PIC', picture);

  return (
    <div>
      {picture.length > 0 && content === '' ? (
        // picture without content
        <div
          className={`flex mb-[20px] ${
            from === 'you' ? 'flex-row-reverse' : 'flex-row'
          } items-start gap-x-3`}
        >
          <div className="flex flex-col">
            <img
              src={iconPicture}
              alt="profile"
              className="w-8 h-8 rounded-full "
            ></img>
          </div>

          <div
            className={`max-w-md flex flex-col ${
              from === 'you' ? 'items-end' : 'items-start'
            } gap-y-1`}
          >
            <div className="flex flex-col">
              <div>
                {picture.map((data: any) => (
                  <img
                    src={data.pic}
                    alt={`image from ${from}`}
                    className={`px-1 py-1 mb-2 max-w-[200px] max-h-[200px] object-center ${
                      from === 'you'
                        ? 'text-white bg-slate-400 rounded-l-md rounded-br-md self-end'
                        : 'text-slate-400 bg-white rounded-r-md rounded-bl-md'
                    }`}
                  ></img>
                ))}
              </div>
            </div>

            <span className="text-xs">{waktuChat}</span>
          </div>
        </div>
      ) : (
        <>
          {picture.length > 0 && content !== '' ? (
            // picture with content
            <div
              className={`flex mb-[20px] ${
                from === 'you' ? 'flex-row-reverse' : 'flex-row'
              } items-start gap-x-3`}
            >
              <div className="flex flex-col">
                <img
                  src={iconPicture}
                  alt="profile"
                  className="w-8 h-8 rounded-full "
                ></img>
              </div>

              <div
                className={`max-w-md flex flex-col ${
                  from === 'you' ? 'items-end' : 'items-start'
                } gap-y-1`}
              >
                <div className="flex flex-col">
                  <>
                    {picture.map((data: any) => (
                      <img
                        src={data.pic}
                        alt={`image from ${from}`}
                        className={`px-1 py-1 mb-2 max-w-[200px] max-h-[200px] object-center ${
                          from === 'you'
                            ? 'text-white bg-slate-400 rounded-l-md rounded-br-md self-end'
                            : 'text-slate-400 bg-white rounded-r-md rounded-bl-md'
                        }`}
                      ></img>
                    ))}
                  </>
                  <p
                    className={`px-3 py-1 max-w-fit ${
                      from === 'you'
                        ? 'text-white bg-slate-400 rounded-l-md rounded-br-md self-end'
                        : 'text-slate-400 bg-white rounded-r-md rounded-bl-md'
                    }`}
                  >
                    {content}
                  </p>
                </div>

                <span className="text-xs">{waktuChat}</span>
              </div>
            </div>
          ) : (
            // no picture
            <div
              className={`flex mb-[20px] ${
                from === 'you' ? 'flex-row-reverse' : 'flex-row'
              } items-start gap-x-3`}
            >
              <div className="flex flex-col">
                <img
                  src={iconPicture}
                  alt="profile"
                  className="w-8 h-8 rounded-full "
                ></img>
              </div>

              <div
                className={`max-w-md flex flex-col ${
                  from === 'you' ? 'items-end' : 'items-start'
                } gap-y-1`}
              >
                <div className="flex flex-col">
                  <p
                    className={`px-3 py-1 max-w-fit ${
                      from === 'you'
                        ? 'text-white bg-slate-400 rounded-l-md rounded-br-md self-end'
                        : 'text-slate-400 bg-white rounded-r-md rounded-bl-md'
                    }`}
                  >
                    {content}
                  </p>
                </div>

                <span className="text-xs">{waktuChat}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
