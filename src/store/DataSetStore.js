import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CONN } from "@Utils/connect";

export const useDataSetStore = defineStore('data-set', _ => {
    const value = initDataSet()
    let selItem = ref(value[0])

    const getSelItem = computed(_ => {
        return selItem.value
    })

    function setSelItem(item) {
        if (selItem.value !== undefined) {
            selItem.value.isSelect = false
        }

        selItem.value = item
        if (selItem.value !== undefined) {
            selItem.value.isSelect = true
        }
    }

    function addItem(type) {
        if (selItem.value === undefined) {
            console.warn('当前未选中控件')
            return
        }

        if (selItem.value.subs === undefined) {
            console.warn('当前选中的控件不是容器控件, 无法添加子控件')
            return
        }

        let itemCtor = ItemCreator[type]
        if (typeof itemCtor !== 'function') {
            console.warn(`控件类型 ${type} 不支持, 无法创建对象元素`)
            return
        }
        selItem.value.subs.push(itemCtor(type))
    }

    return { value, getSelItem, setSelItem, addItem }
})

function initDataSet() {
    CONN.loadLocalFile('/public/test.json')
        .then(data => {
            if (typeof data !== 'object') return
            useDataSetStore().value = data
        })
    return [
        {
            type: 'Screen',
            name: 'aaa',
            rect: { x: 0, y: 0, w: 800, h: 500 },
            isSelect: false,
            subs: [

            ]
        }
    ]
}

const ItemCreator = {
    Screen: createScreen,
    Panel: createPanel,
    Label: createLabel,
    Button: createButton,
    LineEdit: createLineEdit,
    Image: createImage
}

function createScreen(type) {
    let item = getCommon(type)
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