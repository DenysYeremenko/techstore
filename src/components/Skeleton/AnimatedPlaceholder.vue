<template>
    <div class="placeholder"
         :style="placeholderStyles">
        &nbsp;
    </div>
</template>

<script setup>
import { computed } from 'vue'

// Получаем пропсы
const props = defineProps({
    height: {
        type: String,
        required: false,
        default: '490px',
    },
    width: {
        type: String,
        required: false,
        default: '1000px',
    },
    borderRadius: {
        type: String,
        required: false,
        default: '0px',
    },
})

// Вычисляем соотношение сторон
const aspectRatio = computed(() => {
    const widthValue = parseFloat(props.width);
    const heightValue = parseFloat(props.height);
    if (widthValue && heightValue) {
        return widthValue / heightValue;
    }
    return undefined;
});

// Стиль для placeholder
const placeholderStyles = computed(() => {
    return {
        width: '100%',
        maxWidth: props.width,
        height: 'auto',
        borderRadius: props.borderRadius,
        aspectRatio: aspectRatio.value, // Используем aspect-ratio напрямую
    };
});
</script>

<style scoped>
@keyframes bgAnimate {
    0% {
        background-position: 50% 0;
    }

    100% {
        background-position: -150% 0;
    }
}

.placeholder {
    background-image: linear-gradient(to right,
            #d6d7d8 0%,
            #e2e3e4 10%,
            #d6d7d8 20%,
            #d6d7d8 100%);
    background-size: 200% 100%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    animation: bgAnimate 1.2s linear infinite;
}
</style>