// 2. Ambil variabel dari .env (Wajib EXPO_PUBLIC_ jika menggunakan Expo)
// Jika Anda pakai React Native CLI biasa, ganti menjadi: process.env.ip atau import dari '@env'
const ip = process.env.EXPO_PUBLIC_ip || process.env.ip;
const port = process.env.EXPO_PUBLIC_port || process.env.port;

if (!ip || !port) {
  console.error('[API] IP atau port tidak terdefinisi. Periksa file .env');
}

// 3. Perbaikan APISEC_BASE_URL (Wajib menggunakan BACKTICK ` bukan SINGLE QUOTE ')
const APISEC_BASE_URL = __DEV__
  ? `http://${ip}:${port}/` 
  : 'https://voting-duta.biz.id'; // URL untuk Production jika tidak sedang __DEV__

// 4. Tambahkan definisi APIBE_BASE_URL yang kurang agar tidak error saat di-export
const APIBE_BASE_URL = APISEC_BASE_URL; 


// --- SISA KODE REQUEST & API ANDA TETAP SAMA ---

async function request(baseUrl, path, options = {}) {
  // Jika path diawali dengan '/', hapus '/' agar tidak double saat digabung dengan baseUrl yang sudah punya '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const url = `${baseUrl}${cleanPath}`;
  
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
  loginLogs: (token) => request(APISEC_BASE_URL, 'admin/logs', { headers: { Authorization: `Bearer ${token}` } }),
  users: (token) => request(APISEC_BASE_URL, 'auth/users', { headers: { Authorization: `Bearer ${token}` } }),
  ufwLogs: (token) => request(APISEC_BASE_URL, 'admin/logs', { headers: { Authorization: `Bearer ${token}` } }),
  chartSummary: (token) => request(APISEC_BASE_URL.replace('/api/v1',''), '/api/charts/login-summary', { headers: { Authorization: `Bearer ${token}` } }),
  suspendUser: (token, userId) => request(APISEC_BASE_URL, 'admin/suspend-user', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ user_id: userId }),
  }),
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
