"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "",
    gstNumber: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const res = await fetch("/api/settings");
    const data = await res.json();

    if (data)
      setSettings({
        companyName: data.companyName || "",
        gstNumber: data.gstNumber || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
      });
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      alert("Settings Saved Successfully");
    } else {
      alert("Failed");
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Company Settings</h1>

      <form onSubmit={saveSettings} className="space-y-4">

        <input
          placeholder="Company Name"
          value={settings.companyName}
          onChange={(e) =>
            setSettings({ ...settings, companyName: e.target.value })
          }
          className="w-full border rounded p-2"
        />

        <input
          placeholder="GST Number"
          value={settings.gstNumber}
          onChange={(e) =>
            setSettings({ ...settings, gstNumber: e.target.value })
          }
          className="w-full border rounded p-2"
        />

        <input
          placeholder="Email"
          value={settings.email}
          onChange={(e) =>
            setSettings({ ...settings, email: e.target.value })
          }
          className="w-full border rounded p-2"
        />

        <input
          placeholder="Phone"
          value={settings.phone}
          onChange={(e) =>
            setSettings({ ...settings, phone: e.target.value })
          }
          className="w-full border rounded p-2"
        />

        <textarea
          placeholder="Address"
          value={settings.address}
          onChange={(e) =>
            setSettings({ ...settings, address: e.target.value })
          }
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Save Settings
        </button>

      </form>
    </div>
  );
}