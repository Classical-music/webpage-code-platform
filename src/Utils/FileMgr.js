export const FileMgr = {
  readFile: (pname) => {
    return window.request.readFile(pname);
  },

  saveFile: (pname, str) => {
    return window.request.saveFile(pname, str);
  },

  delFile: (pname) => {
    return window.request.delFile(pname);
  },

  readDir: (dirName) => {
    return window.request.readDir(dirName);
  },
};
