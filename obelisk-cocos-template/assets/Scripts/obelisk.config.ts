export const obeliskConfig = {
    name: "counter",
    description: "examples counter",
    systems: [
        "counter_system",
    ],
    components: {
    },
    singletonComponents: {
        counter: {
            type: "u64",
            init: "0"
        },
    }
}
