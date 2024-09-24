import { hashSync } from 'bcrypt'
import {
	_cart_item,
	_carts,
	_categories,
	_doughs,
	_ingredients,
	_products,
	_sizes,
} from './constants'
import { prisma } from './prisma-client'

async function up() {
	await prisma.user.createMany({
		data: [
			{
				firstName: 'John',
				lastName: 'Doe',
				email: 'WYQ2H@example.com',
				password: hashSync('123456', 10),
				verified: true,
				role: 'CUSTOMER',
				phone: '1234567890',
			},
			{
				firstName: 'Alexey',
				lastName: 'Gudey',
				email: 'gudey.e2003@example.com',
				password: hashSync('24042003', 10),
				verified: true,
				role: 'ADMIN',
				phone: '375336393481',
			},
		],
	})

	await prisma.cart.createMany({
		data: _carts,
	})

	await prisma.category.createMany({
		data: _categories,
	})

	await prisma.ingredient.createMany({
		data: _ingredients,
	})

	await prisma.product.createMany({
		data: _products,
	})

	const sizes = await prisma.size.createMany({
		data: _sizes,
	})

	const doughs = await prisma.dough.createMany({
		data: _doughs,
	})

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Пепперони',
			imageUrl: '/assets/pizza/pepperoni.avif',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 5),
			},
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Чоризо фреш',
			imageUrl: '/assets/pizza/chorizo.avif',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(5, 10),
			},
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Сырная',
			imageUrl: '/assets/pizza/sirni.avif',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(10, 30),
			},
		},
	})

	const pizza4 = await prisma.product.create({
		data: {
			name: 'Пицца Жюльен',
			imageUrl: '/assets/pizza/julien.avif',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 5),
			},
		},
	})

	const pizza5 = await prisma.product.create({
		data: {
			name: 'Деревенская',
			imageUrl: '/assets/pizza/village.avif',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(5, 10),
			},
		},
	})

	const pizza6 = await prisma.product.create({
		data: {
			name: 'Домашняя',
			imageUrl: '/assets/pizza/home.avif',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(10, 30),
			},
		},
	})

	const pizza_basic_variants = [
		{
			productId: pizza1.id,
			price: 500,
		},
		{
			productId: pizza2.id,
			price: 600,
		},
		{
			productId: pizza3.id,
			price: 700,
		},
		{
			productId: pizza4.id,
			price: 800,
		},
		{
			productId: pizza5.id,
			price: 900,
		},
		{
			productId: pizza6.id,
			price: 1000,
		},
	]

	const variants = []

	for (let k = 0; k < pizza_basic_variants.length; k++) {
		for (let i = 1; i <= 3; i++) {
			for (let j = 1; j <= 2; j++) {
				variants.push({
					productId: pizza_basic_variants[k].productId,
					price: pizza_basic_variants[k].price * i,
					sizeId: i,
					doughId: j,
				})
			}
		}
	}

	_products.forEach((product, index) => {
		variants.push({
			productId: index + 1,
			price: Math.floor(Math.random() * 10 + 20) * 25,
		})
	})

	await prisma.variant.createMany({
		data: variants,
	})

	// await prisma.cartItem.createMany({
	// 	data: _cart_items.map(cart_item => ({
	// 		...cart_item,
	// 		ingredients: {
	// 			connect: [{ id: 0 }],
	// 		},
	// 	})),
	// })

	await prisma.cartItem.create({
		data: _cart_item,
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Variant" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Size" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Dough" RESTART IDENTITY CASCADE;`
}

async function main() {
	try {
		await down()
		await up()
	} catch (error) {
		console.error(error)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async error => {
		console.error(error)
		await prisma.$disconnect()
		process.exit(1)
	})
