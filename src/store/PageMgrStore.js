import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { FileMgr } from "@Utils/FileMgr";
import { createCtrl, createPage } from "@Utils/CtrlCtor";
import MenuButton from "@WidgetMenu/MenuButton.vue";
import MenuItem from "@WidgetMenu/MenuItem.vue";

export const usePageMenuStore = defineStore("page-menu", (_) => {
  const selItem = ref(null);
  const data = reactive({
    addBtn: {
      comp: MenuButton,
      name: "新建",
      clickCb: PageMgr.addNewPage,
    },
  });

  function init(plist) {
    reset();
    plist.forEach(file => {
        let pname = file.split('.')[0]
        data[pname] = {
            comp: MenuItem,
            name: pname,
            isSel: false,
            clickCb: param => PageMgr.selPage(param?.name),
            delCb: param => PageMgr.delPage(param?.name),
        }
    })
}

  function reset() {
    for (let key in data) {
      if (key !== "addBtn") delete data[key];
    }
  }

  function isSel(pageName = null) {
    if (!pageName) return false
    return selItem.value?.name === pageName ? true : false
  }

  function selPage(pageName) {
    let item = data[pageName] ?? null
    if (item === selItem.value) return;
    if (selItem.value) {
      selItem.value.isSel = false;
    }

    if (item) {
      item.isSel = true;
    }
    selItem.value = item;
  }

  function delPage(pageName) {
    delete data[pageName];
  }

  function pageList() {
    let plist = [];
    for (let key in data) {
      if (key === "addBtn") continue
      plist.push(key);
    }
    return plist;
  }

  return {
    data,
    init,
    pageList,
    isSel, selPage, delPage,
  };
});

export const usePageDataStore = defineStore('page-data', _ => {
  let value = reactive({
      page: null,
      selItem: null
  })

  const page = computed(_ => {
      return value.page
  })

  const selItem = computed(_ => {
      return value.selItem
  })

  function setSelItem(item = null) {
      if (value.selItem) {
          value.selItem.isSelect = false
      }

      value.selItem = item
      if (value.selItem) {
          value.selItem.isSelect = true
      }
  }

  function resetPage(page = null) {
      if (page)
          value.page = page
      else
          value.page = createPage()
      setSelItem(value.page)
  }

  function closePage() {
      value.page = null
      setSelItem(value.page)
  }

  function addItem(type) {
      let parent = value.selItem
      if (!parent || !parent.subs) parent = value.page
      if (!parent || !parent.subs) {
          console.warn(`无法添加控件`)
          return
      }

      let item = createCtrl(type)
      if (item) {
        parent.subs.push(item)
      }
  }

  return {
      page,
      selItem,
      setSelItem,
      resetPage,
      closePage,
      addItem
  }
})

const pageCfgDir = '/public/page/'
const pageCompDir = '/src/WidgetPage/'
const pageCompTemp = '/src/template/CtrlPage.template.vue'

export const PageMgr = {
    pageInit,
    selPage,
    addNewPage,
    savePage,
    closePage,
    delPage,
}

const pageMenu = usePageMenuStore()
const pageData = usePageDataStore();

function pageInit(selName) {
    // 读文件，获取当前Page列表
    FileMgr.readDir(pageCfgDir)
    .then(plist => {
        // 更新PageMenu
        pageMenu.init(plist)
        if (plist.length <= 0) return
        // 设置默认选中项
        if (!selName) selName = plist[0].split('.')[0]
        PageMgr.selPage(selName)
    })
}
function selPage(pageName) {
    // 设置PageMenu的选中项
    pageMenu.selPage(pageName)
    // 读取当前Page页代码, 更新到PageData
    loadPageCfg(pageName)
}
function addNewPage() {
  // 生成文件名
  let pageName = newPageName()
  // 生成基础数据
  let pdata = createPage()
  pdata.name = pageName

  // 保存Page
  PageMgr.savePage(pdata)
  .then(_ => pageInit(pageName))
}
function savePage(pdata = null) {
  // 从PageData中读取配置数据
  if (!pdata) pdata = pageData.page

  // 保存Page代码
  savePageComp(pdata)

  // 保存Page配置文件
  return savePageCfg(pdata)
}
function closePage() {
    // 关闭PageData
    pageData.closePage()
    // 设置PageMenu当前选中项为空
    pageMenu.selPage()
}
function delPage(pageName) {
  if (pageMenu.isSel(pageName)) {
    pageData.closePage()
  }
  // PageMenu删除文件
  pageMenu.delPage(pageName)

  // 删除Page组件文件
  let pageComp = pageCompDir + pageName + '.vue'
  FileMgr.delFile(pageComp)
    
  // 删除Page配置文件
  let pageCfg = pageCfgDir + pageName + '.json'
  FileMgr.delFile(pageCfg)
}

function loadPageCfg(pageName) {
  let pathName = pageCfgDir + pageName + '.json';
  FileMgr.readFile(pathName).then((pdata) => {
    pageData.resetPage(JSON.parse(pdata));
  });
}
function savePageCfg(cfgData) {
  let pathName = pageCfgDir + cfgData.name + '.json'
  let str = JSON.stringify(cfgData, null, '  ')
  return FileMgr.saveFile(pathName, str)
}
function savePageComp(cfgData) {
  let str = JSON.stringify(cfgData, null, '  ')
  // 读取Page组件模板
  FileMgr.readFile(pageCompTemp).then(template => {
    // 模板变量替换
    let pdata = template.replace('[/*{placeholder}*/]', str)
    let pathName = pageCompDir + cfgData.name + '.vue'
    // 生成/保存Page组件
    FileMgr.saveFile(pathName, pdata)
  })
}
let pageId = 0;
function newPageName() {
  let pNames = pageMenu.pageList()
  while (true) {
    let pname = `Page-${pageId++}`;
    if (!pNames.includes(pname)) return pname;
  }
}
