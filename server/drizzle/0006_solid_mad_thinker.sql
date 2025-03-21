ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "status" SET NOT NULL;