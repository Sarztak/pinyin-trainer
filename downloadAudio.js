const fs = require('fs');
const https = require('https');
const path = require('path');

// Read deck.js file
const deckFilePath = path.join(__dirname, 'deck.js');
const deckFileContent = fs.readFileSync(deckFilePath, 'utf8');

// Extract the deckData array from the file
const match = deckFileContent.match(/const deckData = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not find deckData in deck.js');
    process.exit(1);
}

const deckData = eval(match[1]);

console.log(`Found ${deckData.length} cards in deck.js\n`);

// Create audio directory if it doesn't exist
const audioDir = path.join(__dirname, 'audio');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir);
}

function getFilename(hanzi) {
    // Use hanzi directly as filename (e.g., "我.mp3", "你.mp3")
    return hanzi + '.mp3';
}

function downloadAudio(hanzi) {
    return new Promise((resolve, reject) => {
        const filename = getFilename(hanzi);
        const filepath = path.join(audioDir, filename);
        
        // Check if file already exists
        if (fs.existsSync(filepath)) {
            console.log(`✓ Already exists: ${hanzi} (${filename})`);
            resolve();
            return;
        }
        
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encodeURIComponent(hanzi)}`;
        
        console.log(`Downloading: ${hanzi} → ${filename}...`);
        
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${hanzi}: ${response.statusCode}`));
                return;
            }
            
            const fileStream = fs.createWriteStream(filepath);
            response.pipe(fileStream);
            
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`✓ Downloaded: ${hanzi} → ${filename}`);
                resolve();
            });
            
            fileStream.on('error', (err) => {
                fs.unlink(filepath, () => {});
                reject(err);
            });
        }).on('error', reject);
    });
}

async function downloadAll() {
    console.log(`Starting download of ${deckData.length} audio files...\n`);
    
    for (let i = 0; i < deckData.length; i++) {
        const card = deckData[i];
        try {
            await downloadAudio(card.hanzi);
            await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
            console.error(`✗ Error downloading ${card.hanzi}:`, error.message);
        }
    }
    
    console.log('\nDownload complete!');
}

downloadAll();