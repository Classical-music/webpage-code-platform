import { FileMgr } from "@Utils/FileMgr"

export const ConfigMgr = {
    savePage,
    loadPageList,
    loadPage,
    delPage,

    saveCusCtrl,
    loadCusCtrlList,
    loadCusCtrl,
    delCusCtrl,

    saveRouter,
    loadRouter
}

// 保存页面
const pageObjDir = '/src/config/page/'
function savePage(cfgData) {
    let fname = pageObjDir + cfgData.name + '.json'
    let str = JSON.stringify(cfgData, (k, v) => {
        return k === 'isSelect' ? false : v
      }, '  ')
    return FileMgr.saveFile(fname, str)
}
// 获取页面列表
function loadPageList() {
    return FileMgr.readDir(pageObjDir)
}
// 加载页面
function loadPage(pageName) {
    let fname = pageObjDir + pageName + '.json'
    return FileMgr.readFile(fname)
           .then(pdata => JSON.parse(pdata))
}
// 删除页面
function delPage(pageName) {
    let fname = pageObjDir + pageName + '.json'
    return FileMgr.delFile(fname)
}

// 保存自定义控件
const cusCtrlCfgFile = '/src/config/ctrlCus.json'
function saveCusCtrl(cfgDatas) {
    return FileMgr.saveFile(cusCtrlCfgFile, JSON.stringify(cfgDatas, null, '  '))
}
// 获取自定义控件列表
function loadCusCtrlList() {
    return FileMgr.readDir(cusCtrlObjDir)
}
// 加载自定义控件
function loadCusCtrl() {
    return FileMgr.readFile(cusCtrlCfgFile)
        .then(str => JSON.parse(str))
}
function delCusCtrl(ctrlName) {
    let fname = cusCtrlObjDir + ctrlName + '.json'
    FileMgr.delFile(fname)
}

// 保存路由信息
function saveRouter(datas) {

}
// 加载路由信息
function loadRouter() {

}