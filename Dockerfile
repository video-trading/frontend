FROM node:18-alpine as builder

ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

ENV NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

RUN apk add --no-cache python3 py3-pip
RUN apk update && apk add make g++ && rm -rf /var/cache/apk/*
# Install pnpm
RUN npm install -g pnpm

WORKDIR /app/

COPY . .
RUN pnpm install
RUN pnpm build

FROM node:18-alpine

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

WORKDIR /app/
# copy from build image
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY  --from=builder /app/i18n.js ./i18n.js
COPY --from=builder /app/docs ./docs

EXPOSE 3000

CMD ["yarn", "start"]