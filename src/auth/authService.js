const API_BASE = "http://localhost:3000";

export function getStoredAuth() {
  try {
    const raw = localStorage.getItem("cineview_auth");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function storeAuth(user, token) {
  localStorage.setItem(
    "cineview_auth",
    JSON.stringify({
      user,
      token,
    })
  );
}

export function clearStoredAuth() {
  localStorage.removeItem("cineview_auth");
}

export async function signupRequest(name, email, password) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to sign up");
  }

  return res.json();
}

export async function loginRequest(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to log in");
  }

  return res.json();
}

