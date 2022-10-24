<template>
    <div>
        <select v-model="selected">
            <option v-for="opt in opts"
                    v-bind:key="opt"
                    v-bind:value="opt"
                    v-text="opt">

            </option>
        </select>
        <button v-on:click="$emit('generate',selected)">Generate</button>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                opts: [1, 2, 3],
                selected: 3
            }
        },
        methods: {

        }
    }
</script>
<style scoped>

</style>