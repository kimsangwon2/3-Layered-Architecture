/*
  Warnings:

  - You are about to drop the column `refresh` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `resume` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `resume_name_key` ON `resume`;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `refresh`;

-- AlterTable
ALTER TABLE `resume` DROP COLUMN `name`;
