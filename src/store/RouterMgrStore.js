import { FileMgr } from "@Utils/FileMgr";
import MenuButton from "@WidgetMenu/MenuButton.vue";
import MenuItemRouter from "@WidgetMenu/MenuItemRouter.vue";
import { defineStore } from "pinia";
import { reactive } from "vue";

const urlPrefix = '/url'
let urlId = 0
const urlCfgPath = '/public/router.json'
const codeTempPath = '/src/template/router.template.js'
const codePath = '/src/router/index.js'
export const useRouterMgrStore = defineStore('router-mgr', _ => {
    const data = reactive({
        addBtn: {
            comp: MenuButton,
            name: '新建',
            clickCb: addRouter,
        }
    })

    function init() {
        reset()
        FileMgr.readFile(urlCfgPath)
        .then(rlist => {
            rlist = JSON.parse(rlist)
            for (let key in rlist) {
                let item = rlist[key]
                data[key] = {
                    comp: MenuItemRouter,
                    url: item.url,
                    page: item.page,
                    delCb: delRouter,
                }
            }
        })
    }
    function reset() {
        for (let key in data) {
            if (key !== 'addBtn') delete data[key]
        }
    }
    function saveRouter() {
        let routers = {}
        for (let key in data) {
            if (key === 'addBtn') continue
            let item = data[key]
            routers[key] = {
                url: item.url,
                page: item.page
            }
        }
        FileMgr.saveFile(urlCfgPath, JSON.stringify(routers, null, '  '))

        genRouter()
    }

    function genRouter() {
        let str = ''
        for (let key in data) {
            if (key === 'addBtn') continue
            let item = data[key]
            if (!item.page) continue
            let name = item.page.split('.')[0]
            str += '\n  {'
                + `\n    path: '${item.url}',`
                + `\n    name: '${name}',`
                + `\n    component: () => import('@WidgetPage/${name}.vue')`
                + `\n  },`
        }
        str += '\n'

        FileMgr.readFile(codeTempPath)
        .then(template => {
            let rdata = template.replace("[/*{placeholder}*/]", str)
            FileMgr.saveFile(codePath, rdata)
        })
    }

    function addRouter() {
        let url = genUrl()
        data[url] = {
            comp: MenuItemRouter,
            url: url,
            page: null,
            delCb: delRouter
        }
        saveRouter()
    }

    function delRouter(item) {
        delete data[item?.url]
        saveRouter()
    }

    function genUrl() {
        const urls = Object.keys(data)
        while (true) {
            let url = `${urlPrefix}-${urlId++}`
            if (!urls.includes(url)) return url
        }
    }

    return {
        data,
        init,
        saveRouter,
    }
})