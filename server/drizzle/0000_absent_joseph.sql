CREATE TABLE "cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"rate" double precision DEFAULT 5 NOT NULL,
	"offer_short" text DEFAULT '' NOT NULL,
	"offer_short_sum" text DEFAULT '' NOT NULL,
	"grace_period" text DEFAULT '' NOT NULL,
	"service" text DEFAULT '' NOT NULL,
	"opening_card" text DEFAULT '' NOT NULL,
	"cashback" text DEFAULT '' NOT NULL,
	"release_date" text DEFAULT '' NOT NULL,
	"credits" text DEFAULT '' NOT NULL,
	"additionally" text DEFAULT '' NOT NULL,
	"registration" text DEFAULT '' NOT NULL,
	"term" text DEFAULT '' NOT NULL,
	"approval" text DEFAULT '' NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"advantage" text DEFAULT '' NOT NULL,
	"loan_sum" text DEFAULT '' NOT NULL,
	"age" text DEFAULT '' NOT NULL,
	"docs" text DEFAULT '' NOT NULL,
	"schedule" text DEFAULT '' NOT NULL,
	"license" text DEFAULT '' NOT NULL,
	"offer_detail" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"active" text DEFAULT '' NOT NULL,
	"site" text DEFAULT '' NOT NULL,
	"lang" text DEFAULT 'ru' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"model" text DEFAULT '' NOT NULL,
	"ctc" text DEFAULT '' NOT NULL,
	"year" integer DEFAULT 2025 NOT NULL,
	"organization" text DEFAULT '' NOT NULL,
	"summa_buy" double precision DEFAULT 0 NOT NULL,
	"summa_sell" double precision DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'bought' NOT NULL,
	"buy_price" double precision DEFAULT 0 NOT NULL,
	"buy_terms" double precision DEFAULT 0 NOT NULL,
	"payment_day" integer DEFAULT 1 NOT NULL,
	"customerName" text DEFAULT '' NOT NULL,
	"customerPhone" text DEFAULT '' NOT NULL,
	"customerAddress" text DEFAULT '' NOT NULL,
	"customerPassport" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loans" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"rate" double precision DEFAULT 5 NOT NULL,
	"offer_short" text DEFAULT '' NOT NULL,
	"offer_short_sum" text DEFAULT '' NOT NULL,
	"grace_period" text DEFAULT '' NOT NULL,
	"service" text DEFAULT '' NOT NULL,
	"opening_card" text DEFAULT '' NOT NULL,
	"cashback" text DEFAULT '' NOT NULL,
	"release_date" text DEFAULT '' NOT NULL,
	"credits" text DEFAULT '' NOT NULL,
	"additionally" text DEFAULT '' NOT NULL,
	"registration" text DEFAULT '' NOT NULL,
	"term" text DEFAULT '' NOT NULL,
	"approval" text DEFAULT '' NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"advantage" text DEFAULT '' NOT NULL,
	"loan_sum" text DEFAULT '' NOT NULL,
	"age" text DEFAULT '' NOT NULL,
	"docs" text DEFAULT '' NOT NULL,
	"schedule" text DEFAULT '' NOT NULL,
	"license" text DEFAULT '' NOT NULL,
	"offer_detail" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"active" text DEFAULT '' NOT NULL,
	"site" text DEFAULT '' NOT NULL,
	"lang" text DEFAULT 'ru' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "numbers" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT '' NOT NULL,
	"gov_number" text DEFAULT '' NOT NULL,
	"comment" text,
	"carId" integer
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text DEFAULT '' NOT NULL,
	"date" date DEFAULT '' NOT NULL,
	"sum" double precision DEFAULT 0 NOT NULL,
	"carId" integer
);
--> statement-breakpoint
ALTER TABLE "numbers" ADD CONSTRAINT "numbers_carId_cars_id_fk" FOREIGN KEY ("carId") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_carId_cars_id_fk" FOREIGN KEY ("carId") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;