import MenuButton from "@WidgetMenu/MenuButton.vue";
import MenuItem from "@WidgetMenu/MenuItem.vue";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { FileMgr } from "@Utils/FileMgr";
import { usePageDataStore } from "./PageMgrStore";
import { ctrlItemCtor } from "@Utils/CtrlMgr";

const pageData = usePageDataStore()

// 配置文件
const ctrlCfgPath = '/public/ctrl.json'

// 控件管理
const ctrlMgrTempPath = '/src/template/CtrlMgr.template.js'
const ctrlMgrPath = '/src/Utils/CtrlMgr.js'

// 模拟控件
const ctrlSimuTempPath = '/src/template/CtrlSimu.template.vue'
const ctrlSimuDir = '/src/WidgetSimu/Custom/Simu'

// 控件
const ctrlCusTempPath = '/src/template/CtrlCus.template.vue'
const ctrlCusDir = '/src/WidgetCtrl/Custom/Ctrl'

export const useCtrlCustomStore = defineStore('ctrl-custom', _ => {
    const data = reactive({
        addBtn: {
            comp: MenuButton,
            name: '新建',
            clickCb: addNewCtrl,
        },
    })

    function init() {
        FileMgr.readFile(ctrlCfgPath)
        .then(clist => {
            clist = JSON.parse(clist)
            for (let key in clist) {
                let item = clist[key]
                data[key] = {
                    comp: MenuItem,
                    name: key,
                    attr: item.attr,
                    isSel: false,
                    clickCb: addCtrlItem,
                    delCb: param => delCtrl(param?.name)
                }
            }
        })
    }

    function addNewCtrl() {
        // 生成自定义控件名, 及其对应的属性
        let ctrlName = newCtrlName()
        let ctrlCfg = createCtrlCfg()
        ctrlCfg.type = ctrlName
        data[ctrlName] = {
            comp: MenuItem,
            name: ctrlName,
            attr: ctrlCfg,
            isSel: false,
            delCb: param => delCtrl(param?.name)
        }
    
        // 保存配置
        saveCtrlCfg()
    
        // 生成自定义控件模拟组件代码;
        genCtrlSimu(ctrlName)

        // 生成自定义控件组件代码
        genCtrlCus(ctrlName)
        
        // 生成自定义控件的 creator 函数代码
        genCtrlMgr()
    }

    function delCtrl(name) {
        // data中删除name
        delete data[name]

        // 保存配置
        saveCtrlCfg()

        // 重新生成 creator 函数代码
        genCtrlMgr()

        // 删除自定义控件模拟组件代码
        let simuPath = ctrlSimuDir + name + '.vue'
        FileMgr.delFile(simuPath)

        // 删除自定义控件组件代码
        let ctrlPath = ctrlCusDir + name + '.vue'
        FileMgr.delFile(ctrlPath)
    }

    function saveCtrlCfg() {
        let ctrls = {}
        for (let key in data) {
            if (key === 'addBtn') continue
            let item = data[key]
            ctrls[key] = {
                name: item.name,
                attr: item.attr,
            }
        }
        FileMgr.saveFile(ctrlCfgPath, JSON.stringify(ctrls, null, '  '))
    }

    function genCtrlMgr() {
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
        str += ''

        FileMgr.readFile(ctrlMgrTempPath)
        .then(template => {
            let rdata = template.replace("[/*{placeholder}*/]", str)
            FileMgr.saveFile(ctrlMgrPath, rdata)
        })
    }

    function genCtrlSimu(ctrlName) {
        FileMgr.readFile(ctrlSimuTempPath)
        .then(template => {
            let str = JSON.stringify(data[ctrlName].attr, null, '  ')
            let rdata = template.replace("[/*{placeholder}*/]", str)
            let fname =  ctrlSimuDir + ctrlName + '.vue'
            FileMgr.saveFile(fname, rdata)
        })
    }
    function genCtrlCus(ctrlName) {
        FileMgr.readFile(ctrlCusTempPath)
        .then(template => {
            let mainName = data[ctrlName].attr.main
            let str = JSON.stringify({
                type: ctrlName,
                main: ctrlItemCtor(mainName)
            }, null, '  ')
            let rdata = template.replace("[/*{placeholder}*/]", str)
            let fname = ctrlCusDir + ctrlName + '.vue'
            FileMgr.saveFile(fname, rdata)
        })
    }

    function addCtrlItem(item) {
        pageData.addItem(item.name)
    }

    let ctrlId = 0
    function newCtrlName() {
        let cNames = Object.keys(data).slice(1)
        while (true) {
            let cname = `CtrlCus_${ctrlId++}`
            if (!cNames.includes(cname)) return cname
        }
    }

    return {
        data,
        init,
    }
})

function createCtrlCfg() {
    return {
        mainType: 'Panel',
        main: ctrlItemCtor('Panel')
    }
}