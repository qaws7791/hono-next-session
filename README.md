# Nextjs Session Authentication

This repository implements authentication using session cookies between separate backend and frontend servers. NEXTJS is fully capable of being used as a full-stack web application, but in many cases, the backend and front are developed and deployed separately. This project separates the backend and front servers for such cases

- Server side authentication using session
- Hono backend server, Nextjs frontend
- Email and password authentication
- SQLite database for lightweight development
- Password hashing with Argon2id(argon2id is the recommended algorithm for password hashing)

<div>
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/hono-E36002?style=for-the-badge&logo=hono&logoColor=white"/>
<img src="https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black">
<img src="https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white">
</div>

## Getting Started

### Backend(Hono)

`npx drizzle-kit migrate` will generate `test.db` for local development (docs: https://orm.drizzle.team/docs/kit-overview)

```bash
cd backend
npm install
npx drizzle-kit migrate
npm run dev
```

server will be running on http://localhost:4000

### Frontend(Nextjs)

```bash
cd frontend
npm install
npm run dev
```

server will be running on http://localhost:3000

## References

### Frontend(Nextjs)

- https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
- https://nextjs.org/docs/app/building-your-application/routing/middleware

### Backend(Hono)

- https://github.com/lucia-auth/examples/tree/main/hono/username-and-password
- https://lucia-auth.com/
- https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
