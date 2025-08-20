import React from "react";
import { useState } from "react";

export default function Notifications() {
  const [selected, setSelected] = useState("");
  const remindersAndUpdates = ["Personal Reminders", "Order Updates", "Payment Updates"];
  const emailNotifications = [
    {
      key: "communication",
      title: "Communication emails",
      desc: "Receive emails about your account activity.",
    },
    {
      key: "marketing",
      title: "Marketing emails",
      desc: "Receive emails about new services, features, and more.",
    },
    {
      key: "service",
      title: "Service emails",
      desc: "Updates on orders, payments to stay informed.",
    },
    {
      key: "security",
      title: "Security emails",
      desc: "Receive emails about your account activity and security.",
    },
  ]
  const [settings, setSettings] = useState({
    communication: false,
    marketing: false,
    service: true,
    security: true,
  });
  const [mobileDifferent, setMobileDifferent] = useState(false);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full pt-5 pb-5">
      <h2 className="text-xl font-bold text-darkText">
        Notifications
      </h2>
      <p className="text-sm text-darkText/70">
        Configure how you receive notifications.
      </p>

      <div className="max-w-2xl mx-auto p-6">


        <div className="mt-6">
          <p className="font-medium text-darkText mb-2">
            Notify me about...
          </p>
          <div className="space-y-2">
            {remindersAndUpdates.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer text-darkText"
              >
                <input
                  type="checkbox"
                  name="notify"
                  value={opt}
                  checked={selected.includes(opt)}
                  onChange={() => {
                    if (selected.includes(opt)) {
                      setSelected(selected.filter((item) => item !== opt));
                    } else {
                      setSelected([...selected, opt]);
                    }
                  }}
                  className="accent-bgPri"
                />
                {opt}
              </label>
            ))}
          </div>

        </div>
        <div className="mt-8">
          <h3 className="font-medium text-lg text-darkText">
            Email Notifications
          </h3>
          <div className="mt-4 space-y-4">
            {emailNotifications.map((item) => (
              <div
                key={item.key}
                className="flex justify-between items-center rounded-xl border-2 border-darkText/20 p-4"
              >
                <div>
                  <p className="font-medium text-darkText">
                    {item.title}
                  </p>
                  <p className="text-sm text-darkText/70">
                    {item.desc}
                  </p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings[item.key]
                    ? "bg-bgPri"
                    : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${settings[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="mobileDifferent"
            className="flex items-start gap-3 cursor-pointer"
          >
            <input
              id="mobileDifferent"
              type="checkbox"
              checked={mobileDifferent}
              onChange={(e) => setMobileDifferent(e.target.checked)}
              className="mt-1 accent-bgPri"
            />
            <div>
              <p className="font-medium text-darkText">
                Use different settings for my mobile devices
              </p>
              <p className="text-sm text-darkText/70">
                You can manage your mobile notifications in the{" "}
                <a href="#" className="underline text-bgPri">
                  mobile settings
                </a>{" "}
                page.
              </p>
            </div>
          </label>

          <button
            type="button"
            className="mt-5 inline-flex items-center rounded-xl px-4 py-2 font-medium
                     bg-bgPri text-bgWhite
                     hover:opacity-90 focus:outline-none focus:ring-2
                     focus:ring-bgPri/40 shadow-sm"
          >
            Update notifications
          </button>
        </div>
      </div>
    </div>
  );
}
