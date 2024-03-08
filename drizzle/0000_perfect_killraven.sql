CREATE TABLE IF NOT EXISTS "game_result" (
	"id" uuid PRIMARY KEY NOT NULL,
	"guild_id" varchar(20) NOT NULL,
	"win_user_id" uuid NOT NULL,
	"lose_user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_rating_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_rating_id" uuid NOT NULL,
	"game_result_id" uuid,
	"rating" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_rating" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" varchar(20) NOT NULL,
	"guild_id" varchar(20) NOT NULL,
	"rating" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_rating_guild_id_user_id_unique" UNIQUE("guild_id","user_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "game_result_guild_id_index" ON "game_result" ("guild_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_rating_guild_id_rating_index" ON "user_rating" ("guild_id","rating");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_result" ADD CONSTRAINT "game_result_win_user_id_user_rating_id_fk" FOREIGN KEY ("win_user_id") REFERENCES "user_rating"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_result" ADD CONSTRAINT "game_result_lose_user_id_user_rating_id_fk" FOREIGN KEY ("lose_user_id") REFERENCES "user_rating"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating_history" ADD CONSTRAINT "user_rating_history_user_rating_id_user_rating_id_fk" FOREIGN KEY ("user_rating_id") REFERENCES "user_rating"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating_history" ADD CONSTRAINT "user_rating_history_game_result_id_game_result_id_fk" FOREIGN KEY ("game_result_id") REFERENCES "game_result"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
