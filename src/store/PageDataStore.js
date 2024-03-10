import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const usePageDataStore = defineStore('data-set', _ => {
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
        let parent = value.selItem
        if (!parent || !parent.subs) parent = value.page
        if (!parent || !parent.subs) {
            console.warn(`无法添加控件`)
            return
        }

        let itemCtor = ItemCreator[type]
        if (typeof itemCtor !== 'function') {
            console.warn(`控件类型 ${type} 不支持, 无法创建对象元素`)
            return
        }

        parent.subs.push(itemCtor(type))
    }

    return {
        page,
        selItem,
        setSelItem,
        resetPage,
        closePage,
        addItem
    }
})

export function createPage() {
    let item = getCommon("Page")
    item.rect = { x: 0, y: 0, w: 800, h: 500 }
    item.subs = []
    return item
}

const ItemCreator = {
    Panel: createPanel,
    Label: createLabel,
    Image: createImage,
    Button: createButton,

    InputText: createInputText,
    InputPasswd: createInputPasswd,
    InputFile: createInputFile,
    Check: createCheck,
    Radio: createRadio,

    Dropdown: createDropdown,
    PopupBase: createPopupBase,
    ListBase: createListBase,
    TreeBase: createTreeBase,
    TableBase: createTableBase,
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
function createImage(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 50, h: 50 }
    item.src = ''
    return item
}
function createButton(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 100, h: 30 }
    item.text = 'button'
    return item
}
function createInputText(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 150, h: 30 }
    item.text = ''
    return item
}
function createInputPasswd(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 150, h: 30 }
    item.text = ''
    return item
}
function createInputFile(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 150, h: 30 }
    item.text = ''
    return item
}
function createCheck(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 16, h: 16 }
    item.text = ''
    return item
}
function createRadio(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 16, h: 16 }
    item.text = ''
    return item
}

function createDropdown(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 150, h: 30 }
    item.text = ''
    return item
}
function createPopupBase(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 480, h: 320 }
    item.text = ''
    return item
}
function createListBase(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 150, h: 300 }
    item.text = ''
    return item
}
function createTreeBase(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 150, h: 300 }
    item.text = ''
    return item
}
function createTableBase(type) {
    let item = getCommon(type)
    item.rect = { x: 0, y: 0, w: 150, h: 300 }
    item.text = ''
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