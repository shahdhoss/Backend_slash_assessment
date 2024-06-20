-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersOnProducts" (
    "userId" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,

    CONSTRAINT "usersOnProducts_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" BIGSERIAL NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "arrivalDate" TIMESTAMP(3),
    "status" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordersOnProducts" (
    "orderId" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,

    CONSTRAINT "ordersOnProducts_pkey" PRIMARY KEY ("orderId","productId")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartsOnProducts" (
    "cartId" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "cartsOnProducts_pkey" PRIMARY KEY ("cartId","productId")
);

-- CreateTable
CREATE TABLE "userLocations" (
    "userId" BIGINT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "userLocations_pkey" PRIMARY KEY ("location")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "carts_userId_key" ON "carts"("userId");

-- AddForeignKey
ALTER TABLE "usersOnProducts" ADD CONSTRAINT "usersOnProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnProducts" ADD CONSTRAINT "usersOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordersOnProducts" ADD CONSTRAINT "ordersOnProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordersOnProducts" ADD CONSTRAINT "ordersOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartsOnProducts" ADD CONSTRAINT "cartsOnProducts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartsOnProducts" ADD CONSTRAINT "cartsOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLocations" ADD CONSTRAINT "userLocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CREATE OR REPLACE FUNCTION create_cart_for_new_user()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     INSERT INTO "carts" ("userId")
--     VALUES (NEW.id);
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Create the trigger
-- CREATE TRIGGER after_user_insert
-- AFTER INSERT ON "users"
-- FOR EACH ROW
-- EXECUTE FUNCTION create_cart_for_new_user();