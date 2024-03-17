import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { FileMgr } from "@Utils/FileMgr";
import { createPage, usePageDataStore } from "@store/PageDataStore"
import MenuButton from "@WidgetMenu/MenuButton.vue"
import MenuItem from "@WidgetMenu/MenuItem.vue"

const pageDir = '/public/page/'
let pageId = 0
export const usePageMgrStore = defineStore('page-mgr', _ => {
    const selItem = ref(null)
    const data = reactive({
        addBtn: {
            comp: MenuButton,
            name: '新建',
            clickCb: addPage,
        },
    })

    function init() {
        reset()
        FileMgr.readDir(pageDir)
        .then(plist => {
            plist.forEach(pname => {
                data[pname] = {
                    comp: MenuItem,
                    name: pname,
                    isSel: false,
                    clickCb: selPage,
                    delCb: delPage
                }
            })
        })

    }

    function reset() {
        for (let key in data) {
            if (key !== 'addBtn') delete data[key]
        }
    }

    function addPage() {
        let pname = genPname()
        let pdata = createPage()
        pdata.name = pname

        let ppname = pageDir + pname
        let str = JSON.stringify(pdata, null, '    ')
        FileMgr.saveFile(ppname, str)
        .then(init)
        .then(_ => selPage(data[pname]))
        .then(_ => {
            genCode(pname)
        })
    }

    function selPage(item) {
        if (item === selItem.value) return
        if (selItem.value) {
            selItem.value.isSel = false
        }

        if (item) {
            item.isSel = true
            loadPage(item.name)
        }
        selItem.value = item
    }

    function delPage(item) {
        if (item === selItem.value) {
            selItem.value = null
            clearPage()
        }
        FileMgr.delFile(pageDir + item?.name)
        delete data[item?.name]
    }

    function genPname() {
        let pNames = Object.keys(data)
        while (true) {
            let pname = `Page-${pageId++}.json`
            if (!pNames.includes(pname)) return pname
        }
    }

    function pageList() {
        let plist = []
        for (let key in data) {
            if (key !== 'addBtn') {
                plist.push(key)
            }
        }
        return plist
    }

    return {
        data,
        init,
        pageList,
    }
})

const pageData = usePageDataStore()
function loadPage(pname) {
    pname = pageDir + pname
    FileMgr.readFile(pname)
    .then(pdata => {
        pageData.resetPage(JSON.parse(pdata))
    })
}

function clearPage() {
    pageData.closePage()
}

function genCode(name) {
    console.log('111111111111111111111')
    // 页面数据代码
    let str = JSON.stringify(pageData.page, null, '  ')
  
    FileMgr.readFile('/src/WidgetPage/CtrlPage.template.vue')
    .then(template => {
      let pdata = template.replace("[/*{placeholder}*/]", str)
      let pname = name
      pname = pname.split('.')[0]
      pname = `/src/WidgetPage/${pname}.vue`
  
      FileMgr.saveFile(pname, pdata)
    })
  }