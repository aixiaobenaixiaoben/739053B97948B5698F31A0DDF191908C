
cd ..
react-native bundle --entry-file index.js --platform android --dev false --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res

rm -rf android/app/build/outputs/apk/

cd android
./gradlew assembleRelease

echo "ARCHIVE ANDROID SUCCESS"
