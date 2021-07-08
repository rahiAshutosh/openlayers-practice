import React from "react";

/**
 * Generic Layer Wrapper
 * @component 
 */
const Layers = React.memo(({ children }) => {
  return <div>{children}</div>;
});

export default Layers;