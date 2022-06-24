CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "userName" TEXT NOT NULL UNIQUE,
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

CREATE TABLE "links" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL, 
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
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
    "linkId" INTEGER NOT NULL REFERENCES links(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes" (
    "id" SERIAL PRIMARY KEY,
    "publicationId" INTEGER NOT NULL REFERENCES publications(id),
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE publications
  ADD CONSTRAINT fk_links_id
  FOREIGN KEY ("linkId") 
  REFERENCES links(id) 
  ON DELETE CASCADE;

ALTER TABLE likes
  ADD CONSTRAINT fk_publication_id 
  FOREIGN KEY ("publicationId") 
  REFERENCES publications(id) 
  ON DELETE CASCADE;

ALTER TABLE "publicationHashtag"
  ADD CONSTRAINT fk_publication_id 
  FOREIGN KEY ("publicationId") 
  REFERENCES publications(id) 
  ON DELETE CASCADE;

CREATE TABLE followers( 
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "followerId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE repost( 
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "publicationId" INTEGER NOT NULL REFERENCES publications(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);