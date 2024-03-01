import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useDataSetStore = defineStore('data-set', _ => {
    let value = reactive({
        page: null,
        selItem: null
    })

    const page = computed(_ => {
        return value.page
    })

    const selItem = computed(_ => {
        return value.selItem
    })

    function setSelItem(item = null) {
        if (value.selItem) {
            value.selItem.isSelect = false
        }

        value.selItem = item
        if (value.selItem) {
            value.selItem.isSelect = true
        }
    }

    function resetPage(page = null) {
        if (page)
            value.page = page
        else
            value.page = createPage()
        setSelItem(value.page)
    }

    function closePage() {
        value.page = null
        setSelItem(value.page)
    }

    function addItem(type) {
        value.page = createButton(type)
        // if (value.selItem === undefined) {
        //     console.warn('当前未选中控件')
        //     return
        // }

        // if (value.selItem.subs === undefined) {
        //     console.warn('当前选中的控件不是容器控件, 无法添加子控件')
        //     return
        // }

        // let itemCtor = ItemCreator[type]
        // if (typeof itemCtor !== 'function') {
        //     console.warn(`控件类型 ${type} 不支持, 无法创建对象元素`)
        //     return
        // }
        // value.selItem.subs.push(itemCtor(type))
    }

    return { page, selItem, setSelItem, resetPage, closePage, addItem }
})

const ItemCreator = {
    Page: createPage,
    Panel: createPanel,
    Label: createLabel,
    Button: createButton,
    LineEdit: createLineEdit,
    Image: createImage
}

function createPage() {
    let item = getCommon("Page")
    item.rect = { x: 0, y: 0, w: 800, h: 500 }
    item.subs = []
    return item
}
function createPanel(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 400, h: 300 }
    item.subs = []
    return item
}
function createLabel(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 100, h: 30 }
    item.text = 'label'
    return item
}
function createButton(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 100, h: 30 }
    item.text = 'button'
    return item
}
function createLineEdit(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 150, h: 30 }
    item.text = ''
    return item
}
function createImage(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 50, h: 50 }
    item.src = ''
    return item
}
let id = 0
function getCommon(type) {
    return {
        type: type,
        name: `${type}-${id++}`,
        isSelect: false
    }
}