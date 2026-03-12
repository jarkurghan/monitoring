# -----------------------------------------------------------------------------
# Stage 1: Dependency Installation & Standalone Build
# -----------------------------------------------------------------------------
# Using oven/bun:1.3-slim as requested
FROM oven/bun:1.3-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files (ensure these files exist in your context)
COPY package.json bun.lock ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# Copy application source code
COPY . .

# Run the Next.js build
# Ensure next.config.js has { output: 'standalone' }
RUN bun run build

# -----------------------------------------------------------------------------
# Stage 2: Runtime / Runner (Runs as Default User/Root)
# -----------------------------------------------------------------------------
FROM oven/bun:1.3-slim AS runner

# Set working directory to the app directory
WORKDIR /app

# Create necessary Next.js cache directory (as the default user)
RUN mkdir -p /app/.next/cache

# Copy the build output from the builder stage
COPY --from=builder /app/.next/standalone ./
# Copy static files and public folder (required for Next.js standalone)
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Copy cache directory 
COPY --from=builder /app/.next/cache ./.next/cache

# Note: Application runs as the default user (typically root) for the base image, 
# as requested by the removal of the user creation logic.

# Set the environment variable for the Next.js runtime
ENV NODE_ENV=production

# Expose the default Next.js port
EXPOSE 3000

# Command to run the Next.js server using Bun
CMD ["bun", "server.js"]
