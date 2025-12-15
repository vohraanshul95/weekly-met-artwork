{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // index.js\
import fs from 'fs';\
\
async function getRandomArtwork() \{\
  // Fetch all object IDs\
  const list = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');\
  const data = await list.json();\
  const ids = data.objectIDs;\
\
  // Pick a random ID\
  const randomID = ids[Math.floor(Math.random() * ids.length)];\
\
  // Fetch the artwork\
  const art = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/$\{randomID\}`)\
    .then(res => res.json());\
\
  // Descriptions\
  const artworkDescription = [art.objectName, art.medium, art.objectDate].filter(Boolean).join(' \'95 ');\
  const painterDescription = [art.artistDisplayName, art.artistDisplayBio].filter(Boolean).join(' \'97 ');\
\
  // Generate HTML\
  const html = `\
  <!DOCTYPE html>\
  <html>\
    <head><title>$\{art.title\}</title></head>\
    <body style="font-family:sans-serif; text-align:center; padding:2rem;">\
      <h1>$\{art.title\}</h1>\
      <p>$\{artworkDescription\}</p>\
      <p>$\{painterDescription\}</p>\
      <img src="$\{art.primaryImage\}" alt="$\{art.title\}" style="max-width:80%; height:auto; margin-top:1rem;">\
    </body>\
  </html>\
  `;\
\
  // Save HTML file to repo\
  fs.writeFileSync('index.html', html);\
  console.log('HTML page generated: index.html');\
\}\
\
getRandomArtwork();\
}