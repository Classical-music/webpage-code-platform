import MenuButton from "@WidgetMenu/MenuButton.vue";
import MenuItem from "@WidgetMenu/MenuItem.vue";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { FileMgr } from "@Utils/FileMgr";
import { usePageDataStore } from "./PageMgrStore";
import { ctrlItemCtor } from "@Utils/CtrlMgr";
import { CodeBuilder } from "@template/CodeBuilder";

const pageData = usePageDataStore()

// 配置文件
const ctrlCfgPath = '/public/ctrl.json'

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
        CodeBuilder.buildCtrlSimu(ctrlName, data[ctrlName].attr)

        // 生成自定义控件组件代码
        CodeBuilder.buildCtrlCus(ctrlName, data[ctrlName].attr)
        
        // 生成自定义控件的 creator 函数代码
        CodeBuilder.buildCtrlMgr(data)
    }

    function saveCtrl(attr) {
        let ctrlName = attr.type
        data[ctrlName].attr = attr

        // 保存配置
        saveCtrlCfg()

        // 生成自定义控件模拟组件代码;
        CodeBuilder.buildCtrlSimu(ctrlName, data[ctrlName].attr)

        // 生成自定义控件组件代码
        CodeBuilder.buildCtrlCus(ctrlName, data[ctrlName].attr)
        
        // 生成自定义控件的 creator 函数代码
        CodeBuilder.buildCtrlMgr(data)
    }

    function delCtrl(name) {
        // data中删除name
        delete data[name]

        // 保存配置
        saveCtrlCfg()

        // 重新生成 creator 函数代码
        CodeBuilder.buildCtrlMgr(data)

        // 删除自定义控件模拟组件代码
        CodeBuilder.delCtrlSimu(name)

        // 删除自定义控件组件代码
        CodeBuilder.delCtrlCus(name)
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
        FileMgr.saveFile(ctrlCfgPath, JSON.stringify(ctrls, (k, v) => {
            return k === 'isSelect' ? false : v
        }, '  '))
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
        saveCtrl,
    }
})

function createCtrlCfg() {
    return {
        mainType: 'Panel',
        main: ctrlItemCtor('Panel')
    }
}