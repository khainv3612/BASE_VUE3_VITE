# base-vue3-vite

## Build Setup

```bash
# pnpm install address https://pnpm.io/installation
npm -g i pnpm

# install dependency(Recommend use pnpm)
# you can  use "npm -g i pnpm" to install pnpm 
pnpm i

# develop
pnpm dev
```

using the browser to open http://localhost:8000

## Build

```bash
# build for test environment
pnpm run build-test

# build for production environment
pnpm run  build
```

## Others

```bash
# preview the release environment effect
pnpm run preview

# code format check
pnpm run lint

```

## Browsers support

Note: Vue3 is not supported the Internet Explorer


## Quy tắc đặt tên:
- Các biến sẽ đặt theo kiểu camelCase với ký tự viết thường ở đầu, các từ sau viết HOA chữ cái đầu.
  VD:  const firstName = 'AmaiSoft'
- Các biến theo kiểu dữ liệu boolean sẽ đặt thêm tiền tố is ở đầu.
  VD: const isNumber = true
  Quy tắc đặt tên function:
- Các functionon sẽ đặt theo kiểu camelCase với ký tự viết thường ở đầu, các từ sau viết HOA chữ cái đầu, tên hàm phải bắt đầu = động từ và thể hiện vai trò của hàm đó.
  VD: const getName = () => { console.log('getName') }
  Quy tắc đặt tên class:
- các class đặt tên theo kiểu PascalCase
  VD: class SoftwareDeveloper()  
  Quy tắc đặt tên component:
- các component sẽ đặt theo kiểu PascalCase
  VD: UserProfile
  Quy tăc đặt tên CONSTANT sẽ viết in hoa(UPPERCASE) toàn bộ
  VD: const SECONDS = 60;
  Quy tắc đặt tên cho forder :
- các forder dẽ đặt tên theo kiểu kebab-case


## Cấu trúc thư mục dự án
You can create the following extra directories, some of which have special behaviors. Only `view` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.


### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.


### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.


### `views`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.


### `utils`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

## Quy tắc apply class Tailwind vào file css/scss

- `@apply` + class_name 
- `@apply` phải nằm ở dòng cuối cùng của class (dòng cuối cùng để kết thúc class, trước khi đóng `}`)
- Nếu muốn kết hợp với `!important` thì thêm `#{!important}` vào cuối khi kết thúc `@apply` (Lưu ý là tất cả các class được apply sẽ đều là `!important`)
