import { FileMgr } from "@Utils/FileMgr";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const pageDir = '/public/page/'
let pageId = 0
export const usePageMgrStore = defineStore('page-mgr', _ => {
    const data = ref({
        expand: true,
        selItem: null,
        subs: {}
    })

    const isExpand = computed(_ => {
        return data.value.expand
    })
    function doExpand() {
        data.value.expand = !data.value.expand
    }
    const subs = computed(_ => {
        return data.value.subs
    })
    async function readPageList() {
        let plist = await FileMgr.readDir(pageDir)
        plist.forEach(pname => {
            data.value.subs[pname] = {
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
        let pNames = Object.keys(data.value.subs)
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
        .then(_ => setSel(data.value.subs[pname]))
    }
    function setSel(item) {
        let selItem = data.value.selItem
        if (selItem === item) return false
        if (selItem) {
            selItem.isSel = false
        }
        if (item) {
            item.isSel = true
        }
        data.value.selItem = item
        return true
    }
    function delSel() {
        let selItem = data.value.selItem
        if (!selItem) return

        FileMgr.delFile(pageDir + selItem.name)
        delete data.value.subs[selItem.name]

        setSel(Object.values(data.value.subs)[0])
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