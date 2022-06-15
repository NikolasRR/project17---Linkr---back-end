CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "publications" (
    "id" SERIAL PRIMARY KEY,
    "idUser" INTEGER NOT NULL REFERENCES users(id),
    "content" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags" (
    "id" SERIAL PRIMARY KEY,
    "count" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "publicationHashtag" (
    "id" SERIAL PRIMARY KEY,
    "publicationId" INTEGER NOT NULL REFERENCES publications(id),
    "hashtagId" INTEGER NOT NULL REFERENCES hashtags(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes" (
    "id" SERIAL PRIMARY KEY,
    "publicationId" INTEGER NOT NULL REFERENCES publications(id),
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
