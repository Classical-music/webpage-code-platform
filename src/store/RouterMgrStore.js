import { FileMgr } from "@Utils/FileMgr";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

let urlId = 0
export const useRouterMgrStore = defineStore('router-mgr', _ => {
    const data = reactive({
        expand: true,
        subs: {}
    })

    const isExpand = computed(_ => {
        return data.expand
    })
    function doExpand() {
        data.expand = !data.expand
    }
    const subs = computed(_ => {
        return data.subs
    })
    function init() {
        readRouter()
    }
    function genUrl() {
        const urls = Object.keys(data.subs)
        while (true) {
            let url = `/url-${urlId++}`
            if (!urls.includes(url)) return url
        }
        return '/url'
    }
    function addRouter() {
        let url = genUrl()
        data.subs[url] = {
            url: url,
            page: null
        }
    }
    function delRouter(url) {
        delete data.subs[url]
    }
    async function readRouter() {
        let fname = '/public/router.json'
        let readData = await FileMgr.readFile(fname)
        data.subs = JSON.parse(readData)
    }
    function saveRouter() {
        let str = JSON.stringify(data.subs, null, '    ')
        let fname = '/public/router.json'
        FileMgr.saveFile(fname, str)
        alert('保存成功')
    }

    return {
        isExpand,
        doExpand,
        subs,
        init,
        addRouter,
        delRouter,
        saveRouter,
    }
})