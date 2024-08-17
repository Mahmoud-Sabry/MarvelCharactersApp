# Marvel Characters App

This is a React Native application that interacts with the Marvel Characters API. The app displays a list of Marvel characters and allows users to view the comics in which they appear. The app supports pagination, and search functionality.

## Features

- **Login Screen**: Simple login screen with username: "admin" and password: "password".
- **Home Screen**: Displays a list of Marvel characters with pagination. Users can scroll to load more characters and search for specific characters by name.
- **Character Detail Screen**: Provides detailed information about a selected character, including their description and a list of comics they appear in.
- **Theme Support**: Light and dark themes are supported, allowing users to switch between them.
- **Localization**: The app supports English and Arabic languages.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 14.x)
- npm (>= 6.x)
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mahmoud-Sabry/MarvelCharactersApp
   cd marvel-characters-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. For iOS, install CocoaPods dependencies:

   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running the App

#### iOS

```bash
npx react-native run-ios
```

#### Android

```bash
npx react-native run-android
```

### State Management

State management in this app is handled using Redux Toolkit, which includes the following packages:

- **@reduxjs/toolkit**: "^2.2.7"
- **react-redux**: "^9.1.2"
- **redux**: "^5.0.1"

These libraries help manage the global state of the application, making it easier to maintain and scale.

## Libraries Used

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://github.com/axios/axios)
- [i18next](https://www.i18next.com/)
- [react-native-localize](https://github.com/zoontek/react-native-localize)
- [md5](https://github.com/pvorb/node-md5)
- [Lodash](https://lodash.com/)

## Acknowledgments

- [Marvel Developer Portal](https://developer.marvel.com/) for providing the API.
