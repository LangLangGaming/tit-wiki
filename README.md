# Talons In Twilight
Talons in Twilight is a HOI4 Mod where a German Republic led Democratic Faction attempts to resist the crypto-fascist USA and their aims to become the dominant nation of the world, while both simultaneously seek to keep the communists of East Asia contained.

This project uses a React + Vite setup, and Firebase as the main auth/backend provider. 

**This site is still in extremely early stages of development. Hence, as the codebase grows, entire parts might be rewritten for optimization purposes. The code might look crap now, since most of it was very quickly written in a few weeks (with substantial help from AI), but as the site grows, many aspects of this site will change too. **

## Update: Breaking Changes to Styling 
When the site was first written, only vanila CSS and PostCSS were used since I was most familiar with those frameworks and the goal was to push a working version of the website out to the developers in the shortest time possible. However. as the site grows, the CSS has spiraled out of control. Each component becomes tangled in layers of CSS across multiple files, and development is becoming painful as every new component often breaks existing CSS and patches have to be applied. Additionally, the CSS has become a tangled mess of wires. Every patch and fix becomes harder as the errors are often nested in deep parTherets of the code, and requires countless hours and a lot of AI, sometimes just to fix one misaligned text. 

The best solution is a complete refactor of the CSS. Replacing it will be TailwindCSS, a mobile-first CSS library that solves all problems that normal CSS alone could not solve. However, normal CSS cannot be wholly eliminated, as EditorJS, to my knowledge, only supports normal CSS. Replacing everything else will take some time, and this README will be updated accordingly. During this time, website downtime might increase as deployment errors might happen, and inconsistencies with the UI design might be visible. 

## How to view the site
*This is a very simplified instruction, as I do not know if I have missed any steps. In the unfortunate event that I do, please do shoot me a message, so that I may fix the error. (Or, you could just make a PR but I'm not sure if you can edit this README file or not.)*
This project requires Node.js, which you can find [here](https://nodejs.org/en/download)
1) First, clone the repo using ```git clone```
2) In the project root, run ```npm install``` to download the dependencies required. 
3) ```npm run dev``` to start a local development server on localhost.

