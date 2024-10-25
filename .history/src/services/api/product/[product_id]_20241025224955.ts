import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { product_id } = req.query;

  // Dữ liệu mẫu của sản phẩm
  const products = {
    '1': {
      id: 1,
      name: 'iPhone 15 Plus 512GB',
      price: '30.890.000₫',
      discount_price: '30.890.000₫',
      images: ['/images/iphone15plus.jpg'],
      colors: ['#FFC0CB', '#0000FF', '#FFFFFF', '#008000', '#FFFF00'],
      storage: ['128GB', '256GB', '512GB'],
      specifications: {
        'Operating System': 'iOS 17',
        'Mobile Network': '2G, 3G, 4G, 5G',
        'Internal Storage': '256GB',
        'Camera Resolution': '48MP',
        'SIM Slots': 'Dual SIM',
        'Processor': 'Apple A16 Bionic',
        'Display Technology': 'Super Retina XDR',
        'Resolution': '2796 x 1290',
        'Screen Size': '6.7 inches',
      },
      description: 'Overview of iPhone 15 Plus...'
    }
  };

  // Trả về dữ liệu mẫu theo ID sản phẩm
  const product = products[product_id as string];

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}
