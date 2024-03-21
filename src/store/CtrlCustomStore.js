import MenuButton from "@WidgetMenu/MenuButton.vue";
import MenuItem from "@WidgetMenu/MenuItem.vue";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { FileMgr } from "@Utils/FileMgr";

const ctrlCfgPath = '/public/ctrl.json'
const ctrlCtorTempPath = '/src/template/CtrlCtor.template.js'
const ctrlCtorPath = '/src/Utils/CtrlCtor.js'
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
                    delCb: param => delCtrl(param?.name)
                }
            }
        })
    }

    function addNewCtrl() {
        // 生成自定义控件名, 及其对应的属性
        let ctrlName = newCtrlName()
        let ctrlCfg = createCtrlCfg()
        ctrlCfg.name = ctrlName
        data[ctrlName] = {
            comp: MenuItem,
            name: ctrlName,
            attr: ctrlCfg,
            isSel: false,
            delCb: param => delCtrl(param?.name)
        }
    
        // 保存配置
        saveCtrlCfg()
    
        // 生成自定义控件的 creator 函数代码
        genCreator()
    
        // 生成自定义控件组件代码;
    }

    function delCtrl(name) {
        // data中删除name
        delete data[name]

        // 保存配置
        saveCtrlCfg()

        // 重新生成 creator 函数代码
        genCreator()

        // 删除自定义控件组件代码
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

    function genCreator() {
        let str1 = '{'
        let str2 = ''
        for (let key in data) {
            if (key === 'addBtn') continue
            str1 += `\n    ${key}: create${key},`

            str2 += `\nfunction create${key}(type) {`
            str2 += '\n    let item = getCommon(type)'
            str2 += '\n    item.rect = { x: 0, y: 0, w: 100, h: 30 }'
            str2 += '\n    return item'
            str2 += '\n}'
        }
        str1 += '\n}'

        FileMgr.readFile(ctrlCtorTempPath)
        .then(template => {
            let rdata = template.replace("[/*{placeholder}*/]", str1)
                                .replace("{/*{placeholder}*/}", str2)
            FileMgr.saveFile(ctrlCtorPath, rdata)
        })
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

    }
}