# prace-s-mongodb-a-mongoose
<img src="https://pics.awwmemes.com/switch-to-node-js-71535273.png" width="400">

Jak pracovat s MongoDB v NodeJS pomocí mongoose

## V nové verzi nodu 17.5.0 připojení nefunguje - dokud nebude fix, tak používejte verzi 17.4.0

###### Co bude potřeba
- ✔️ Udělat si účet [tady](https://www.mongodb.com/). [Zde](https://www.youtube.com/watch?v=rPqRyYJmx2g) k tomu máte tutoriál. Potom co budete mít cluster, tak si přehoďte connection string, který se nachází na `index.js:25` za svůj. To stejné platí pro soubor `nodemon.json` - dejte si tam svoje heslo. V lepším případě si doinstalujte [dotenv](https://www.npmjs.com/package/dotenv) a napište si heslo tam. Pro cipísky [tutoriál](https://www.coderrocketfuel.com/article/store-mongodb-credentials-as-environment-variables-in-nodejs) jak na to.
- ✔️ Ruce (nebo aspoň jednu ruku)
- ❌ Nohy

###### Základní potřebné commandy
- `npm start` - spustí server

PS: Frajeři vědí, že po clonování `npm i` je must-have
