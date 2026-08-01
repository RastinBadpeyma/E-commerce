
## Project Structure

```
e-commerce/
├── apps/
│   └── api/                     
│       ├── prisma/             
│       │   ├── schema.prisma
│       │   └── migrations/
│       └── src/
│           ├── main.ts
│           ├── app.module.ts
│           ├── infrastructure/   # Shared infrastructure (Prisma)
│           └── modules/
│               
│               
├── packages/
│   ├── config/                   # Shared TypeScript configuration
│   └── eslint-config/            # Shared ESLint configuration
├── turbo.json                    # Turborepo pipeline configuration
└── pnpm-workspace.yaml           # pnpm workspace definition
```

## Getting Started


### Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd E-commerce
```

2. Install dependencies:

```sh
pnpm install
```

3. Set up environment variables. Create a `.env` file in `apps/api/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/<Your_Database_Name>"
```

4. Run database migrations:

```sh
cd apps/api
pnpm prisma migrate dev
```

5. Start the development server:

```sh
pnpm dev
```

The API will be available at `http://localhost:3000`.

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm check-types` | Type-check all packages |
| `pnpm format` | Format code with Prettier |

You can also run commands for specific packages using Turborepo filters:

```sh
pnpm turbo dev --filter=@ecommerce/api
pnpm turbo build --filter=@ecommerce/api
```

## Architecture

This project follows Clean Architecture principles with clear separation of concerns between domain logic, application use cases, and infrastructure.

### Hexagonal Architecture (Product Module)

The Product module implements Hexagonal Architecture (Ports & Adapters pattern):

```
core/
├── domain/
│   ├── entities/          # Business entities
│   └── errors/            # Domain-specific errors
├── ports/
│   ├── inbound/           # Use case interfaces (driving)
│   └── outbound/          # Repository interfaces (driven)
└── application/
    └── use-cases/         # Business logic implementations

adapters/
├── driving/
│   └── rest/              # REST controllers (inbound adapters)
└── driven/
    └── prisma/            # Prisma repositories (outbound adapters)
```

- **Ports** define interfaces for what the domain needs (inbound) and what it provides (outbound)
- **Adapters** implement these interfaces for specific technologies (REST, Prisma)
- **Domain entities** contain pure business logic with no framework dependencies

### Clean Architecture (Identity Module)

The Identity module follows a layered architecture:

```
domain/
├── entities/              # User, Otp, RefreshToken
├── repositories/          # Repository interfaces
└── errors/                # Domain errors

application/
├── interfaces/            # Service contracts
├── use-cases/             # Business operations
└── services/              # Application services

infrastructure/
├── repositories/          # Prisma implementations
├── services/              # JWT, Hash, OTP services
└── policies/              # OTP and Token policies

presentation/
└── auth.controller.ts     # REST endpoints
```

### Dependency Rule

Domain and business logic remain independent from frameworks and infrastructure:

- Domain layers do not import NestJS decorators, Prisma models, or Express objects
- Dependencies point toward the domain, not away from it
- Infrastructure implements interfaces defined by the domain

## Modules

### Identity Module

Handles authentication using OTP-based login with JWT tokens.

**Endpoints:**

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/request-otp` | Request an OTP code for a phone number |
| POST | `/auth/verify-otp` | Verify OTP and receive tokens |
| POST | `/auth/refresh-token` | Refresh an expired access token |

**Domain Entities:**

- `User` - User accounts with phone number and role (ADMIN, CUSTOMER)
- `OtpCode` - One-time password codes with expiration
- `RefreshToken` - Token management with revocation support

**Infrastructure Services:**

- JWT token generation and validation
- Password hashing
- OTP generation and verification
- Token policies for OTP and refresh token configuration

### Product Module

Manages product catalog with CRUD operations.

**Endpoints:**

| Method | Path | Description |
|--------|------|-------------|
| POST | `/products` | Create a new product |
| GET | `/products` | List products with cursor-based pagination |
| GET | `/products/:slug` | Get a product by its slug |

**Domain Entity:**

- `Product` - Product with title, slug, description, price, quantity, and status (ACTIVE, INACTIVE, OUT_OF_STOCK)

**Business Rules:**

- Product slug must be unique
- Price must be a positive decimal
- Quantity must be a non-negative integer

## Database

The project uses PostgreSQL with Prisma ORM. The database schema is organized into two schemas:

- `identity` - User accounts, OTP codes, and refresh tokens
- `product` - Product catalog

### Prisma Commands

```sh
# Navigate to the API directory
cd apps/api

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Reset database
pnpm prisma migrate reset
```

### Schema Overview

```prisma
// Identity schema
model User { ... }
model OtpCode { ... }
model RefreshToken { ... }

// Product schema
model Product { ... }
```

The full schema is defined in `apps/api/prisma/schema.prisma`.

## Packages

### @ecommerce/config

Shared TypeScript configuration used across all packages and apps.

### eslint-config

Shared ESLint configuration with consistent linting rules.

