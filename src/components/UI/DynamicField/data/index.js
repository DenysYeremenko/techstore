import store from '@/store'

const dynamicFieldOptions = {
  sortSelect: {
    fieldName: 'Sort By',
    fieldLabel: 'sort-by',
    isSelect: true,
    options: [
      { value: 'name', label: 'Name, A to Z' },
      { value: '-name', label: 'Name, Z to A' },
      { value: 'price', label: 'Price: Low to High' },
      { value: '-price', label: 'Price: High to Low' },
    ],
  },
  categoriesSelect: {
    fieldName: 'Categories',
    fieldLabel: 'categories',
    isSelect: true,
    options: [
      { value: 'all', label: 'All' },
      { value: 'monitors', label: 'Monitors' },
      { value: 'keyboards', label: 'Keyboards' },
      { value: 'mice', label: 'Mice' },
    ],
  },
  searchInput: {
    fieldName: 'Search products',
    fieldLabel: 'search-products',
    isSelect: false,
    options: [],
  },
}

export default dynamicFieldOptions
