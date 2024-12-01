<template>
    <div class="product-card"
         @click="$router.push(`/products/${id}`)">
        <div class="product-card__image-container">
            <img :src="imgURL"
                 :alt="name"
                 class="product-card__image"
                 loading="lazy" />
            <button v-if="isLogged"
                    @click.stop="handleAddToFavourites"
                    :class="['product-card__favourite-button', { 'product-card__favourite-button--added': isProductAddedToFavourites }]">
                <img :src="isProductAddedToFavourites ? favouritesAddedIcon : favouritesIcon"
                     alt="">
            </button>
        </div>
        <div class="product-card__details">
            <div class="product-card__details-wrapper">
                <h2 class="product-card__details-name">{{ name }}</h2>
                <span class="product-card__details-price">${{ price }}</span>
            </div>
            <button :class="isProductAddedToCart ? 'product-card__add-button product-card__add-button--added' : 'product-card__add-button'"
                    @click.stop="handleAddProduct">
                <img :src="isProductAddedToCart ? addedIcon : addIcon"
                     alt="Add"
                     class="product-card__add-button-icon">
            </button>
        </div>
        <div
             :class="['product-card__quantity', { 'product-card__quantity--visible': isProductAddedToCart && isCartView }]">

            <button class="product-card__quantity-button"
                    @click.stop="decreaseQuantity">-</button>
            <span class="product-card__quantity-number">{{ productQuantity }}</span>
            <button class="product-card__quantity-button"
                    @click.stop="increaseQuantity">+</button>
        </div>
    </div>
</template>


<script>
import addIcon from '@/assets/images/add.svg'
import addedIcon from '@/assets/images/added.svg'
import favouritesIcon from '@/assets/images/favourites.svg'
import favouritesAddedIcon from '@/assets/images/favourites-added.svg'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            addIcon,
            addedIcon,
            favouritesIcon,
            favouritesAddedIcon,
            isCartView: this.$route.fullPath.includes('cart'),
        }
    },
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        imgURL: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        // isAddButton: {
        //     type: Boolean,
        //     default: true
        // },
    },
    computed: {
        ...mapState('auth', ['isLogged']),
        ...mapGetters('cart', {
            isAddedToCart: 'isAddedToCart',
            getProductQuantity: 'getProductQuantity'
        }),
        ...mapGetters('favourites', {
            isAddedToFavourites: 'isAddedToFavourites'
        }),

        isProductAddedToCart() {
            return this.isAddedToCart(this.id)
        },
        isProductAddedToFavourites() {
            return this.isAddedToFavourites(this.id)
        },
        productQuantity() {
            return this.getProductQuantity(this.id)
        }
    },
    methods: {
        ...mapActions('cart', ['addProductToCart', 'removeProductFromCart', 'updateCart']),
        ...mapActions('favourites', ['addProductToFavourites', 'removeProductFromFavourites', 'updateFavourites']),
        ...mapMutations('cart', ['increaseProductQuantity', 'decreaseProductQuantity']),

        handleAddToFavourites() {
            if (!this.isProductAddedToFavourites) {
                this.addProductToFavourites({ id: this.id, name: this.name, price: this.price, imgURL: this.imgURL })
            } else {
                this.removeProductFromFavourites(this.id)
            }
        },

        handleAddProduct() {
            if (!this.isLogged) {
                const toast = useToast();
                toast.warning('Please log in to add products to cart');
                return
            }
            if (!this.isProductAddedToCart) {
                this.addProductToCart({ id: this.id, quantity: this.productQuantity, name: this.name, price: this.price, imgURL: this.imgURL })
            } else {
                this.removeProductFromCart(this.id)
            }
        },

        increaseQuantity() {
            this.increaseProductQuantity(this.id)
        },

        decreaseQuantity() {
            if (this.productQuantity > 1) {
                this.decreaseProductQuantity(this.id)
            }
        }
    },
    beforeUnmount() {
        this.updateCart()
        this.updateFavourites()
    },
}
</script>

<style lang="scss" scoped>
@use 'ProductCard' as *
</style>