import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import MenuButton from "@WidgetMenu/MenuButton.vue";
import MenuItem from "@WidgetMenu/MenuItem.vue";
import { ctrlItemCtor } from "@Utils/CtrlMgr";
import { CodeBuilder } from "@template/CodeBuilder";
import { ConfigMgr } from "@config";

// Page 菜单
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
    plist.forEach((file) => {
      let pname = file.split(".")[0];
      data[pname] = {
        comp: MenuItem,
        name: pname,
        isSel: false,
        clickCb: (param) => PageMgr.selPage(param?.name),
        delCb: (param) => PageMgr.delPage(param?.name),
      };
    });
  }

  function reset() {
    for (let key in data) {
      if (key !== "addBtn") delete data[key];
    }
  }

  function isSel(pageName = null) {
    if (!pageName) return false;
    return selItem.value?.name === pageName ? true : false;
  }

  function selPage(pageName) {
    let item = data[pageName] ?? null;
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
      if (key === "addBtn") continue;
      plist.push(key);
    }
    return plist;
  }

  return {
    data,
    init,
    pageList,
    isSel,
    selPage,
    delPage,
  };
});

// 当前 Page 数据
export const usePageDataStore = defineStore("page-data", (_) => {
  let value = reactive({
    page: null,
    selItem: null,
    editPage: null,
  });

  const page = computed(_ => value.page)

  const editPage = computed(_ => value.editPage)

  const selItem = computed(_ => value.selItem)

  function setSelItem(item = null) {
    if (value.selItem) {
      value.selItem.isSelect = false;
    }

    value.selItem = item;
    if (value.selItem) {
      value.selItem.isSelect = true;
    }
  }

  function resetPage(page = null) {
    if (page) value.page = page;
    else value.page = ctrlItemCtor("Page");
    setSelItem(value.page);
  }

  function closePage() {
    value.page = null;
    setSelItem(value.page);
  }

  function editCusCtrl(ctrlData) {
    let editPage = ctrlItemCtor("EditPage")
    editPage.setCusCtrl(ctrlData.type, ctrlData.main)
    setSelItem(ctrlData.main)
    value.editPage = editPage
  }

  function closeEditPage() {
    value.editPage = null
  }

  function hasChild(item) {
    return item && item.addChild;
  }

  function addItem(type) {
    let parent = value.selItem;
    console.log(parent);
    if (!hasChild(parent)) parent = value.page;
    if (!hasChild(parent)) {
      console.warn(`无法添加控件`);
      return;
    }

    let item = ctrlItemCtor(type);
    if (item) {
      parent.addChild(item);
    }
  }

  return {
    page,
    editPage,
    closeEditPage,
    selItem,
    setSelItem,
    resetPage,
    closePage,
    editCusCtrl,
    addItem,
  };
});

// Page 管理
export const PageMgr = {
  pageInit,
  selPage,
  addNewPage,
  savePage,
  closePage,
  delPage,
  closeEditPage,
};

const pageMenu = usePageMenuStore();
const pageData = usePageDataStore();

function pageInit(selName) {
  // 读文件，获取当前Page列表
  ConfigMgr.loadPageList().then((plist) => {
    // 更新PageMenu
    pageMenu.init(plist);
    if (plist.length <= 0) return;
    // 设置默认选中项
    if (!selName) selName = plist[0].split(".")[0];
    PageMgr.selPage(selName);
  });
}
function selPage(pageName) {
  // 设置PageMenu的选中项
  pageMenu.selPage(pageName);
  // 读取当前Page页代码, 更新到PageData
  ConfigMgr.loadPage(pageName).then((pdata) => pageData.resetPage(pdata));
}
function addNewPage() {
  // 生成文件名
  let pageName = newPageName();
  // 生成基础数据
  let pdata = ctrlItemCtor("Page");
  pdata.name = pageName;

  // 保存Page
  PageMgr.savePage(pdata).then((_) => pageInit(pageName));
}
function savePage(pdata = null) {
  // 从 PageData 中读取配置数据
  if (!pdata) pdata = pageData.page;

  // 生成Page组件代码
  CodeBuilder.buildCtrlPage(pdata);

  // 保存Page配置文件
  return ConfigMgr.savePage(pdata);
}
function closePage() {
  // 关闭PageData
  pageData.closePage();
  // 设置PageMenu当前选中项为空
  pageMenu.selPage();
}
function delPage(pageName) {
  if (pageMenu.isSel(pageName)) {
    pageData.closePage();
  }

  // PageMenu删除文件
  pageMenu.delPage(pageName);

  // 删除Page组件文件
  CodeBuilder.delCtrlPage(pageName);

  // 删除Page配置文件
  ConfigMgr.delPage(pageName);
}

function closeEditPage() {
  pageData.closeEditPage()
}

let pageId = 0;
function newPageName() {
  let pNames = pageMenu.pageList();
  while (true) {
    let pname = `Page-${pageId++}`;
    if (!pNames.includes(pname)) return pname;
  }
}
