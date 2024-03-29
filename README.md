# Jewelry store

Страница, которая отображает список товаров (id, название, цена, бренд) с пагинацией и возможностью филтрации по полям.

[Ссылка на демо](https://jewelry-store-kohl.vercel.app/)
## Требования:
- Node.js
- Npm

## Инструкция по запуску

1. Клонируйте репозиторий:

```
git clone https://github.com/TULENp/JewelryStore.git
```

2. Перейдите в папку проекта:

```
cd JewelryStore
```

3. Установите все зависимости:

```
npm install
```

4. Запустите приложение (В режиме разработки):

```
npm run dev
```
5. Перейдите по ссылке из терминала. Готово!


## Функции 

- Вывод по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны
- Отображение id, названия, цены и бренда каждого товара
- Возможность фильтровать выдачу по названию, цене или бренду
- Автоматическая фильтрация дублей товаров по ID
- Если API возвращает ошибку, ее идентификатор выводится в консоль и запрос повторяется

![demo](https://github.com/TULENp/JewelryStore/assets/83094079/71ed5411-4405-4c2e-aa57-0c1d0730856f)


