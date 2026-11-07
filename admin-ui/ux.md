# Rencana Kerja Admin UI/UX — AysheD Mobile

## Tujuan

Menyusun tampilan dan fungsionalitas halaman admin (AdminDashboard) yang **realistis dan terhubung ke backend nyata**, tanpa mengklaim fitur yang belum diimplementasikan.

---

## Status Realisasi (diperbarui 2026-11-07)

| # | Tugas | Status |
|---|-------|--------|
| 1 | Fix login (sambung API) — LoginScreen.js memanggil `auth.login()` dan `authApi.me()` | ✅ Selesai (commit 7f1f35b) |
| 2 | Perbaikan routing role — `index.tsx` cek `role === 'admin'` | ✅ Selesai (commit 7f1f35b) |
| 3 | Rename SuperAdminDashboard → AdminDashboard | ✅ Selesai (commit da2fe87) |
| 4 | Layar 1: daftar log + filter + search (sambung ke `/admin/logs`) | ⏳ Belum |
| 5 | Layar 1: tombol suspend + copy IP | ✅ Selesai (commit 003bc40) |
| 6 | Layar 2: insiden aktif dari log mentah terbaru | ⏳ Belum |
| 7 | Layar 2: kartu metrik (dummy berlabel atau live) | ⏳ Belum |
| 8 | Backend: buat endpoint `/admin/stats/summary` | ⏳ Belum |
| 9 | Layar 2: kartu metrik live | ⏳ Belum (menunggu #8) |

---

## Prinsip Pedoman (dari review mentor)

1. **Jangan klaim kapabilitas yang tidak nyata** — istilah enterprise (failover, cluster, anomaly scoring) dihapus.
2. **Tombol aksi harus terhubung ke endpoint backend yang ada** — jangan taruh tombol dekorasi.
3. **Data yang ditampilkan harus berasal dari data nyata** (`login_logs`, `account_locks`, `users`), bukan angka fiktif.
4. **Prioritaskan endpoint yang sudah ada** sebelum membuat endpoint baru.

---

## Endpoint yang Sudah Tersedia (Backend)

| Method | Path | Keterangan |
|--------|------|------------|
| GET | `/admin/logs` | Daftar log login (limit default 100), urut timestamp DESC |
| GET | `/admin/health` | Health, uptime, CPU/memori |
| GET | `/admin/threat-logs` | Log fail2ban bans |
| GET | `/admin/ufw-logs` | Log UFW firewall |
| POST | `/admin/suspend-user` | Suspend user (`user_id`) |

## Endpoint yang Perlu Dibuat (Backend — Tahap 2)

| Method | Path | Keterangan |
|--------|------|------------|
| GET | `/admin/stats/summary` | Ringkasan angka: total terblokir, brute force 10m |

---

## Langkah 1: Layar 1 — Daftar Audit Log (Prioritas Utama)

### 1.1 Sambungkan ke `/admin/logs`
- Panggil `auth.getLoginLogs()` saat tab "AUDIT LOGS" aktif.
- Gunakan `RefreshControl` (pull-to-refresh) untuk reload data.
- Tampilkan state loading (`ActivityIndicator`) saat fetch.

### 1.2 Filter & Search (Frontend-only, dari data yang sudah di-fetch)
- **Filter pill**: "Semua / Sukses / Gagal" → filter berdasarkan `success === true/false`.
- **Search bar**: filter `email` atau `ip_address` yang mengandung query (case-insensitive).
- **Badge angka**: hitung dari array log yang sudah di-fetch (bukan hardcoded).

### 1.3 Kartu Log — Field Asli
Tampilkan field dari `LoginLogResponse`:
- `id` → "#1236"
- `email` → "user1@g.com"
- `ip_address` → "10.19.216.74"
- `timestamp` → format WIB (sudah dikonversi backend, tampilkan langsung)
- `failure_reason` → "bad_password", "rate_limited", "locked", "admin_suspended", "unknown_user"
- `success` → badge "Sukses" (hijau) / "Gagal" (merah)
- `user_agent` → opsional, tampilkan jika ada

### 1.4 Tombol Aksi pada Kartu Log
- **"Copy IP"** → `Clipboard.setStringAsync(ip)`
- **"Suspend Akun"** → panggil `POST /admin/suspend-user` dengan `user_id` dari log. Ganti tombol lama "Putus JWT & Tangguhkan Sesi".
- **"Inspect"** → tampilkan modal/detail dengan `request_id`, `device_id`, `user_id`.

### 1.5 Hapus Data Fiktif
- Hapus hardcoded log cards (#10, #9, #3).
- Hapus angka hardcoded pada badge filter (10, 8, 2).

---

## Langkah 2: Layar 2 — Ringkasan Ancaman (Tahap 2)

### 2.1 Kartu Metrik (Tunggu Endpoint `/admin/stats/summary`)
- **"Terblokir"** → angka dari `COUNT(*) FROM account_locks WHERE locked_until > now()`
- **"Brute Force (rentang 10m)"** → angka dari `COUNT(*) FROM login_logs WHERE failure_reason='bad_password' AND timestamp > now()-10min`
- **"Anomali"** → **HAPUS** (risk-scoring belum dibangun)

> **Catatan**: Jika waktu mepet untuk tugas mobile, tampilkan kartu metrik dengan label jelas "contoh tampilan, data belum live" sampai endpoint `/admin/stats/summary` selesai dibuat.

### 2.2 Insiden Aktif (Tahap Awal: Log Mentah Terbaru)
- Tampilkan 5 baris `login_logs` terbaru dengan `success=false`, diurutkan `timestamp DESC`.
- Format: "User X: kegagalan pada [timestamp], IP: [ip], Alasan: [failure_reason]"
- **Tanpa agregasi pintar** dulu (pengelompokan per user, deteksi pola) — itu tahap nanti.

### 2.3 Istilah yang Harus Diganti
- `"Failover Standby: Cluster Ready"` → `"Status Server: Aktif"`
- `"Protokol Isolasi Sesi"` → hapus atau ganti dengan istilah yang jujur
- `"Safe Guardrail"` → hapus (tidak ada guardrail yang diimplementasikan)
- `"200 req/s"`, `"Postman 7.39.1"`, `"OkHttp/Android 4.12.0"`, `"Auth: Basic Auth"` → **hapus semua**
- `"Anomali"` kartu → **hapus**

### 2.4 Tombol Aksi
- `"Putus JWT & Tangguhkan Sesi"` → **ganti** dengan `"Suspend Akun"` (panggil `/admin/suspend-user`)
- `"Blokir IP"` / `"Lepas Blokir"` → **nonaktifkan** sampai ada endpoint UFW mutation di backend

---

## Langkah 3: Backend — Endpoint `/admin/stats/summary` (Tahap 2)

### 3.1 Spesifikasi Endpoint
```
GET /admin/stats/summary
Auth: Bearer (admin only)
Response:
{
  "total_locked": 14,
  "brute_force_10m": 3,
  "total_logs": 1271
}
```

### 3.2 Query yang Dijalankan
- `total_locked`: `SELECT COUNT(*) FROM account_locks WHERE locked_until > now()`
- `brute_force_10m`: `SELECT COUNT(*) FROM login_logs WHERE failure_reason='bad_password' AND timestamp > now()-10min`
- `total_logs`: `SELECT COUNT(*) FROM login_logs`

---

## Urutan Eksekusi

| Prioritas | Tugas | Ketergantungan | Status |
|-----------|-------|----------------|--------|
| 1 | Fix login (sambung API) | Selesai | ✅ Selesai (commit 7f1f35b) |
| 2 | Layar 1: daftar log + filter + search | Tidak ada | ⏳ Belum |
| 3 | Layar 1: tombol suspend + copy IP | Endpoint `/admin/suspend-user` (sudah ada) | ⏳ Belum |
| 4 | Layar 2: insiden aktif dari log mentah terbaru | Endpoint `/admin/logs` (sudah ada) | ⏳ Belum |
| 5 | Layar 2: kartu metrik (dummy berlabel atau live) | Endpoint `/admin/stats/summary` (perlu dibuat) | ⏳ Belum |
| 6 | Backend: buat `/admin/stats/summary` | Tidak ada | ⏳ Belum |
| 7 | Layar 2: kartu metrik live | Langkah 6 selesai | ⏳ Belum |

---

## Catatan

- **Jangan kerjakan semua sekaligus.** Mulai dari Langkah 1–4 (Layar 1 + insiden aktif dari log mentah) karena sudah bisa jalan tanpa backend tambahan.
- Langkah 5–7 (kartu metrik live) bisa ditunda sampai endpoint `/admin/stats/summary` dibuat.
- Setiap perubahan, update `README.md` di folder `mobile/` dengan changelog.