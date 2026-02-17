# Talons In Twilight
Talons in Twilight is a HOI4 Mod where a German Republic led Democratic Faction attempts to resist the crypto-fascist USA and their aims to become the dominant nation of the world, while both simultaneously seek to keep the communists of East Asia contained.

This project uses a React + Vite setup, and Firebase as the main auth/backend provider. 

**This site is still in extremely early stages of development. Hence, as the codebase grows, entire parts might be rewritten for optimization purposes. The code might look crap now, since most of it was very quickly written in a few weeks (with substantial help from AI), but as the site grows, many aspects of this site will change too. **

## DEVELOPMENT DIARY (7/2/26)
I am currently about to embark on possibly the biggest refactor of my life. Initially, this site was built using regular CSS, to save time, but as the site and its components grew, the CSS started spiraling out of control, and became a liability more than a styling tool. Every time I added or modified component styling, it was essentially finding a needle in a haystack as I struggled to work around the existing CSS. To counter this, I have decided to begin the difficult process to migrate to TailwindCSS, a mobile-first CSS library that was way cleaner and easier to navigate. To prelude this, I have made some changes to the code structure, especially in the wiki section. Now, the most challenging part has arrived, the actual migration itself. 



## How to view the site
*This is a very simplified instruction, as I do not know if I have missed any steps. In the unfortunate event that I do, please do shoot me a message, so that I may fix the error. (Or, you could just make a PR but I'm not sure if you can edit this README file or not.)*
This project requires Node.js, which you can find [here](https://nodejs.org/en/download)
1) First, clone the repo using ```git clone```
2) In VSC, run ```npm run dev``` in the terminal. This will start a local development server, which is needed for dynamic sites like this.
