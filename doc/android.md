## ANDROID INSTRUCTIONS

###build for release
```
ionic build --release android
```

### sign the build
```
rm cervejame-tuc.apk && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore DOC/cervejametuc.keystore -storepass cervejame platforms/android/build/outputs/apk/android-release-unsigned.apk cervejame
```

### signed apk

```
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk cervejame-tuc.apk
```

##data used to generate key
```
keytool -genkey -v -keystore cervejametuc.keystore -alias cervejame -keyalg RSA -keysize 2048 -validity 10000
```


What is your first and last name?
[Jeferson Guardezi]:
What is the name of your organizational unit?
[cervejame]:
What is the name of your organization?
[cervejame]:
What is the name of your City or Locality?
[sp]:
What is the name of your State or Province?
[sp]:
What is the two-letter country code for this unit?
[BR]:
Is CN=Jeferson Guardezi, OU=cervejame, O=cervejame, L=sp, ST=sp, C=BR correct?
[no]:  yes
passwords : cervejame
