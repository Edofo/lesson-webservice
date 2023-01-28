-- CreateTable
CREATE TABLE "Student" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "classUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Class" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "teacherUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Subject" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "classUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Grade" (
    "uuid" TEXT NOT NULL,
    "value" DECIMAL(2,2) NOT NULL,
    "date" DATE NOT NULL,
    "studentUuid" TEXT NOT NULL,
    "subjectUuid" TEXT NOT NULL,
    "teacherUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classUuid_fkey" FOREIGN KEY ("classUuid") REFERENCES "Class"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherUuid_fkey" FOREIGN KEY ("teacherUuid") REFERENCES "Teacher"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classUuid_fkey" FOREIGN KEY ("classUuid") REFERENCES "Class"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES "Student"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_subjectUuid_fkey" FOREIGN KEY ("subjectUuid") REFERENCES "Subject"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_teacherUuid_fkey" FOREIGN KEY ("teacherUuid") REFERENCES "Teacher"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
