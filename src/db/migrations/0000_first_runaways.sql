CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"device_token" text,
	CONSTRAINT "user_device_token_unique" UNIQUE("device_token")
);
