ALTER TABLE "cars" ADD COLUMN "is_installment" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "installment_term" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "installment" integer DEFAULT 0 NOT NULL;