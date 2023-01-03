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

## Nguyên tắc thiết kế component

- Tư tưởng: Luôn phát triển theo thiên hướng tái sử dụng code và hạn chế tối đa code thừa, code xử lý vấn đề thường gặp
  ở nhiều nơi nhưng không được viết thành common hoặc service

- Hạn chế thao tác trực tiếp với data trong store thông qua store() mà nên xử lý thông qua service để tránh dư thừa,
  phân tán dữ liệu, đồng thời kiểm soát data theo một chiều thống nhất :
  `Component/View/Utils <=data=> Service/Mixin <=data=> Store`

- Không được khai báo hay import variables/component/service/... mà không sử dụng

- Sử dụng những element common trong `src/components/element-common`

- Sử dụng những component common trong `src/components/component-common` theo đúng structure:

## Lưu ý / Hướng dẫn khi import element/component-common

### `Dialog Common`

- Không cần khởi tạo biến trạng thái open/close của dialog, chỉ cần override function `handleOpen`,
  `handleClose` với callback là function `open()`, `close()` của common

- Có thể thay đổi `title` hoặc ẩn title tùy nhu cầu

### `Toast Common`

- Thay đổi msg, có thể truyền `isShow` để ẩn/hiện toast (not required)