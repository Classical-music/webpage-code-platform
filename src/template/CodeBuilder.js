import { FileMgr } from "@Utils/FileMgr"

export const CodeBuilder = {
    buildCtrlPage,
    delCtrlPage,
    buildRouter,
    buildCtrlSimu,
    delCtrlSimu,
    buildCtrlCus,
    delCtrlCus,
    buildCtrlMgr,
}

// 页面组件
const ctrlPageTmplate = '/src/template/CtrlPage.template.vue'
const ctrlPageObjDir = '/src/WidgetPage/'
function buildCtrlPage(cfgData) {
    FileMgr.readFile(ctrlPageTmplate)
    .then(tempData => {
        let str = JSON.stringify(cfgData, null, '  ')
        let rdata = tempData.replace('[/*{placeholder}*/]', str)
        let fname = ctrlPageObjDir + cfgData.name + '.vue'
        FileMgr.saveFile(fname, rdata)
    })
}
function delCtrlPage(pageName) {
    FileMgr.delFile(ctrlPageObjDir + pageName + '.vue')
}

// Page 路由
const routerTemplate = '/src/template/router.template.js'
const routerObjFile = '/src/router/index.js'
function buildRouter(datas) {
    let str = ''
    for (let key in datas) {
        if (key === 'addBtn') continue
        let item = datas[key]
        if (!item.page) continue
        let name = item.page.split('.')[0]
        str += '\n  {'
             + `\n    path: '${item.url}',`
             + `\n    name: '${name}',`
             + `\n    component: () => import('@WidgetPage/${name}.vue')`
             + `\n  },`
    }
    str += '\n'

    FileMgr.readFile(routerTemplate)
    .then(tempData => {
        let rdata = tempData.replace('[/*{placeholder}*/]', str)
        FileMgr.saveFile(routerObjFile, rdata)
    })
}

// 自定义控件: 模拟控件组件
const ctrlSimuTmplate = '/src/template/CtrlSimu.template.vue'
const ctrlSimuObjDir = '/src/WidgetSimu/Custom/Simu'
function buildCtrlSimu(ctrlName, data) {
    FileMgr.readFile(ctrlSimuTmplate)
    .then(tempData => {
        let str = JSON.stringify(data, null, '  ')
        let rdata = tempData.replace('[/*{placeholder}*/]', str)
        let fname = ctrlSimuObjDir + ctrlName + '.vue'
        FileMgr.saveFile(fname, rdata)
    })
}
function delCtrlSimu(ctrlName) {
    FileMgr.delFile(ctrlSimuObjDir + ctrlName + '.vue')
}

// 自定义控件: 控件组件
const ctrlCusTemplate = '/src/template/CtrlCus.template.vue'
const ctrlCusObjDir = '/src/WidgetCtrl/Custom/Ctrl'
function buildCtrlCus(ctrlName, data) {
    FileMgr.readFile(ctrlCusTemplate)
    .then(tempData => {
        let str = JSON.stringify(data, null, '  ')
        let rdata = tempData.replace('[/*{placeholder}*/]', str)
        let fname = ctrlCusObjDir + ctrlName + '.vue'
        FileMgr.saveFile(fname, rdata)
    })
}
function delCtrlCus(ctrlName) {
    FileMgr.delFile(ctrlCusObjDir + ctrlName + '.vue')
}

// 自定义控件: 创建函数
const ctrlMgrTemplate = '/src/template/CtrlMgr.template.js'
const ctrlMgrObjFile = '/src/Utils/CtrlMgr.js'
function buildCtrlMgr(data) {
    let str = ''
    for (let key in data) {
        if (key === 'addBtn') continue
        str += `function create${key}() {`
        str += `\n    let item = getCommon('${key}')`
        str += '\n    item.rect = { x: 0, y: 0, w: 100, h: 30 }'
        str += '\n    return item'
        str += '\n}'
        str += `\nCtrlMgr['${key}'] = {`
        str += `\n    itemCtor: create${key},`
        str += `\n    compCtrl: _ => import('@WidgetCtrl/Custom/Ctrl${key}.vue'),`
        str += `\n    compSimu: _ => import('@WidgetSimu/Custom/Simu${key}.vue'),`
        str += '\n}\n\n'
    }

    FileMgr.readFile(ctrlMgrTemplate)
    .then(tempData => {
        let rdata = tempData.replace('[/*{placeholder}*/]', str)
        FileMgr.saveFile(ctrlMgrObjFile, rdata)
    })
}