import fs from 'fs';
import path from 'path';

['sv', 'en', 'de'].forEach(lang => {
  const file = path.join(process.cwd(), `messages/${lang}.json`);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (data.AttGora) {
      if (data.AttGora.p4) {
        data.AttGora.p4 = data.AttGora.p4.replace(" Kulltorp. Guiden", " Kulltorp.\nGuiden");
      }
      if (data.AttGora.p5) {
        data.AttGora.p5 = data.AttGora.p5.replace(" till fots. På vår sida", " till fots.\nPå vår sida");
      }
      if (data.AttGora.p6) {
        data.AttGora.p6 = data.AttGora.p6.replace(" köra själv. Läs om", " köra själv.\nLäs om");
      }
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  }
});
console.log('Line breaks added to JSON files.');
