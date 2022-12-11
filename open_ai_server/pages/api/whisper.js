const { exec } = require("child_process");
import Formidable from "formidable-serverless";

import fs from "fs";
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function (
    req,
    res
) {
    //execute();
    return new Promise(async (resolve, reject) => {
        // console.log(obtenerArchivo("audio_1670702857784_657.mp3"))
        //eliminarArchivos("audio_1670702774246_724.mp3");
        const form = new Formidable.IncomingForm({
            multiples: true,
            keepExtensions: true,
        });

        form
            .on("file", (name, file) => {
                const data = fs.readFileSync(file.path);
                file.name = "audio.mp3";
                const name2 = file.name.split(".")[0] + "_" + Date.now() + "_" + Math.floor(Math.random() * 1000) + "." + file.name.split(".")[1];
                fs.writeFileSync(`public/${name2}`, data);
                fs.unlinkSync(file.path);
                const path = `public/${name2}`;
                console.log(path)
                exec("whisper " + path + " --language es  --model base ", (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                    }
                    const msg = postProcess(name2);
                    resolve(res.status(200).send({ message: "Generación exitosa", result:msg}));
                });

                //   fs.writeFileSync(`public/${file.name}`, data);
                // fs.unlinkSync(file.path);
            })
            .on("aborted", () => {
                reject(res.status(500).send('Aborted'))
            })


        await form.parse(req)
    });
}
function postProcess(name) {
    const data = obtenerArchivo(name);
    eliminarArchivos(name,"./");
    fs.unlinkSync("public/" + name);
    return data;
}
function obtenerArchivo(file) {
    const data = fs.readFileSync(file + ".txt");
    return data.toString();
}
function eliminarArchivos(name,path) {
    fs.readdirSync(path).forEach((file) => {
        if (file.includes(name)) {
            if (file.includes(name)) {
                fs.unlinkSync(file);
            }
        }

    });
}


