import React from 'react';
import SpinnerIcon from './SpinnerIcon';

/** Load the Spinner */
const Spinner = () => {
      const spinnerStyle = {
            justifyContent: "center",
            alignItems: "center",
            margin: "auto"
      }
      return (
            <div style={spinnerStyle}>
                  <SpinnerIcon />
            </div>
      );
};
export default Spinner;
