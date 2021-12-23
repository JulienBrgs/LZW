const path = require('path');
const fs = require("fs");
const lzw = require("node-lzw");

const config = {
    algorithmes: [
        { name: "LZW", encode: lzw.encode, decode: lzw.decode },
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

config.samples.forEach(async (sample) => {
    await readSample(sample.file)
        .then(data => {
            console.log(`[SAMPLE] ${sample.type} : ${sample.file}`);
            console.log(`[DATA]`);
            console.log(`Prévisualisation	: ${(data.length <= 255) ? data : "Impossible de prévisualiser plus de 255 octets ..."}`);
            console.log(`Taille			: ${data.length} octets`);
            console.log(`------------------------------------------------------`);
            config.algorithmes.forEach(algo => {
                console.log(`Algorithme     : ${algo.name}`);
                const encode = algo.encode(data);
                console.log(`Prévisualisation	: ${(encode.length <= 255) ? encode : "Impossible de prévisualiser plus de 255 octets ..."}`);
                console.log(`Taille			: ${encode.length} octets`);
                console.log(`Ratio de compression	: ${((1 - (encode.length / data.length)) * 100).toFixed(2)} %`);
                console.log(`------------------------------------------------------`);
            });
            console.log(``);
        })
        .catch(error => {
            throw new Error(error)
        });
});

// console.log(config);