const products = [
  {
    _id: "1",
    name: "Slim Fit Casual Shirt",
    brand: "THE BEAR HOUSE",
    category: "Men - Shirts",
    images: ["/images/product1.jpg", "/images/product1-hover.jpg"],
    price: 748,
    originalPrice: 2495,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue"],
    description: "Comfortable slim fit casual shirt made from premium cotton.",
    stock: 50,
    isAvailable: true,

    
    createdBy: "userId123", // dummy user ID
    createdAt: "2025-06-19T12:00:00Z"
  },
  {
    _id: "2",
    name: "Regular Fit Checked Shirt",
    brand: "ROADSTER",
    category: "Men - Shirts",
    images: ["/images/product2.jpg", "/images/product2-hover.jpg"],
    price: 599,
    originalPrice: 1999,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Black"],
    description: "Trendy regular fit checked shirt, ideal for casual wear.",
    stock: 30,
    isAvailable: true,
    createdBy: "userId123",
    createdAt: "2025-06-19T12:00:00Z"
  },
  {
    _id: "3",
    name: "Cotton Casual Shirt",
    brand: "HIGHLANDER",
    category: "Men - Shirts",
    images: ["/images/product3.jpg", "/images/product3-hover.jpg"],
    price: 679,
    originalPrice: 2199,
    sizes: ["M", "L", "XL"],
    colors: ["White"],
    description: "Breathable cotton casual shirt for everyday comfort.",
    stock: 40,
    isAvailable: true,
    createdBy: "userId123",
    createdAt: "2025-06-19T12:00:00Z"
  },
  {
    _id: "4",
    name: "Printed Slim Fit Shirt",
    brand: "HERE&NOW",
    category: "Men - Shirts",
    images: ["/images/product4.jpg", "/images/product4-hover.jpg"],
    price: 749,
    originalPrice: 2499,
    sizes: ["S", "M", "L"],
    colors: ["Green", "White"],
    description: "Fashionable slim fit shirt with modern printed design.",
    stock: 25,
    isAvailable: true,
    createdBy: "userId123",
    createdAt: "2025-06-19T12:00:00Z"
  },
  {
    _id: "5",
    name: "Pure Cotton Formal Shirt",
    brand: "LOUIS PHILIPPE",
    category: "Men - Formal Shirts",
    images: ["/images/product5.jpg", "/images/product5-hover.jpg"],
    price: 899,
    originalPrice: 2999,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["White"],
    description: "Elegant pure cotton formal shirt, perfect for office wear.",
    stock: 60,
    isAvailable: true,
    createdBy: "userId123",
    createdAt: "2025-06-19T12:00:00Z"
  }
];

export default products;
