import React, { Suspense, useState } from "react";
import { Radio } from "antd";
import Architecture1 from "./Architecture_1";

const App = () => {
  const [choice, setChoice] = useState(2);

  const changeArchitecture = (e) => setChoice(e.target.value);

  const SecondArchitecture = React.lazy(() => import('./Architecture_2/main'));
  const currentArchitecture = choice === 1 ? <Architecture1 />: <Suspense fallback={<span>Loading</span>}><SecondArchitecture /></Suspense>

  return (
    <div className="container">
      {currentArchitecture}
      <footer className="architecture-switch">
        <Radio.Group value={choice} onChange={changeArchitecture}>
          <Radio value={1}>First Architecture</Radio>
          <Radio value={2}>Second Architecture</Radio>
        </Radio.Group>
      </footer>
    </div>
  );
};

export default App;