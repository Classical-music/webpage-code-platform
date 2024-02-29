import axios from "axios"

export const CONN = {
    loadLocalFile: loadLocalFile,
    saveLocalFile: saveLocalFile
}

async function loadLocalFile(pname) {
    return axios.get(pname)
        .then(res => res.data)
        .catch(err => {
            console.log(err)
        })
}

async function saveLocalFile(data) {
    try {
      const opts = {
        types: [
          {
            description: '文件',
            accept: {
              'text/json': ['.json'],
            }
          }
        ],
        excludeAcceptAllOption: true
      };
  
      const handle = await showSaveFilePicker(opts); // 打开保存文件对话框
      const writable = await handle.createWritable(); // 创建可写入的文件对象
  
      // 在这里写入文件内容
      await writable.write(data);
      await writable.close();
      alert('success');
    } catch (error) {
      console.error('文件保存失败:', error);
    }
  }