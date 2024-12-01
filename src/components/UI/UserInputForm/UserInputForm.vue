<template>
    <div class="user-input-form">
        <label :for="id"
               class="user-input-form__label">{{ title }}</label>
        <input :type="type"
               :minlength="id === 'password' && 8"
               :id="id"
               :value="modelValue"
               :autocomplete="type === 'password' ? 'new-password' : 'off'"
               @input="$emit('update:modelValue', $event.target.value)"
               class="user-input-form__input"
               required />
    </div>
</template>

<script>
export default {
    name: 'UserInputForm',
    props: {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@use 'UserInputForm' as *;
</style>