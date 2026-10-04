import fs from 'fs';
import path from 'path';

// 1. Fix the Next 15 params promise unwrapping across all page.tsx
const basePath = path.join(process.cwd(), 'src/app/[locale]');

function fixParamsInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixParamsInDir(fullPath);
    } else if (entry.name === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(
        /export async function generateMetadata\(\{ params: \{ locale \} \}: \{ params: \{ locale: string \} \}\) \{/g,
        'export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {\n  const { locale } = await params;'
      );
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}
fixParamsInDir(basePath);

// 2. Restore missing translation keys for Home and AttGora components
const oldKeys = {
  Home: {
    title: "Välkommen till Kämpabo",
    subtitle: "En fridfull oas i hjärtat av Småland",
    cta: "Se våra boenden"
  },
  AttGoraComp: {
    title: "Att Göra i Närheten",
    description: "Upptäck Smålands natur och spännande aktiviteter.",
    isaberg: "Isaberg Mountain Resort",
    highChaparral: "High Chaparral",
    storeMosse: "Store Mosse Nationalpark",
    anderstorp: "Anderstorp Raceway"
  }
};

['sv', 'en', 'de'].forEach(lang => {
  const file = path.join(process.cwd(), `messages/${lang}.json`);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.Home = oldKeys.Home;
    
    if (data.AttGora) {
      data.AttGora = { ...data.AttGora, ...oldKeys.AttGoraComp };
    } else {
      data.AttGora = oldKeys.AttGoraComp;
    }
    
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  }
});

console.log('Fixed params and restored missing translations');
