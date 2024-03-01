import axios from "axios"

export const CONN = {
    loadLocalFile: _ => {
      window.sendToMain.saveFile()
    }, //loadLocalFile,
    saveFile: (pname, str) => {
      window.sendToMain.saveFile(pname, str)
    },
}

async function loadLocalFile(pname) {
    return axios.get(pname)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}
