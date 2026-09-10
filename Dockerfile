FROM node:16.20.2

WORKDIR /app

# Install production dependencies using the lock file.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copy the files needed to run the application.
COPY app.js greeting.js ./

# Run the application as the non-root Node user.
USER node

EXPOSE 8080

CMD ["node", "app.js"]
