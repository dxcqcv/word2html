import React, { ReactElement } from 'react';
const MyLoadingComponent = ({
  error,
  retry,
  pastDelay,
}: {
  error: unknown;
  retry: () => void;
  pastDelay: boolean;
}): ReactElement | null => {
  // Handle the error state
  if (error) {
    return (
      <div>
        加载发生意外，请点击按钮重新加载
        <button onClick={retry}>重新加载</button>
      </div>
    );
  } else if (pastDelay) {
    return <div>加载中...</div>;
  } else {
    return null;
  }
};
export default MyLoadingComponent;
