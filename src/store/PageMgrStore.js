import { FileMgr } from "@Utils/FileMgr";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

const pageDir = '/public/page/'
let pageId = 0
export const usePageMgrStore = defineStore('page-mgr', _ => {
    const data = reactive({
        expand: true,
        selItem: null,
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
    async function readPageList() {
        let plist = await FileMgr.readDir(pageDir)
        plist.forEach(pname => {
            data.subs[pname] = {
                name: pname,
                isSel: false,
            }
        })
    }
    function readPage(item) {
        let pname = pageDir + item.name
        return FileMgr.readFile(pname)
    }
    function genPname() {
        let pNames = Object.keys(data.subs)
        let pname = null
        while (true) {
            pname = `Page-${pageId++}.json`
            if (!pNames.includes(pname)) return pname
        }
    }
    function addPage(pageData) {
        // 生成文件名
        let pname = genPname()
        pageData.name = pname

        let ppname = pageDir + pname
        let str = JSON.stringify(pageData, null, '    ')
        FileMgr.saveFile(ppname, str)
        .then(readPageList)
        .then(_ => setSel(data.subs[pname]))
    }
    function setSel(item) {
        let selItem = data.selItem
        if (selItem === item) return false
        if (selItem) {
            selItem.isSel = false
        }
        if (item) {
            item.isSel = true
        }
        data.selItem = item
        return true
    }
    function delSel(pname) {
        let selItem = data.selItem
        FileMgr.delFile(pageDir + pname)

        if (selItem && pname === selItem.name) {
            setSel(null)
        }
        delete data.subs[pname]
    }

    return {
        isExpand,
        doExpand,
        subs,
        readPageList,
        readPage,
        addPage,
        setSel,
        delSel,
    }
})