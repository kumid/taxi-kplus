CREATE TABLE "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"model" text DEFAULT '' NOT NULL,
	"ctc" text DEFAULT '' NOT NULL,
	"year" integer DEFAULT 2025 NOT NULL,
	"organization" text DEFAULT '' NOT NULL,
	"summa_buy" double precision DEFAULT 0 NOT NULL,
	"summa_sell" double precision DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'Не выбрано' NOT NULL,
	"buy_price" double precision DEFAULT 0 NOT NULL,
	"buy_terms" double precision DEFAULT 0 NOT NULL,
	"first_payment" integer DEFAULT 0 NOT NULL,
	"payment_day" integer DEFAULT 1 NOT NULL,
	"payment" integer DEFAULT 0 NOT NULL,
	"customerName" text DEFAULT '' NOT NULL,
	"customerPhone" text DEFAULT '' NOT NULL,
	"customerAddress" text DEFAULT '' NOT NULL,
	"customerPassport" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "numbers" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date,
	"gov_number" text DEFAULT '' NOT NULL,
	"comment" text,
	"carId" integer
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text,
	"date" date,
	"sum" double precision DEFAULT 0 NOT NULL,
	"carId" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"status" boolean DEFAULT false NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "numbers" ADD CONSTRAINT "numbers_carId_cars_id_fk" FOREIGN KEY ("carId") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_carId_cars_id_fk" FOREIGN KEY ("carId") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;