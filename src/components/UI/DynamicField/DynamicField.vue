<template>
    <div class="product-field"
         :aria-label="options.fieldName">
        <label :for="`${options.fieldLabel}-select`"
               class="product-field__label">{{ options.fieldName }}:</label>
        <!--if select field-->
        <select v-if="options.isSelect"
                :id="`${options.fieldLabel}-select`"
                class="product-field__select"
                :value="modelValue"
                @change="updateField">
            <option v-for="option in options.options"
                    :value="option.value">{{ option.label }}</option>
        </select>
        <!---->

        <!--if search field-->
        <div v-else
             class="input-wrapper">
            <input type="text"
                   id="search-input"
                   placeholder="Enter product name"
                   class="product-field__input"
                   :value="modelValue"
                   @input="updateField" />
            <button type="button"
                    class="clear-button"
                    @click="clearField">✕</button>
        </div>
        <!---->
    </div>
</template>

<script>
export default {
    props: {
        options: {
            fieldName: {
                type: String,
                required: true,
            },
            fieldLabel: {
                type: String,
                required: true,
            },
            options: {
                type: Array,
                required: function () {
                    return this.isSelect;
                },
            },
            isSelect: {
                type: Boolean,
                required: true,
            },
        },

        modelValue: {
            type: [String, Number],
            required: true,
        },
    },
    methods: {
        updateField(event) {
            this.$emit('update:modelValue', event.target.value);
        },
        clearField() {
            this.$emit('update:modelValue', '');
        },
    },
};
</script>

<style lang="scss" scoped>
@use 'DynamicField' as *;
</style>