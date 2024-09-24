export const _carts = [
	{
		token: '1234',
		userId: 1,
	},
	{
		token: '5678',
		userId: 2,
	},
]

export const _cart_items = [
	{
		variantId: 1,
		cartId: 1,
		quantity: 1,
	},
]

export const _cart_item = {
	variantId: 1,
	cartId: 1,
	quantity: 1,
	ingredients: {
		connect: [{ id: 1 }],
	},
}

export const _categories = [
	{
		name: 'Пиццы',
	},
	{
		name: 'Завтрак',
	},
	{
		name: 'Закуски',
	},
	{
		name: 'Коктейли',
	},
	{
		name: 'Напитки',
	},
]

export const _ingredients = [
	{
		name: 'Сырный бортик',
		price: 179,
		imageUrl: '/assets/ingredients/sirni-bortik.png',
	},
	{
		name: 'Сливочная моцарелла',
		price: 79,
		imageUrl: '/assets/ingredients/mozarella.png',
	},
	{
		name: 'Сыры чеддер и пармезан',
		price: 79,
		imageUrl: '/assets/ingredients/parmezan.png',
	},
	{
		name: 'Острый перец халапеньо',
		price: 59,
		imageUrl: '/assets/ingredients/halapenio.png',
	},
	{
		name: 'Нежный цыпленок',
		price: 79,
		imageUrl: '/assets/ingredients/chicken.png',
	},
	{
		name: 'Шампиньоны',
		price: 59,
		imageUrl: '/assets/ingredients/champignons.png',
	},
	{
		name: 'Ветчина',
		price: 79,
		imageUrl: '/assets/ingredients/ham.png',
	},
	{
		name: 'Пикантная пепперони',
		price: 79,
		imageUrl: '/assets/ingredients/peperoni.png',
	},
	{
		name: 'Острая чоризо',
		price: 79,
		imageUrl: '/assets/ingredients/spicy-chorizo.png',
	},
	{
		name: 'Маринованные огурчики',
		price: 59,
		imageUrl: '/assets/ingredients/cucumbers.png',
	},
	{
		name: 'Свежие томаты',
		price: 59,
		imageUrl: '/assets/ingredients/tomatoes.png',
	},
	{
		name: 'Красный лук',
		price: 59,
		imageUrl: '/assets/ingredients/onion.png',
	},
	{
		name: 'Сочные ананасы',
		price: 59,
		imageUrl: '/assets/ingredients/pineapples.png',
	},
	{
		name: 'Итальянские травы',
		price: 39,
		imageUrl: '/assets/ingredients/herbs.png',
	},
	{
		name: 'Сладкий перец',
		price: 59,
		imageUrl: '/assets/ingredients/pepper.png',
	},
	{
		name: 'Кубики брынзы',
		price: 79,
		imageUrl: '/assets/ingredients/brinza.png',
	},
	{
		name: 'Митболы',
		price: 79,
		imageUrl: '/assets/ingredients/meatballs.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }))

export const _products = [
	{
		name: 'Омлет с ветчиной и грибами',
		imageUrl: '/assets/products/omlet1.webp',
		categoryId: 2,
	},
	{
		name: 'Омлет с пепперони',
		imageUrl: '/assets/products/omlet2.webp',
		categoryId: 2,
	},
	{
		name: 'Кофе Латте',
		imageUrl: '/assets/products/latte1.webp',
		categoryId: 2,
	},
	{
		name: 'Омлет с беконом и шампиньонами',
		imageUrl: '/assets/products/omlet1.webp',
		categoryId: 2,
	},
	{
		name: 'Кофе Флэт-уайт',
		imageUrl: '/assets/products/latte1.webp',
		categoryId: 2,
	},
	{
		name: 'Омлет домашний',
		imageUrl: '/assets/products/omlet2.webp',
		categoryId: 2,
	},
	{
		name: 'Дэнвич ветчина и сыр',
		imageUrl: '/assets/products/denvich.webp',
		categoryId: 3,
	},
	{
		name: 'Куриные наггетсы',
		imageUrl: '/assets/products/nuggets.webp',
		categoryId: 3,
	},
	{
		name: 'Картофель из печи с соусом 🌱',
		imageUrl: '/assets/products/potatoe.webp',
		categoryId: 3,
	},
	{
		name: 'Додстер',
		imageUrl: '/assets/products/dodster1.webp',
		categoryId: 3,
	},
	{
		name: 'Острый Додстер 🌶️',
		imageUrl: '/assets/products/dodster2.webp',
		categoryId: 3,
	},
	{
		name: 'Очень острый Додстер 🌶️🌶️🌶️',
		imageUrl: '/assets/products/dodster2.webp',
		categoryId: 3,
	},
	{
		name: 'Банановый молочный коктейль',
		imageUrl: '/assets/products/milk-cocktail1.webp',
		categoryId: 4,
	},
	{
		name: 'Карамельное яблоко молочный коктейль',
		imageUrl: '/assets/products/milk-cocktail2.webp',
		categoryId: 4,
	},
	{
		name: 'Молочный коктейль с печеньем Орео',
		imageUrl: '/assets/products/milk-cocktail3.webp',
		categoryId: 4,
	},
	{
		name: 'Классический молочный коктейль 👶',
		imageUrl: '/assets/products/milk-cocktail4.webp',
		categoryId: 4,
	},
	{
		name: 'Неклассический молочный коктейль 🤔',
		imageUrl: '/assets/products/milk-cocktail4.webp',
		categoryId: 4,
	},
	{
		name: 'Авантюрный молочный коктейль 🤨',
		imageUrl: '/assets/products/milk-cocktail4.webp',
		categoryId: 4,
	},
	{
		name: 'Ирландский Капучино',
		imageUrl: '/assets/products/capuchino1.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Карамельный капучино',
		imageUrl: '/assets/products/capuchino2.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Кокосовый латте',
		imageUrl: '/assets/products/latte2.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Американо',
		imageUrl: '/assets/products/americano.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Латте',
		imageUrl: '/assets/products/latte3.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Руссиано',
		imageUrl: '/assets/products/americano.webp',
		categoryId: 5,
	},
]

export const _sizes = [
	{
		name: 'Маленькая',
		value: 25,
	},
	{
		name: 'Средняя',
		value: 30,
	},
	{
		name: 'Большая',
		value: 35,
	},
]

export const _doughs = [
	{
		name: 'Традиционное',
		value: 'traditional',
	},
	{
		name: 'Тонкое',
		value: 'thin',
	},
]
