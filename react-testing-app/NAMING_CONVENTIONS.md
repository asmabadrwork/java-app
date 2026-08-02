# Naming Conventions

This project follows strict naming conventions to maintain codebase consistency, readability, and predictability.

## 1. Components
React components should be written in **PascalCase**.
- **Example**: `UserProfile.tsx`, `DashboardButton.tsx`

## 2. Variables and Functions
Variables, boolean flags, and function names should be written in **camelCase**.
- **Example**: `isLoaded`, `fetchData()`, `userList`

## 3. Files and Directories
- **Component Files**: Use **PascalCase** for files containing React components (e.g., `UserCard.tsx`).
- **Utility/API Files**: Use **kebab-case** or **camelCase** (e.g., `api-utils.ts`, `auth.ts`).
- **Directories**: Use **kebab-case** for most directories, or Next.js App Router conventions (e.g., `components`, `app`, `api`, `users`).

## 4. Types and Interfaces
TypeScript types and interfaces should use **PascalCase**. Do not prefix interfaces with `I`.
- **Example**: `UserProfile`, `AppConfig` (Not `IUserProfile`).

## 5. CSS Modules
CSS Modules should use **camelCase** for class names.
- **Example**: `.buttonPrimary`, `.containerBox`
