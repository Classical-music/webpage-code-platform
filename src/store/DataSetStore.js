import { defineStore } from "pinia";
import { computed } from "vue";

export const useDataSetStore = defineStore('data-set', _ => {
    const value = DataSet

    return { value }
})

const DataSet = [
    {
        type: 'Screen',
        name: 'Screen1',
        pos: {
            x: 100,
            y: 100,
        },
        subs: [
            {
                type: 'Button',
                name: 'button1',
                pos: {
                    x: 100,
                    y: 100,
                },
                text: 'button1'
            }
        ]
    },
]