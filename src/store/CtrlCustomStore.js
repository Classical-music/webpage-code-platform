import MenuButton from "@WidgetMenu/MenuButton.vue";
import MenuItem from "@WidgetMenu/MenuItem.vue";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { usePageDataStore } from "./PageMgrStore";
import { ctrlItemCtor } from "@Utils/CtrlMgr";
import { CodeBuilder } from "@template/CodeBuilder";
import { ConfigMgr } from "@config";

const pageData = usePageDataStore()

// 配置文件

export const useCtrlCustomStore = defineStore('ctrl-custom', _ => {
    let cfgDatas = {}
    let data = reactive({
        addBtn: {
            comp: MenuButton,
            name: '新建',
            clickCb: addNew,
        },
    })

    function init() {
        return ConfigMgr.loadCusCtrl()
        .then(clist => {
            cfgDatas = clist
            reset()
            for (let key in clist) {
                let item = clist[key]
                let cname = item.type
                data[cname] = {
                    comp: MenuItem,
                    name: cname,
                    clickCb: addCtrlItem,
                    delCb: param => delCtrl(param?.name)
                }
            }
        })
    }

    function reset() {
        for (let key in data) {
            if (key !== 'addBtn') delete data[key]
        }
    }

    function addNew() {
        // 生成名称, 生成默认数据
        let ctrlName = newCtrlName()
        let ctrlCfg = createCtrlCfg()
        ctrlCfg.type = ctrlName

        cfgDatas[ctrlName] = ctrlCfg
        data[ctrlName] = {
            comp: MenuItem,
            name: ctrlName,
            clickCb: addCtrlItem,
            delCb: param => delCtrl(param?.name)
        }

        saveCtrlInteral(ctrlCfg)
        // 生成自定义控件的 creator 函数代码
        CodeBuilder.buildCtrlMgr(cfgDatas)
    }

    function saveCtrl(ctrlName, main) {
        let ctrlCfg = cfgDatas[ctrlName]
        ctrlCfg.main = main
        saveCtrlInteral(ctrlCfg)
    }

    function saveCtrlInteral(ctrlCfg) {
        // 生成模拟控件
        CodeBuilder.buildCtrlSimu(ctrlCfg)

        // 生成控件
        CodeBuilder.buildCtrlCus(ctrlCfg)
        
        // 保存配置
        ConfigMgr.saveCusCtrl(cfgDatas)
    }

    function delCtrl(name) {
        // 删除配置数据
        delete data[name]
        delete cfgDatas[name]

        // 重新保存配置
        ConfigMgr.saveCusCtrl(cfgDatas)

        // 重新生成 ctorMgr
        CodeBuilder.buildCtrlMgr(cfgDatas)

        // 删除模块控件
        CodeBuilder.delCtrlSimu(name)

        // 删除控件
        CodeBuilder.delCtrlCus(name)
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
        main: ctrlItemCtor('Panel'),
        attr: {}
    }
}