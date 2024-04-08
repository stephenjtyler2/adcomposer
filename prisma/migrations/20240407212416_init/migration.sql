-- CreateEnum
CREATE TYPE "ImageOrigin" AS ENUM ('Generated', 'Uploaded');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('Backgrounds', 'Object');

-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('StaticImage', 'DynamicWeb', 'Social');

-- CreateEnum
CREATE TYPE "FontWeight" AS ENUM ('Standard', 'Bold');

-- CreateEnum
CREATE TYPE "FontStyle" AS ENUM ('Standard', 'Italic');

-- CreateEnum
CREATE TYPE "TextAlign" AS ENUM ('Left', 'Right', 'Center');

-- CreateEnum
CREATE TYPE "TextVerticalAlign" AS ENUM ('Top', 'Bottom', 'Center');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identity" (
    "id" SERIAL NOT NULL,
    "idpIdentityId" TEXT NOT NULL,
    "idpUrl" TEXT,
    "name" TEXT,
    "email" TEXT,
    "avatarImageUrl" TEXT,

    CONSTRAINT "Identity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "identityId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "resource" TEXT NOT NULL,
    "create" BOOLEAN NOT NULL,
    "read" BOOLEAN NOT NULL,
    "update" BOOLEAN NOT NULL,
    "delete" BOOLEAN NOT NULL,
    "execute" BOOLEAN NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "tenantId" INTEGER NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "imageType" "ImageType" NOT NULL DEFAULT 'Backgrounds',
    "imageOrigin" "ImageOrigin" NOT NULL,
    "prompt" TEXT,
    "createDate" TIMESTAMP(3),
    "createStatus" TEXT,
    "createdById" INTEGER NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "libraryId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdSet" (
    "id" SERIAL NOT NULL,
    "type" "AdType" NOT NULL,
    "name" TEXT NOT NULL,
    "libraryId" INTEGER,

    CONSTRAINT "AdSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" SERIAL NOT NULL,
    "adSetId" INTEGER NOT NULL,
    "targetMarket" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "backgroundImageId" INTEGER,
    "tagId" INTEGER,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdTextArea" (
    "id" SERIAL NOT NULL,
    "adId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "textAlign" "TextAlign" NOT NULL,
    "textVerticalAlign" "TextVerticalAlign" NOT NULL,
    "font" TEXT NOT NULL,
    "fontWeight" "FontWeight" NOT NULL,
    "fontStyle" "FontStyle" NOT NULL,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,

    CONSTRAINT "AdTextArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdCTAButton" (
    "id" SERIAL NOT NULL,
    "adId" INTEGER NOT NULL,
    "fillColor" TEXT NOT NULL,
    "outlineColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "font" TEXT NOT NULL,
    "fontWeight" "FontWeight" NOT NULL,
    "fontStyle" "FontStyle" NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,

    CONSTRAINT "AdCTAButton_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ImageToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ObjectsInAds" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_name_key" ON "Tenant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_idpIdentityId_key" ON "Identity"("idpIdentityId");

-- CreateIndex
CREATE UNIQUE INDEX "Library_tenantId_key" ON "Library"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "AdTextArea_adId_key" ON "AdTextArea"("adId");

-- CreateIndex
CREATE UNIQUE INDEX "AdCTAButton_adId_key" ON "AdCTAButton"("adId");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToUser_AB_unique" ON "_PermissionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToUser_B_index" ON "_PermissionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToTag_AB_unique" ON "_ImageToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToTag_B_index" ON "_ImageToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ObjectsInAds_AB_unique" ON "_ObjectsInAds"("A", "B");

-- CreateIndex
CREATE INDEX "_ObjectsInAds_B_index" ON "_ObjectsInAds"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "Identity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdSet" ADD CONSTRAINT "AdSet_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_adSetId_fkey" FOREIGN KEY ("adSetId") REFERENCES "AdSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdTextArea" ADD CONSTRAINT "AdTextArea_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdCTAButton" ADD CONSTRAINT "AdCTAButton_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToTag" ADD CONSTRAINT "_ImageToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToTag" ADD CONSTRAINT "_ImageToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjectsInAds" ADD CONSTRAINT "_ObjectsInAds_A_fkey" FOREIGN KEY ("A") REFERENCES "Ad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjectsInAds" ADD CONSTRAINT "_ObjectsInAds_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
