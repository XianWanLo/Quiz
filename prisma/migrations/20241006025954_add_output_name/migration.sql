-- CreateTable
CREATE TABLE "GameMetrics" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "timeSpent" DOUBLE PRECISION NOT NULL,
    "deviceType" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageViews" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "deviceType" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageViews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageResponseTimes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "responseTime" DOUBLE PRECISION NOT NULL,
    "deviceType" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageResponseTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionResponses" (
    "id" SERIAL NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedAnswer" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionResponses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputRepetitions" (
    "id" SERIAL NOT NULL,
    "output_id" INTEGER NOT NULL,
    "output_name" TEXT NOT NULL DEFAULT '',
    "count" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutputRepetitions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageViews_page_userId_deviceType_channel_key" ON "PageViews"("page", "userId", "deviceType", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
