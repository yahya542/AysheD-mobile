# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Catatan Perubahan (Changelog)

### [2026-11-07]
- **Perbaikan Login**: Mengganti mock login (setTimeout) dengan panggilan API nyata ke backend melalui `auth.login()` dan `authApi.me()`. Menambahkan penanganan error untuk kredensial salah.
- **Perbaikan Routing Role**: Mengubah pengecekan role di `index.tsx` dari `'superadmin'` menjadi `'admin'` (sesuai dengan `UserRole.admin` dari backend) agar akun admin diarahkan ke `AdminDashboard`.
- **Rencana Kerja Admin UI/UX**: Membuat dokumen `admin-ui/ux.md` berisi rencana tampilan dan fungsionalitas halaman admin dengan prioritas eksekusi yang realistis, menggunakan data nyata dari endpoint backend yang sudah ada.

## Catatan Perubahan (Changelog)

### [2026-11-03]
- **Upgrade SDK**: Upgrade Expo SDK 57 ke SDK 58 (`expo@~58.0.22`, `react@19.3.0`, `react-native@0.88.1`, serta update seluruh paket pendukung ke versi kompatibel SDK 58).
- **Perbaikan Font Bundling**: Memulihkan aset font `MaterialSymbols_400Regular.ttf` yang tidak lengkap agar bundling Android tidak gagal.
- **Log Login**: Menambahkan sorting berdasarkan ID terbaru dan pembatasan 20 log teratas pada tampilan `src/screens/Login-logs.js`.
- **Layanan API**: Perbaikan import axios, dukungan konfigurasi IP/Port dari environment variabel Expo, penyesuaian baseUrl, serta pembersihan trailing/leading slash pada path request.
- **UI / Styling**: Penyesuaian padding vertikal pada header dashboard Super Admin.
- **Dokumentasi & Config**: Sinkronisasi referensi versi SDK di `AGENTS.md` ke v58.0.0 dan penambahan ignore `penting.md` di `.gitignore`.
