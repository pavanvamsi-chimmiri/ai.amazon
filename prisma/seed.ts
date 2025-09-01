import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.wishlistItem.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.address.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hash('admin123', 12),
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  const customerUser = await prisma.user.create({
    data: {
      name: 'John Customer',
      email: 'customer@example.com',
      password: await hash('customer123', 12),
      role: 'CUSTOMER',
      emailVerified: new Date(),
    },
  })

  const sellerUser = await prisma.user.create({
    data: {
      name: 'Jane Seller',
      email: 'seller@example.com',
      password: await hash('seller123', 12),
      role: 'SELLER',
      emailVerified: new Date(),
    },
  })

  console.log('👥 Created users')

  // Create categories
  const tshirtsCategory = await prisma.category.create({
    data: {
      name: 'T-Shirts',
      description: 'Comfortable and stylish t-shirts for every occasion',
      image: '/images/c-tshirts.jpg',
      slug: 't-shirts',
    },
  })

  const jeansCategory = await prisma.category.create({
    data: {
      name: 'Jeans',
      description: 'Classic and modern jeans for all styles',
      image: '/images/c-jeans.jpg',
      slug: 'jeans',
    },
  })

  const shoesCategory = await prisma.category.create({
    data: {
      name: 'Shoes',
      description: 'Trendy and comfortable footwear for every need',
      image: '/images/c-shoes.jpg',
      slug: 'shoes',
    },
  })

  console.log('📂 Created categories')

  // Create products for T-Shirts category
  const tshirtProducts = [
    {
      name: 'Classic Cotton T-Shirt',
      description: 'Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear with a modern design that suits any casual occasion.',
      price: 29.99,
      comparePrice: 39.99,
      images: JSON.stringify(['/images/p11-1.jpg', '/images/p11-2.jpg']),
      sku: 'TSH-001',
      barcode: '1234567890123',
      weight: 0.2,
      dimensions: '{"length": 28, "width": 20, "height": 2}',
      stock: 50,
      isActive: true,
      isFeatured: true,
      slug: 'classic-cotton-tshirt',
      categoryId: tshirtsCategory.id,
    },
    {
      name: 'Vintage Style T-Shirt',
      description: 'Retro-inspired t-shirt with a vintage feel. Made from soft, breathable fabric with a relaxed fit for ultimate comfort.',
      price: 34.99,
      comparePrice: 44.99,
      images: JSON.stringify(['/images/p12-1.jpg', '/images/p12-2.jpg']),
      sku: 'TSH-002',
      barcode: '1234567890124',
      weight: 0.25,
      dimensions: '{"length": 30, "width": 22, "height": 2}',
      stock: 35,
      isActive: true,
      isFeatured: false,
      slug: 'vintage-style-tshirt',
      categoryId: tshirtsCategory.id,
    },
  ]

  // Create products for Jeans category
  const jeansProducts = [
    {
      name: 'Slim Fit Jeans',
      description: 'Modern slim fit jeans with stretch denim for maximum comfort. Perfect for a contemporary look with excellent durability.',
      price: 79.99,
      comparePrice: 99.99,
      images: JSON.stringify(['/images/p21-1.jpg', '/images/p21-2.jpg']),
      sku: 'JNS-001',
      barcode: '1234567890125',
      weight: 0.5,
      dimensions: '{"length": 32, "width": 18, "height": 3}',
      stock: 25,
      isActive: true,
      isFeatured: true,
      slug: 'slim-fit-jeans',
      categoryId: jeansCategory.id,
    },
    {
      name: 'Classic Straight Jeans',
      description: 'Timeless straight leg jeans with a comfortable fit. Made from premium denim with a classic design that never goes out of style.',
      price: 69.99,
      comparePrice: 89.99,
      images: JSON.stringify(['/images/p22-1.jpg', '/images/p22-2.jpg']),
      sku: 'JNS-002',
      barcode: '1234567890126',
      weight: 0.6,
      dimensions: '{"length": 34, "width": 20, "height": 3}',
      stock: 30,
      isActive: true,
      isFeatured: false,
      slug: 'classic-straight-jeans',
      categoryId: jeansCategory.id,
    },
  ]

  // Create products for Shoes category
  const shoesProducts = [
    {
      name: 'Casual Sneakers',
      description: 'Comfortable casual sneakers perfect for everyday wear. Lightweight design with cushioned sole for all-day comfort.',
      price: 89.99,
      comparePrice: 119.99,
      images: JSON.stringify(['/images/p31-1.jpg', '/images/p31-2.jpg']),
      sku: 'SHS-001',
      barcode: '1234567890127',
      weight: 0.8,
      dimensions: '{"length": 28, "width": 10, "height": 12}',
      stock: 20,
      isActive: true,
      isFeatured: true,
      slug: 'casual-sneakers',
      categoryId: shoesCategory.id,
    },
    {
      name: 'Formal Dress Shoes',
      description: 'Elegant formal dress shoes for professional and special occasions. Premium leather construction with classic design.',
      price: 149.99,
      comparePrice: 199.99,
      images: JSON.stringify(['/images/p32-1.jpg', '/images/p32-2.jpg']),
      sku: 'SHS-002',
      barcode: '1234567890128',
      weight: 1.0,
      dimensions: '{"length": 30, "width": 11, "height": 15}',
      stock: 15,
      isActive: true,
      isFeatured: false,
      slug: 'formal-dress-shoes',
      categoryId: shoesCategory.id,
    },
  ]

  // Create all products
  const allProducts = [...tshirtProducts, ...jeansProducts, ...shoesProducts]
  
  for (const productData of allProducts) {
    await prisma.product.create({
      data: productData,
    })
  }

  console.log('🛍️  Created products')

  // Create sample addresses
  const customerAddress = await prisma.address.create({
    data: {
      userId: customerUser.id,
      type: 'BOTH',
      firstName: 'John',
      lastName: 'Customer',
      address1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1-555-0123',
      isDefault: true,
    },
  })

  console.log('📍 Created addresses')

  // Create sample reviews
  const products = await prisma.product.findMany()
  
  for (const product of products) {
    await prisma.review.create({
      data: {
        userId: customerUser.id,
        productId: product.id,
        rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
        title: `Great ${product.name}`,
        comment: `I really love this ${product.name.toLowerCase()}. The quality is excellent and it fits perfectly!`,
        isVerified: true,
      },
    })
  }

  console.log('⭐ Created reviews')

  // Create sample cart items
  await prisma.cartItem.create({
    data: {
      userId: customerUser.id,
      productId: products[0].id,
      quantity: 2,
    },
  })

  await prisma.cartItem.create({
    data: {
      userId: customerUser.id,
      productId: products[2].id,
      quantity: 1,
    },
  })

  console.log('🛒 Created cart items')

  // Create sample wishlist items
  await prisma.wishlistItem.create({
    data: {
      userId: customerUser.id,
      productId: products[1].id,
    },
  })

  await prisma.wishlistItem.create({
    data: {
      userId: customerUser.id,
      productId: products[3].id,
    },
  })

  console.log('❤️  Created wishlist items')

  console.log('✅ Database seeding completed successfully!')
  console.log('\n📋 Sample Data Summary:')
  console.log(`- Users: ${await prisma.user.count()}`)
  console.log(`- Categories: ${await prisma.category.count()}`)
  console.log(`- Products: ${await prisma.product.count()}`)
  console.log(`- Reviews: ${await prisma.review.count()}`)
  console.log(`- Cart Items: ${await prisma.cartItem.count()}`)
  console.log(`- Wishlist Items: ${await prisma.wishlistItem.count()}`)
  
  console.log('\n🔑 Sample Login Credentials:')
  console.log('Admin: admin@example.com / admin123')
  console.log('Customer: customer@example.com / customer123')
  console.log('Seller: seller@example.com / seller123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
