import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'deck-001',
    name: 'Классическая террасная доска',
    description: 'Классическая террасная доска из композитного материала, устойчивая к влаге и ультрафиолету. Идеальна для открытых террас, веранд и садовых дорожек. Не скользит, не трескается, не требует особого ухода. Гарантия 25 лет.',
    shortDescription: 'Классическая террасная доска для террас и веранд',
    price: 1200,
    pricePerSquareMeter: 2400,
    images: [
      'https://do.kg/oc-content/uploads/1/132.jpg',
      'https://deckson.ru/wp-content/uploads/2021/10/shirina-doski-dpk.jpg'
    ],
    dimensions: {
      width: 140,
      length: 3000,
      thickness: 25
    },
    color: 'Орех',
    type: 'hollow',
    purpose: ['Терраса', 'Веранда', 'Садовая дорожка'],
    inStock: true,
    isPopular: true,
    isNew: false,
    specifications: {
      material: 'Древесно-полимерный композит',
      warranty: '25 лет',
      loadCapacity: '350 кг/м²',
      waterResistance: 'Высокая',
      uvResistance: 'Высокая',
      maintenanceRequired: 'Минимальное'
    }
  },
  {
    id: 'deck-002',
    name: 'Премиум террасная доска',
    description: 'Премиальная террасная доска повышенной прочности с текстурой натурального дерева. Подходит для зон с интенсивной нагрузкой: бассейны, коммерческие террасы, причалы. Высокая устойчивость к влаге, солнцу и перепадам температур. Гарантия 30 лет.',
    shortDescription: 'Премиальная доска для зон с высокой нагрузкой',
    price: 1800,
    pricePerSquareMeter: 3600,
    images: [
      'https://deckson.ru/wp-content/uploads/2023/04/nw-premium-multicolor-brown.jpg',
      'https://alfakrov.com/upload/iblock/057/h2n4ncfgw9x4nkj0anj0txgqipkf5oo7.png'
    ],
    dimensions: {
      width: 150,
      length: 4000,
      thickness: 30
    },
    color: 'Венге',
    type: 'solid',
    purpose: ['Бассейн', 'Коммерческая терраса', 'Причал'],
    inStock: true,
    isPopular: true,
    isNew: false,
    specifications: {
      material: 'Древесно-полимерный композит премиум-класса',
      warranty: '30 лет',
      loadCapacity: '450 кг/м²',
      waterResistance: 'Очень высокая',
      uvResistance: 'Очень высокая',
      maintenanceRequired: 'Минимальное'
    }
  },
  {
    id: 'deck-003',
    name: 'Эко террасная доска',
    description: 'Экологичная террасная доска из переработанных материалов. Сочетает в себе заботу о природе и высокое качество. Подходит для любых наружных площадок. Легкая в монтаже, не выцветает, не гниет. Гарантия 20 лет.',
    shortDescription: 'Экологичная доска из переработанных материалов',
    price: 1500,
    pricePerSquareMeter: 3000,
    images: [
      'https://unionwood.ru/uploads/big/2897/2.jpg',
      'https://unionwood.ru/uploads/big/490/3.jpg'
    ],
    dimensions: {
      width: 135,
      length: 3000,
      thickness: 25
    },
    color: 'Тик',
    type: 'hollow',
    purpose: ['Терраса', 'Патио', 'Балкон'],
    inStock: true,
    isPopular: false,
    isNew: true,
    specifications: {
      material: 'Эко-композит (90% переработанных материалов)',
      warranty: '20 лет',
      loadCapacity: '320 кг/м²',
      waterResistance: 'Высокая',
      uvResistance: 'Высокая',
      maintenanceRequired: 'Минимальное'
    }
  },
  {
    id: 'deck-004',
    name: 'Slim террасная доска',
    description: 'Тонкая и легкая террасная доска для балконов, лоджий и небольших террас. Отличается малым весом и простотой монтажа. Не создает большой нагрузки на несущие конструкции. Устойчива к атмосферным воздействиям. Гарантия 15 лет.',
    shortDescription: 'Легкая и тонкая доска для балконов и лоджий',
    price: 950,
    pricePerSquareMeter: 2100,
    images: [
      'https://petrozavodsk.ksk24.ru/upload/iblock/4a8/palisandr.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSku58ngWB58jLrv6c27hFufikuGLn3ROXOYBNstDL-fIVAshRR_m54ksg2m3hclFySsmU&usqp=CAU'
    ],
    dimensions: {
      width: 120,
      length: 2400,
      thickness: 20
    },
    color: 'Серый',
    type: 'hollow',
    purpose: ['Балкон', 'Лоджия', 'Малая терраса'],
    inStock: true,
    isPopular: false,
    isNew: true,
    specifications: {
      material: 'Легкий древесно-полимерный композит',
      warranty: '15 лет',
      loadCapacity: '250 кг/м²',
      waterResistance: 'Средняя',
      uvResistance: 'Высокая',
      maintenanceRequired: 'Минимальное'
    }
  },
  {
    id: 'deck-005',
    name: 'Террасная доска Winter',
    description: 'Специальная террасная доска для регионов с суровым климатом. Устойчива к резким перепадам температур, снегу, льду. Имеет противоскользящее покрытие. Подходит для всесезонных террас, крылец, входных групп. Гарантия 25 лет.',
    shortDescription: 'Доска для регионов с суровым климатом',
    price: 1700,
    pricePerSquareMeter: 3400,
    images: [
      'https://avatars.mds.yandex.net/get-vh/4403011/2a0000019073a80aa7c228baaf8457e6f033/smart_crop_516x290',
      'https://latitudo.ru/upload/iblock/624/rpsvb2d3h02bdgx13wl0gmchpn6txkov.jpg'
    ],
    dimensions: {
      width: 145,
      length: 3000,
      thickness: 28
    },
    color: 'Графит',
    type: 'solid',
    purpose: ['Всесезонная терраса', 'Крыльцо', 'Входная группа'],
    inStock: true,
    isPopular: true,
    isNew: false,
    specifications: {
      material: 'Морозостойкий древесно-полимерный композит',
      warranty: '25 лет',
      loadCapacity: '400 кг/м²',
      waterResistance: 'Очень высокая',
      uvResistance: 'Высокая',
      maintenanceRequired: 'Минимальное',
      temperatureRange: 'от -50°C до +70°C'
    }
  },
  {
    id: 'deck-006',
    name: 'Фактурная террасная доска',
    description: 'Террасная доска с выраженной текстурой натурального дерева. Создает эффект массива древесины. Подходит для террас, беседок, зон отдыха. Высокая стойкость к выцветанию и механическим повреждениям. Гарантия 25 лет.',
    shortDescription: 'Доска с выраженной текстурой натурального дерева',
    price: 1600,
    pricePerSquareMeter: 3200,
    images: [
      'https://www.tophouse.ru/images/price/elementyi-ventilyatsii-doma/master-flesh-master-flash-uplotniteli-trub/916-big.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXPXw9kJS3bhFz9XIycOLxUcikvjA5bkov9O4I7gBYWEEVWppt9R95SFz2L2Kx_WQjl0&usqp=CAU'
    ],
    dimensions: {
      width: 140,
      length: 3000,
      thickness: 25
    },
    color: 'Дуб',
    type: 'solid',
    purpose: ['Терраса', 'Беседка', 'Зона отдыха'],
    inStock: true,
    isPopular: true,
    isNew: false,
    specifications: {
      material: 'Древесно-полимерный композит с технологией DeepWood',
      warranty: '25 лет',
      loadCapacity: '380 кг/м²',
      waterResistance: 'Высокая',
      uvResistance: 'Очень высокая',
      maintenanceRequired: 'Минимальное'
    }
  }
];

export default products;