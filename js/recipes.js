const RECIPES = {
  // === ШОТЫ НА ВОДКЕ ===
  "«Боярский»": {
    ingredients: [
      { item: "Водка Царская", amount: "45 мл" },
      { item: "Табаско", amount: "2-3 капли" },
      { item: "Лимонный сок", amount: "5 мл" },
    ],
    serving: "Стопка 50 мл, пьётся залпом",
    secret: "Табаско капать в последнюю очередь, не перемешивать",
  },
  "«Чёрная метка»": {
    ingredients: [
      { item: "Водка Царская", amount: "30 мл" },
      { item: "Гренадин", amount: "15 мл" },
      { item: "Чёрный перец", amount: "щепотка" },
    ],
    serving: "Стопка 50 мл, слоями",
    secret: "Не мешать — пить так, чтобы гренадин попал последним",
  },
  "«Крещение»": {
    ingredients: [
      { item: "Водка Царская", amount: "30 мл" },
      { item: "Томатный сок", amount: "15 мл" },
      { item: "Лимонный сок", amount: "5 мл" },
      { item: "Соль", amount: "щепотка" },
    ],
    serving: "Стопка 50 мл, shaken (взболтать в шейкере со льдом)",
    secret: "Мини-кровавая Мэри. Холодный томатный сок обязательно",
  },
  "«Снежный барс»": {
    ingredients: [
      { item: "Водка Царская (морозилка)", amount: "50 мл" },
      { item: "Лимонный сок", amount: "5 мл" },
      { item: "Соль на кромку", amount: "по вкусу" },
    ],
    serving: "Стопка 50 мл с солёной кромкой",
    secret: "Водку минимум за 2 часа в морозилку",
  },
  "«Итальянец»": {
    ingredients: [
      { item: "Водка Царская", amount: "30 мл" },
      { item: "Гренадин", amount: "15 мл" },
      { item: "Лимонный сок", amount: "5 мл" },
    ],
    serving: "Стопка 50 мл, слоями",
    secret: "Красный снизу, прозрачный сверху — красиво смотрится",
  },
  "«Омерта»": {
    ingredients: [
      { item: "Водка Царская", amount: "40 мл" },
      { item: "Мятный сироп", amount: "8 мл" },
      { item: "Лимонный сок", amount: "2 мл" },
    ],
    serving: "Стопка 50 мл",
    secret: "Свежий мятный вкус, пьётся легко — опасная штука",
  },

  // === ШОТЫ НА ДЖИНЕ ===
  "«Джин-смак»": {
    ingredients: [
      { item: "Джин Barrister", amount: "35 мл" },
      { item: "Клюквенный сироп", amount: "10 мл" },
      { item: "Сок лайма", amount: "5 мл" },
    ],
    serving: "Стопка 50 мл",
    secret: "Кисло-сладкий, пьётся как конфета",
  },
  "«Бузина»": {
    ingredients: [
      { item: "Джин Barrister", amount: "35 мл" },
      { item: "Сироп бузины", amount: "10 мл" },
      { item: "Лимонный сок", amount: "5 мл" },
    ],
    serving: "Стопка 50 мл",
    secret: "Цветочный аромат, очень «дамский» — но крепкий",
  },
  "«Зелёный ангел»": {
    ingredients: [
      { item: "Джин Barrister", amount: "35 мл" },
      { item: "Мятный сироп", amount: "10 мл" },
      { item: "Sprite", amount: "5 мл" },
    ],
    serving: "Стопка 50 мл, подавать сразу",
    secret: "Газировка даёт лёгкое шипение, пить быстро",
  },
  "«Ботаник»": {
    ingredients: [
      { item: "Джин Barrister", amount: "30 мл" },
      { item: "Сироп бузины", amount: "8 мл" },
      { item: "Мятный сироп", amount: "5 мл" },
      { item: "Лимонный сок", amount: "7 мл" },
    ],
    serving: "Стопка 50 мл",
    secret: "Самый «ботанический» шот, для эстетов",
  },
  "«Сухой закон»": {
    ingredients: [
      { item: "Джин Barrister", amount: "40 мл" },
      { item: "Сок лайма", amount: "7 мл" },
      { item: "Гренадин", amount: "3 мл" },
    ],
    serving: "Стопка 50 мл",
    secret: "Почти чистый джин, но с кислинкой и розовым оттенком",
  },

  // === ШОТЫ НА JÄGER ===
  "Jäger ледяной": {
    ingredients: [{ item: "Jägermeister (морозилка)", amount: "50 мл" }],
    serving: "Стопка 50 мл",
    secret: "Бутылку в морозилку минимум на 4 часа",
  },
  "Jäger Bomb": {
    ingredients: [
      { item: "Jägermeister", amount: "50 мл" },
      { item: "Энергетик", amount: "250 мл" },
    ],
    serving: "Стопка бросается в бокал с энергетиком",
    secret: "Бросать аккуратно — энергетик пенится",
  },
  "«Чёрный лес»": {
    ingredients: [
      { item: "Jägermeister", amount: "30 мл" },
      { item: "Гренадин", amount: "10 мл" },
      { item: "Вишнёвый сок", amount: "10 мл" },
    ],
    serving: "Стопка 50 мл, слоями",
    secret: "Три слоя, тёмно-красный цвет",
  },
  "Jägerita": {
    ingredients: [
      { item: "Jägermeister", amount: "35 мл" },
      { item: "Сок лайма", amount: "10 мл" },
      { item: "Карамельный сироп", amount: "5 мл" },
    ],
    serving: "Стопка 50 мл с кромкой из сахара",
    secret: "Мафиозная маргарита — сладко, но крепко",
  },

  // === КОКТЕЙЛИ НА ВОДКЕ ===
  "Кровавая Мэри": {
    ingredients: [
      { item: "Водка Царская", amount: "50 мл" },
      { item: "Томатный сок", amount: "120 мл" },
      { item: "Лимонный сок", amount: "10 мл" },
      { item: "Табаско", amount: "2-3 капли" },
      { item: "Соль, перец", amount: "по вкусу" },
    ],
    serving: "Высокий стакан со льдом, гарнир — сельдерей или оливка",
    secret: "Взболтать в шейкере 10 секунд",
  },
  "Отвёртка": {
    ingredients: [
      { item: "Водка Царская", amount: "50 мл" },
      { item: "Апельсиновый сок", amount: "150 мл" },
    ],
    serving: "Высокий стакан со льдом, долька апельсина",
    secret: "Классика, ничего лишнего",
  },
  "Vodka Sunrise": {
    ingredients: [
      { item: "Водка Царская", amount: "50 мл" },
      { item: "Апельсиновый сок", amount: "150 мл" },
      { item: "Гренадин", amount: "15 мл" },
    ],
    serving: "Высокий стакан со льдом",
    secret: "Наливать: водка + сок, затем гренадин по ложке — градиент «рассвет»",
  },
  "Sex on the Beach": {
    ingredients: [
      { item: "Водка Царская", amount: "40 мл" },
      { item: "Апельсиновый сок", amount: "80 мл" },
      { item: "Клюквенный сок", amount: "80 мл" },
      { item: "Гренадин", amount: "10 мл" },
    ],
    serving: "Высокий стакан со льдом, долька апельсина и вишня",
    secret: "Гренадин лить последним по стенке",
  },
  "Moscow Mule": {
    ingredients: [
      { item: "Водка Царская", amount: "50 мл" },
      { item: "Sprite", amount: "150 мл" },
      { item: "Лайм", amount: "сок половинки" },
    ],
    serving: "Медная кружка или высокий стакан со льдом",
    secret: "Имбирного пива нет, заменяем Sprite",
  },
  "Vodka Tonic": {
    ingredients: [
      { item: "Водка Царская", amount: "50 мл" },
      { item: "Тоник Schweppes", amount: "150 мл" },
      { item: "Лайм", amount: "долька" },
    ],
    serving: "Высокий стакан со льдом",
    secret: "Просто и элегантно",
  },

  // === КОКТЕЙЛИ НА ДЖИНЕ ===
  "Gin & Tonic": {
    ingredients: [
      { item: "Джин Barrister", amount: "50 мл" },
      { item: "Тоник Schweppes", amount: "150 мл" },
      { item: "Огурец или лайм", amount: "1-2 ломтика" },
    ],
    serving: "Высокий стакан со льдом",
    secret: "Гарнир по выбору гостя",
  },
  "Gin Fizz": {
    ingredients: [
      { item: "Джин Barrister", amount: "50 мл" },
      { item: "Лимонный сок", amount: "25 мл" },
      { item: "Сироп", amount: "15 мл" },
      { item: "Sprite / содовая", amount: "100 мл" },
    ],
    serving: "Высокий стакан со льдом",
    secret: "Взболтать джин с соком и сиропом, потом долить газировку",
  },
  "Tom Collins": {
    ingredients: [
      { item: "Джин Barrister", amount: "50 мл" },
      { item: "Лимонный сок", amount: "25 мл" },
      { item: "Сахарный сироп", amount: "15 мл" },
      { item: "Содовая", amount: "100 мл" },
    ],
    serving: "Высокий стакан со льдом, долька лимона и вишня",
    secret: "Длинный, освежающий коктейль",
  },
  "Gimlet": {
    ingredients: [
      { item: "Джин Barrister", amount: "60 мл" },
      { item: "Лаймовый сироп", amount: "30 мл" },
      { item: "Сок лайма", amount: "10 мл" },
    ],
    serving: "Коктейльная рюмка или стакан со льдом",
    secret: "Строгий, мужской коктейль",
  },
  "Bees Knees": {
    ingredients: [
      { item: "Джин Barrister", amount: "50 мл" },
      { item: "Мёд жидкий", amount: "15 мл" },
      { item: "Лимонный сок", amount: "20 мл" },
    ],
    serving: "Коктейльная рюмка (shake со льдом, процедить)",
    secret: "Мёд растворить в горячей воде перед шейком",
  },

  // === КОКТЕЙЛИ НА JÄGER ===
  "Jäger & Tonic": {
    ingredients: [
      { item: "Jägermeister", amount: "50 мл" },
      { item: "Тоник Schweppes", amount: "150 мл" },
      { item: "Лайм", amount: "долька" },
    ],
    serving: "Высокий стакан со льдом",
    secret: "Неожиданно хорошо сочетается",
  },
  "Jäger & Sprite": {
    ingredients: [
      { item: "Jägermeister", amount: "50 мл" },
      { item: "Sprite", amount: "150 мл" },
      { item: "Лайм", amount: "долька" },
    ],
    serving: "Высокий стакан со льдом",
    secret: "Лёгкий, шипучий, для тех кто не любит чистый Jäger",
  },
};