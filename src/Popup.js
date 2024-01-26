/*global chrome*/
import React, { useState, useEffect } from "react";
import "./Popup.css";

const Popup = () => {
  const [salesEngineer, setSalesEngineer] = useState("");
  const [slowdownOption, setSlowdownOption] = useState(false);
  const [backendOption, setBackendOption] = useState("flask");

  const updateUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, {
        type: "updateUrl",
        salesEngineer,
        slowdownOption,
        backendOption,
      });
    });
  };

  useEffect(() => {
    updateUrl();
  }, [salesEngineer, slowdownOption, backendOption]);

  return (
    <div className="popup-container">
      <label>
        SE:
        <input
          type="text"
          value={salesEngineer}
          onChange={(e) => setSalesEngineer(e.target.value)}
        />
      </label>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="fe+be"
            checked={slowdownOption === "fe+be"}
            onChange={() => setSlowdownOption("fe+be")}
          />
          FE+BE Slowdown
        </label>

        <label>
          <input
            type="radio"
            value="frontend"
            checked={slowdownOption === "frontend"}
            onChange={() => setSlowdownOption("frontend")}
          />
          Frontend Only Slowdown
        </label>
      </div>

      <div className="radio-group">
        {[
          "flask",
          "express",
          "springboot",
          "aspnetcore",
          "laravel",
          "ruby",
          "rails",
        ].map((backend) => (
          <label key={backend}>
            <input
              type="radio"
              value={backend}
              checked={backendOption === backend}
              onChange={() => setBackendOption(backend)}
            />
            {backend}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Popup;
