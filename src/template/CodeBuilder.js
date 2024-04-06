import { FileMgr } from "@Utils/FileMgr"

export const CodeBuilder = {
    buildCtrlSimu,
    delCtrlSimu,
    buildCtrlCus,
    delCtrlCus,
    buildCtrlMgr,
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