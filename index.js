const fs = require('fs');

async function getRandomArtwork() {
  const list = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
  const data = await list.json();
  const ids = data.objectIDs;

  const randomID = ids[Math.floor(Math.random() * ids.length)];

  const art = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`)
    .then(res => res.json());

  const artworkDescription = [art.objectName, art.medium, art.objectDate].filter(Boolean).join(' • ');
  const painterDescription = [art.artistDisplayName, art.artistDisplayBio].filter(Boolean).join(' — ');

  const html = `
  <!DOCTYPE html>
  <html>
    <head><title>${art.title}</title></head>
    <body style="font-family:sans-serif; text-align:center; padding:2rem;">
      <h1>${art.title}</h1>
      <p>${artworkDescription}</p>
      <p>${painterDescription}</p>
      <img src="${art.primaryImage}" alt="${art.title}" style="max-width:80%; height:auto; margin-top:1rem;">
    </body>
  </html>
  `;

  fs.writeFileSync('index.html', html);
  console.log('HTML page generated: index.html');
}

getRandomArtwork();
