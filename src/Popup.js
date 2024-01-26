/*global chrome*/
import React, { useState, useEffect } from "react";
import "./Popup.css";

const EMPOWER_PLANT_URL =
  "https://application-monitoring-react-dot-sales-engineering-sf.appspot.com/";

const Popup = () => {
  const [salesEngineer, setSalesEngineer] = useState(
    localStorage.getItem("salesEngineer") || ""
  );
  const [slowdownOption, setSlowdownOption] = useState(
    localStorage.getItem("slowdownOption") || false
  );
  const [backendOption, setBackendOption] = useState(
    localStorage.getItem("backendOption") || "flask"
  );

  const updateUrl = (tabId) => {
    chrome.tabs.sendMessage(tabId, {
      type: "updateUrl",
      salesEngineer,
      slowdownOption,
      backendOption,
    });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      const tabId = tabs[0].id;
      if (url.includes(EMPOWER_PLANT_URL)) updateUrl(tabId);
    });
  }, [salesEngineer, slowdownOption, backendOption]);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("salesEngineer", salesEngineer);
  }, [salesEngineer]);

  useEffect(() => {
    localStorage.setItem("slowdownOption", slowdownOption);
  }, [slowdownOption]);

  useEffect(() => {
    localStorage.setItem("backendOption", backendOption);
  }, [backendOption]);

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
