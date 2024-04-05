import { ref } from 'vue';

export const CtrlMgr = {
    Page: {
        itemCtor: createPage,
        compCtrl: _ => import('@WidgetCtrl/CtrlPage.vue'),
        compSimu: _ => import('@WidgetSimu/SimuPage.vue')
    },
    Panel: {
        itemCtor: createPanel,
        compCtrl: _ => import('@WidgetCtrl/CtrlPanel.vue'),
        compSimu: _ => import('@WidgetSimu/Base/SimuPanel.vue')
    },
    Label: {
        itemCtor: createLabel,
        compCtrl: _ => import('@WidgetCtrl/CtrlLabel.vue'),
        compSimu: _ => import('@WidgetSimu/Base/SimuLabel.vue')
    },
    Image: {
        itemCtor: createImage,
        compCtrl: _ => import('@WidgetCtrl/CtrlImage.vue'),
        compSimu: _ => import('@WidgetSimu/Base/SimuImage.vue')
    },
    Button: {
        itemCtor: createButton,
        compCtrl: _ => import('@WidgetCtrl/CtrlButton.vue'),
        compSimu: _ => import('@WidgetSimu/Base/SimuButton.vue')
    },
}

export const baseCtrls = Object.keys(CtrlMgr)

export function ctrlItemCtor(type) {
    let itemCtor = CtrlMgr[type]?.itemCtor
    if (typeof itemCtor !== 'function') {
        console.warn(`创建控件对象: ${type} 不支持`)
        return
    }

    return itemCtor()
}

export function compCtrl(type) {
    const comp = ref(null)
    let compCtrl = CtrlMgr[type]?.compCtrl
    if (typeof compCtrl !== 'function') {
        console.warn(`控件: ${type} 不支持`)
        return
    }
    compCtrl().then(module => {
        comp.value = module.default
    })

    return comp
}
export function compSimu(type) {
    const comp = ref(null)
    let compSimu = CtrlMgr[type]?.compSimu
    if (typeof compSimu !== 'function') {
        console.warn(`模拟控件: ${type} 不支持`)
        return
    }
    compSimu().then(module => {
        comp.value = module.default
    })

    return comp
}

function createPage() {
    let item = getCommon("Page")
    item.rect = { x: 0, y: 0, w: 800, h: 500 }
    item.subs = []
    return item
}
function createPanel() {
    let item = getCommon('Panel')
    item.rect = { x: 0, y: 0, w: 400, h: 300 }
    item.subs = []
    return item
}
function createLabel() {
    let item = getCommon('Label')
    item.rect = { x: 0, y: 0, w: 100, h: 30 }
    item.text = 'label'
    return item
}
function createImage() {
    let item = getCommon('Image')
    item.rect = { x: 0, y: 0, w: 50, h: 50 }
    item.src = ''
    return item
}
function createButton() {
    let item = getCommon('Button')
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

[/*{placeholder}*/]

export const allCtrls = Object.keys(CtrlMgr)