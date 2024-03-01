import MenuItemVue from "@WidgetMenu/MenuItem.vue";
import { useDataSetStore } from "@store/DataSetStore";
import { useWidgetMenuStore } from "@store/WidgetMenuStore";

let dataSet = useDataSetStore()
export const FileMgr = {
  readFile: (pname) => {
    return window.request.readFile(pname);
  },

  saveFile: (pname, str) => {
    return window.request.saveFile(pname, str);
  },

  readDir: (dirName) => {
    return window.request.readDir(dirName);
  },

  savePage: (pageName) => {
    // 生成当前页的数据
    let str = JSON.stringify(dataSet.page, null, '    ')

    // 生产当前页的路径名
    let pname = `/public/page/${pageName}.json`

    // 将数据写入文件
    let ret = FileMgr.saveFile(pname, str)
    if (ret) {
      // 数据写入成功后, 刷新page列表
      FileMgr.loadPageList()
      alert(`文件 ${pname} 保存成功`)
    }
  },

  loadPage: async (pageName) => {
    // page页名字
    let pname = '/public/page/' + pageName
    // 读取page页数据
    let page = await FileMgr.readFile(pname)
    // 当数据设为当前页
    dataSet.resetPage(JSON.parse(page))
  },

  loadPageList: async () => {
    // 左侧菜单store
    let widgetMenu = useWidgetMenuStore()

    // 读page页目录, 获取文件列表
    let pageList = await FileMgr.readDir('/public/page/')

    // 置空page页列表
    widgetMenu.data.pageList.subs = []
    // 初始化page页列表
    pageList.forEach(file => {
      widgetMenu.data.pageList.subs.push({
            name: file,
            comp: MenuItemVue,
            // 点击该项是的回调, 加载该page页为当前页
            clickCb: _ => FileMgr.loadPage(file),
        })
    })
  }
};
