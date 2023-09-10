export const obeliskConfig = {
    project_name: "Counter",
    systems: [
        "counter_system",
    ],
    components: {
    },
    singletonComponents: {
        admin: {
            type: "address",
            init: "0x1"
        },
        counter: {
            type: "u64",
            init: "0"
        },
    }
}

