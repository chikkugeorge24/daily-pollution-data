import React, { useState } from 'react';
import Spinner from './Spinner';

/** Custom Hook for showing and hiding the spinner */
const useSpinner = () => {
      const [visible, setVisible] = useState(false);
      const showSpinner = () => setVisible(true);
      const hideSpinner = () => setVisible(false);
      const spinner = visible ? <Spinner /> : null;
      return [spinner, showSpinner, hideSpinner];
};
export default useSpinner;