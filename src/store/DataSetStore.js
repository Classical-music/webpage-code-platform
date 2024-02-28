import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDataSetStore = defineStore('data-set', _ => {
    const value = DataSet
    let selItem = ref(undefined)

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

    return { value, getSelItem, setSelItem }
})

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