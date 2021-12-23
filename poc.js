const path = require('path');
const fs = require('fs');
const colors = require('colors/safe');

// Algorithmes
const lzw = require("./algorithmes/lzw.js");
const rle = require("./algorithmes/rle.js");
// const huffman = require("./algorithmes/huffman.js");

const config = {
    algorithmes: [
        { name: "Lempel-Ziv Welch", encode: lzw.encode, decode: lzw.decode },
        { name: "Run Length Encoding", encode: rle.encode, decode: rle.decode },
        // { name: "Huffman", encode: huffman.encode, decode: huffman.decode },
    ],
    samples_dir: "samples",
    samples: [
        { file: "sample.exe", type: "Executable" },
        { file: "sample.png", type: "Image" },
        { file: "sample.txt", type: "Texte" }
    ]
};

readSample = async (sample) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(config.samples_dir, sample), 'binary', (error, data) => {
            if (error) reject(error);
            else resolve(data);
        });
    });
};

config.samples.forEach(async sample => {
    await readSample(sample.file)
        .then(data => {
            console.log(`[${colors.magenta("SAMPLE")}] ${sample.type} (${sample.file})`);
            console.log(`Prévisualisation	: ${(data.length <= 255) ? data : "Impossible de prévisualiser plus de 255 octets ..."}`);
            console.log(`Taille			: ${data.length} octets`);
            config.algorithmes.forEach(algo => {
                console.log(`------------------------------------------------------`);
                console.log(`[${colors.blue("ALGORITHME")}] ${algo.name}`);
                let encode = algo.encode(data);
                console.log(`Prévisualisation	: ${(encode.length <= 255) ? encode : "Impossible de prévisualiser plus de 255 octets ..."}`);
                console.log(`Taille			: ${encode.length} octets`);
                console.log(`Taux de compression	: ${((1 - (encode.length / data.length)) * 100).toFixed(2)} %`);
            });
            console.log(``);
            console.log(``);
        })
        .catch(error => {
            throw new Error(error)
        });
});
