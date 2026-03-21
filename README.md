# Talons In Twilight
Talons in Twilight is a HOI4 Mod where a German Republic led Democratic Faction attempts to resist the crypto-fascist USA and their aims to become the dominant nation of the world, while both simultaneously seek to keep the communists of East Asia contained.

## Techstack

![skills](https://img.shields.io/badge/-HTML-FF0000?style=for-the-badge&logo=html5&logoColor=white&color=green)
![skills](https://img.shields.io/badge/-CSS-FF0000?style=for-the-badge&logo=css3&logoColor=white&color=indigo)
![skills](https://img.shields.io/badge/-TAILWIND_CSS-FF0000?style=for-the-badge&logo=tailwindcss&logoColor=white&color=22D3EE)
![skills](https://img.shields.io/badge/-REACT_JS-FF0000?style=for-the-badge&logo=react&logoColor=white&color=38BDF8)
![skills](https://img.shields.io/badge/-FIREBASE-FF0000?style=for-the-badge&logo=firebase&logoColor=white&color=FFA000)

## Documentation to view site locally
All is welcome to contribute to the code. Feel free to create a pull request and I will review it as soon as possible.
*Disclaimer: this documentation may not be totally correct. I may have missed some crucial steps. If problems arise while setting up the project, feel free to create an issue or contact me directly on the TiT Discord (@langlanggaming)*

### Prerequisites:
- A Windows, Mac, or Linux machine, Node.js, and a code editor (ideally Visual Studio Code). (Note that I do not have a Mac, only Windows and Linux, so I'm not sure if compatibility issues will arise, but to my knowledge it should work fine)
- Some knowledge of Git and terminal commands. 
- If you wish to make changes to the code, some basic knowledge of the listed frameworks is required.
- If you wish to hook up a custom Firebase SDK, some basic knowledge of the Firebase console and the Blaze Plan subscription is required.

### Install:

1) Clone the repo using ``git clone https://github.com/LangLangGaming/tit-wiki.git`` in a VSCode terminal, or Powershell/CMD. Alternatively, you may fork the repo, and then clone that forked repo if you wish to make changes and not touch the main code here. 
2) ``cd`` into the directory with ``index.html`` within if needed. It is very important where your cmd/Powershell or VSC is pointing at, because if ``index.html`` is inside a subfolder, the build will fail. In technical terms, the file should be in the project root.
3) Install required dependencies and compilers with ``npm install``, or ``bun install`` if you use bun.
4) ``npm run dev`` or ``bun run dev`` to start the development server

### To Hook Up A Custom Firebase SDK
*This is not detailed instruction, refer to the [official Firebase Documentation](https://firebase.google.com/docs) for more information.*
1) Create a new Firebase project, disabling both Gemini and Google Analytics
2) Register a new web app inside that project.
3) Replace the Firebase SDK inside ``firebase.config.js`` located inside the ``src/`` directory with the code that Firebase provided you with (It should look the same with the original one, but with different keys).
4) Inside ``firebase.config.js``, remember to import Firebase Auth, Firestore and Storage:
```
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
```
At the bottom of the file, remember to initialize and export these functions:
```
const auth = getAuth(app); 
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
```

5)   Enable Authentication, Firestore, and Storage inside your project. This requires Blaze Plan (which will only charge you if you go over the quota)
6)   Inside Firestore, create a new collection ``wikiPages``
7)   Inside Storage, create a new collection ``wikiImages``
8)   Lastly, remember to add the ``firebase.config.js`` to ``gitignore`` if you plan to PR directly to this repo to avoid overriding the changes here. You can skip this step if you're using your own fork or repo
