const BASE_URL = "http://localhost:5000/api";

export const api = {
  async getDentists(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/dentists?${query}`);
    if (!res.ok) throw new Error("Failed to fetch dentists");
    return res.json();
  },

  async bookAppointment(payload) {
    const res = await fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to book appointment");
    return data;
  },

  async adminLogin(payload) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  },

  async getAppointments(token) {
    const res = await fetch(`${BASE_URL}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch appointments");
    return data;
  },

  async updateAppointmentStatus(id, status, token) {
    const res = await fetch(`${BASE_URL}/appointments/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update status");
    return data;
  }
};
