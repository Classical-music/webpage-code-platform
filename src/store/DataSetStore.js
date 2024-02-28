import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDataSetStore = defineStore('data-set', _ => {
    const value = DataSet
    let selItem = ref(DataSet[0])

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
        let itemCtor = ItemCreator[type]
        if (itemCtor === undefined) return
        let item = itemCtor()
        console.log(item)
        if (selItem.value.subs !== undefined) {
            selItem.value.subs.push(item)
        }
    }

    return { value, getSelItem, setSelItem, addItem }
})

const ItemCreator = {
    Screen: createScreen,
    Panel: createPanel,
    Label: createLabel,
    Button: createButton,
    LineEdit: createLineEdit,
    Image: createImage,
}

function createItem(type) {
    return {
        type: type,
        name: 'new',
        isSelect: false,
        rect: {
            x: 0, y: 0,
            w: 30, h: 30,
        }
    }
}

function createScreen() {
    let item = createItem('Screen')
    item.subs = []
    return item
}
function createPanel() {
    let item = createItem('Panel')
    item.subs = []
    return item
}
function createLabel() {
    let item = createItem('Label')
    item.text = 'label'
    return item
}
function createButton() {
    let item = createItem('Button')
    item.text = 'button'
    return item
}

function createLineEdit() {
    let item = createItem('LineEdit')
    item.text = ''
    return item
}
function createImage() {
    let item = createItem('Image')
    item.src = ''
    return item
}

const DataSet = [
    {
        type: 'Screen',
        name: 'Screen1',
        isSelect: false,
        rect: {
            x: 100, y: 100,
            w: 800, h: 500
        },
        subs: [
            {
                type: 'Button',
                name: 'button1',
                isSelect: false,
                rect: {
                    x: 100, y: 100,
                    w: 100, h: 30,
                },
                text: 'button1'
            },
            {
                type: 'Label',
                name: 'label1',
                isSelect: false,
                rect: {
                    x: 100,
                    y: 200,
                    w: 100,
                    h: 30
                },
                text: 'label1',
            },
            {
                type: 'LineEdit',
                name: 'lineEdit1',
                isSelect: false,
                rect: {
                    x: 100, y: 300,
                    w: 100, h: 30
                },
                text: 'value'
            },
            {
                type: 'Image',
                name: 'image1',
                isSelect: false,
                rect: {
                    x: 200, y: 100,
                    w: 80, h: 80
                },
                src: ''
            },
            {
                type: 'Panel',
                name: 'panel1',
                isSelect: false,
                rect: {
                    x: 300, y: 100,
                    w: 200, h: 200
                },
                subs: [
                    {
                        type: 'Button',
                        name: 'panel-btn1',
                        rect: {
                            x: 10, y: 10,
                            w: 100, h: 30
                        },
                        text: 'panel-btn1'
                    }
                ]
            }
        ]
    },
]