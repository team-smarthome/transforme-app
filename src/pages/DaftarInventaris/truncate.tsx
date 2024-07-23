import React, { useEffect, useState } from 'react';

function TextWithEllipsis({ text, maxLength }: any) {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (text && text.length > maxLength) {
      const truncated = '...' + text.substring(text.length - (maxLength - 1));
      setTruncatedText(truncated);
    }
  }, [text, maxLength]);

  return <div>{truncatedText}</div>;
}

export default TextWithEllipsis;
