
# 설치

```ssh
yarn install
```
# 실행
```ssh
yarn run dev
```

# 배포

docker buildx build --platform=linux/amd64,linux/arm64 -t jwjung5038/toons-front --push .