import React, { useState } from "react";

const Toggle = () => {
  const [toggleOn, setToggleOn] = useState(true);
  return (
    <div className="toggle-btn flex aic jc">
      <button
        onClick={() => setToggleOn(!toggleOn)}
        className={`btn button cleanbtn flex aic jc rel anim ${
          toggleOn ? "" : "on"
        }`}
      >
        <div className="circle flex aic jc abs anim"></div>
      </button>
    </div>
  );
};
export default Toggle;
