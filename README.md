# LegalChain Mobile

This is the mobile application for the **LegalChain** platform — an AI-powered legal document generation and analysis tool. The app is built with Expo + React Native and delivers a native iOS and Android experience, combining a WebView shell of the web platform with native capabilities like document scanning, biometric signing, and file uploads.

---

## 📁 Project Structure
```
LegalChainMobile/
│
├── src/
│   ├── app/                    # Root navigation and app entry
│   │   ├── App.tsx
│   │   ├── navigation.tsx
│   │   ├── linking.ts
│   │   └── routes.ts
│   │
│   ├── assets/                 # Icons, images, splash screens
│   │
│   ├── components/             # Shared UI components
│   │   ├── Loading.tsx
│   │   ├── ErrorState.tsx
│   │   ├── PrimaryButton.tsx
│   │   └── Header.tsx
│   │
│   ├── config/                 # Environment, constants, feature flags
│   │   ├── env.ts
│   │   ├── constants.ts
│   │   └── featureFlags.ts
│   │
│   ├── native-bridge/          # WebView <-> Native communication
│   │   ├── bridge.ts
│   │   ├── injected.ts
│   │   ├── types.ts
│   │   └── handlers/
│   │       ├── biometric.ts
│   │       └── upload.ts
│   │
│   ├── screens/                # Native screens
│   │   ├── WebShell/           # WebView wrapper (main shell)
│   │   ├── Scan/               # Document scanner
│   │   ├── Upload/             # File upload pipeline
│   │   ├── Analysis/           # Analysis status + results
│   │   ├── Settings/
│   │   └── Dev/                # Dev tools (debug only)
│   │
│   ├── services/               # Business logic and API calls
│   │   ├── api/                # Fetch client and endpoints
│   │   ├── auth/               # Session and token management
│   │   ├── documents/          # Upload and hashing
│   │   ├── scanning/           # Scanner abstraction
│   │   ├── biometrics/         # Face ID / Touch ID
│   │   ├── analysis/           # Trigger, poll, fetch results
│   │   └── storage/            # Secure store and file cache
│   │
│   └── utils/                  # Shared utilities (logger, etc.)
│
├── scripts/                    # Build and maintenance scripts
├── .env.example                # Example environment config
├── app.json                    # Expo app configuration
├── index.ts                    # App entry point
├── package.json                # Project metadata and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## ✅ Features

- 🌐 **WebShell** — Loads the full Legal Chain web app via WebView
- 📄 **Document Scanning** — Native multi-page scanner with edge detection
- 📤 **File Upload Pipeline** — Unified upload for scan output, file picker, and share sheet
- 🧠 **Analysis Integration** — Trigger analysis, poll status, view results natively
- 🔐 **Biometric Signing** — Face ID / Touch ID signing bridge
- 🔗 **Deep Linking** — Navigate WebView to specific URLs from native screens
- 📱 **iOS + Android** — Single codebase targeting both platforms via Expo

---

## 🔧 Setup Instructions

### 1. Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (LTS version) — [nodejs.org](https://nodejs.org)
- **Expo CLI** — `npm install -g expo-cli`
- **EAS CLI** — `npm install -g eas-cli`
- **Watchman** (macOS only) — `brew install watchman`
- **Xcode** (iOS — macOS only) — via Mac App Store
- **Android Studio** (Android) — [developer.android.com](https://developer.android.com/studio)

### 2. Clone the Repository
```bash
git clone git@github.com:LegalChainInc/LegalChainMobile.git
cd LegalChainMobile
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables
```bash
cp .env.example .env
```

Then update `.env` with the appropriate URLs:
```env
# For local development (requires frontend running locally)
EXPO_PUBLIC_WEB_URL=http://localhost:3000
EXPO_PUBLIC_API_BASE_URL=http://localhost:5000

# For production
EXPO_PUBLIC_WEB_URL=https://legalcha.in/beta
EXPO_PUBLIC_API_BASE_URL=https://legalchainbackend.onrender.com
```

### 5. Start the Development Server
```bash
npx expo start
```

Then press:
- **`i`** to open the iOS Simulator (macOS + Xcode required)
- **`a`** to open the Android Emulator (Android Studio required)
- **`r`** to reload the app
- **`Ctrl + C`** to stop the server

---

## 📱 Running on a Physical Device

Install the **Expo Go** app on your phone:
- [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
- [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

Then scan the QR code shown in the terminal after running `npx expo start`.

---

## 🏗️ Building for Production

This project uses **EAS Build** for production builds.

**iOS (TestFlight):**
```bash
eas build --platform ios
```

**Android (Play Internal Track):**
```bash
eas build --platform android
```

**Both platforms:**
```bash
eas build --platform all
```

---

## 🧪 Running Checks
```bash
# Check for Expo configuration issues
npx expo-doctor

# Lint the codebase
npm run lint
```

---

## 🌐 API Endpoints

The mobile app communicates with the Legal Chain backend:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User authentication |
| POST | `/api/docs/upload` | Upload a document |
| GET | `/api/docs/list` | List user documents |
| POST | `/api/ai/analyze` | Trigger document analysis |
| POST | `/api/sign/init` | Initialize biometric signing |
| POST | `/api/sign/complete` | Complete signing with proof |

---

## 🛠 Tools & Technologies

- **React Native** + **Expo SDK 55**
- **TypeScript**
- **React Navigation** (native stack)
- **react-native-webview** (WebShell)
- **expo-local-authentication** (Face ID / Touch ID)
- **expo-secure-store** (token storage)
- **expo-camera** + **react-native-document-scanner-plugin** (scanning)
- **expo-file-system** + **expo-document-picker** (file handling)
- **EAS Build** (cloud builds for iOS + Android)

---

## 👥 Team & Responsibilities

| Member | Focus Area |
|--------|------------|
| Hammad | Mobile architecture, native bridge, upload pipeline |
| Miheer | Product oversight, sprint lead |
| Giriraj | Results UI, WebShell integration |
| Adi | Form UX, analysis entrypoints |
| Sweta | Backend integration, auth |

---

## 🚀 Deployment

- **iOS** — Distributed via TestFlight
- **Android** — Distributed via Play Internal Track
- **Production frontend** — [legalcha.in/beta](https://legalcha.in/beta)
- **Backend** — Hosted on [Render](https://legalchainbackend.onrender.com)
