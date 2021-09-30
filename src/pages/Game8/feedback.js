import React from "react";
import FeedbackPanel from "./components/FeedbackPanel";

const Feedback = ({ data, restart, leave }) => {
  return (
    <div>
      <div className="feedback absolute-center">
        <FeedbackPanel
          feedback={data.messages}
          won={data.won}
          restart={restart}
          leave={leave}
        />
      </div>
    </div>
  );
};

export default Feedback;
