import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
  const remindersAndUpdates = ["Personal Reminders", "Order Updates", "Payment Updates"];
  const emailNotifications = [
    { key: "communicationEmails", title: "Communication emails", desc: "Receive emails about your account activity." },
    { key: "marketingEmails", title: "Marketing emails", desc: "Receive emails about new services, features, and more." },
    { key: "serviceEmails", title: "Service emails", desc: "Updates on orders, payments to stay informed." },
    { key: "securityEmails", title: "Security emails", desc: "Receive emails about your account activity and security." },
  ];

  const [selected, setSelected] = useState([]); 
  const [settings, setSettings] = useState({
    communicationEmails: false,
    marketingEmails: false,
    serviceEmails: true,
    securityEmails: true,
  });
  const [mobileDifferent, setMobileDifferent] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications/notification/settings", {
          withCredentials: true,
        });

        const data = res.data.data;

        // map backend -> frontend state
        setSelected([
          data.notifyAbout.personalReminders ? "Personal Reminders" : null,
          data.notifyAbout.orderUpdates ? "Order Updates" : null,
          data.notifyAbout.paymentUpdates ? "Payment Updates" : null,
        ].filter(Boolean));

        setSettings(data.emailNotifications);
        setMobileDifferent(data.useDifferentMobileSettings);
      } catch (err) {
        console.error("Failed to fetch notification settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const toggleEmail = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        notifyAbout: {
          personalReminders: selected.includes("Personal Reminders"),
          orderUpdates: selected.includes("Order Updates"),
          paymentUpdates: selected.includes("Payment Updates"),
        },
        emailNotifications: settings,
        useDifferentMobileSettings: mobileDifferent,
      };

      await axios.put("http://localhost:5000/api/notifications/notification/settings", payload, {
        withCredentials: true,
      });

      alert("Notification settings updated successfully!");
    } catch (err) {
      console.error("Failed to update notification settings:", err);
      alert("Failed to update Notification settings.");
    }
  };

  if (loading) return <p className="text-darkText">Loading settings...</p>;

  return (
    <div className="w-full pt-5 pb-5">
      <h2 className="text-xl font-bold text-darkText">Notifications</h2>
      <p className="text-sm text-darkText/70">Configure how you receive notifications.</p>

      <div className="max-w-2xl mx-auto px-1">
        {/* Reminders */}
        <div className="mt-6">
          <p className="font-semibold text-darkText mb-2 lg:text-lg">Notify me about...</p>
          <div className="space-y-2">
            {remindersAndUpdates.map((opt) => (
              <label key={opt} className="flex text-sm font-normal items-center gap-2 cursor-pointer text-darkText">
                <input
                  type="checkbox"
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

        {/* Email Notifications */}
        <div className="mt-8">
          <h3 className="font-medium text-lg text-darkText">Email Notifications</h3>
          <div className="mt-4 lg:space-y-4 space-y-2">
            {emailNotifications.map((item) => (
              <div
                key={item.key}
                className="flex justify-between items-center rounded-xl border-2 border-darkText/20 p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-darkText sm:text-base lg:text-md">{item.title}</p>
                  <p className="text-xs sm:text-sm text-darkText/70">{item.desc}</p>
                </div>
                <div className="w-14 flex justify-end">
                  <button
                    onClick={() => toggleEmail(item.key)}
                    className={`relative inline-flex h-4 w-8 sm:h-5 sm:w-10 items-center rounded-full transition-colors ${
                      settings[item.key] ? "bg-bgPri" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                        settings[item.key] ? "translate-x-4 sm:translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Different */}
        <div className="mt-6 flex flex-col justify-center">
          <label htmlFor="mobileDifferent" className="flex items-start gap-3 cursor-pointer">
            <input
              id="mobileDifferent"
              type="checkbox"
              checked={mobileDifferent}
              onChange={(e) => setMobileDifferent(e.target.checked)}
              className="mt-1 accent-bgPri"
            />
            <div>
              <p className="font-medium text-darkText text-sm lg:text-base ">
                Use different settings for my mobile devices
              </p>
              <p className="text-xs lg:text-sm text-darkText/70">
                You can manage your mobile notifications in the{" "}
                <a href="#" className="underline text-bgPri">
                  mobile settings
                </a>{" "}
                page.
              </p>
            </div>
          </label>

          <div className="mt-5 flex justify-center lg:justify-start">
            <button
              type="button"
              onClick={handleUpdate}
              className="w-48 inline-flex items-center text-sm justify-center rounded-lg px-4 py-2 font-medium
                 bg-bgPri text-bgWhite
                 hover:opacity-90 focus:outline-none focus:ring-2
                 focus:ring-bgPri/40 shadow-sm"
            >
              Update notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
