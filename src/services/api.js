const APISEC_BASE_URL = __DEV__
  ? 'http://10.154.197.74:8000/'
  : 'https://api.ayshed.biz.id';

const APIBE_BASE_URL = __DEV__
  ? 'http://10.154.197.74:8002'
  : 'https://be.ayshed.biz.id';

async function request(baseUrl, path, options = {}) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const responseText = await response.text();
  let data = {};
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (e) {
    data = { detail: 'Invalid JSON response from server' };
  }

  if (!response.ok) {
    const message = data?.detail || 'Request failed';
    throw new Error(
      Array.isArray(message)
        ? message.map((m) => m.msg || JSON.stringify(m)).join(', ')
        : message
    );
  }

  return data;
}

export const authApi = {
  login: (payload) => request(APISEC_BASE_URL, 'auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request(APISEC_BASE_URL, 'auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  me: (token) => request(APISEC_BASE_URL, 'auth/me', { headers: { Authorization: `Bearer ${token}` } }),
  logout: (token) => request(APISEC_BASE_URL, 'auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }),
};

export const apiBe = {
  sync: (token, body, lastSyncTimestamp) => {
    const params = new URLSearchParams();
    if (lastSyncTimestamp) params.append('last_sync_timestamp', lastSyncTimestamp);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const url = `/api/v1/transactions/sync${queryString}`;

    return request(APIBE_BASE_URL, url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
  },
};

export default { APISEC_BASE_URL, APIBE_BASE_URL };
