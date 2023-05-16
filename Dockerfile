FROM node:18-alpine as builder

RUN apk add --no-cache python3 py3-pip
RUN apk update && apk add make g++ && rm -rf /var/cache/apk/*
# Install pnpm
RUN npm install -g pnpm

WORKDIR /app/

COPY . .
RUN pnpm install
RUN pnpm build


FROM node:18-alpine
WORKDIR /app/
# copy from build image
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY  --from=builder /app/i18n.js ./i18n.js

EXPOSE 3000

CMD ["yarn", "start"]