CREATE TABLE IF NOT EXISTS "game_result" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ulid" varchar(26) PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"guild_id" varchar(26) NOT NULL,
	"loser_user_id" varchar(26) NOT NULL,
	"rating_type_id" varchar(26) NOT NULL,
	"winner_user_id" varchar(26) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guild" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ulid" varchar(26) PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"discord_id" varchar(20) NOT NULL,
	CONSTRAINT "guild_discord_id_unique" UNIQUE("discord_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rating_type" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ulid" varchar(26) PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"guild_id" varchar(26) NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "unique_name_per_guild" UNIQUE NULLS NOT DISTINCT("guild_id","name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ulid" varchar(26) PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"discord_id" varchar(20) NOT NULL,
	CONSTRAINT "user_discord_id_unique" UNIQUE("discord_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_rating" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ulid" varchar(26) PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"guild_id" varchar(26) NOT NULL,
	"rating" bigint DEFAULT 1500 NOT NULL,
	"rating_type_id" varchar(26) NOT NULL,
	"user_id" varchar(26) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_rating_history" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ulid" varchar(26) PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"game_result_id" varchar(26) NOT NULL,
	"rating" bigint NOT NULL,
	"user_rating_id" varchar(26) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_result" ADD CONSTRAINT "game_result_guild_id_guild_ulid_fk" FOREIGN KEY ("guild_id") REFERENCES "guild"("ulid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_result" ADD CONSTRAINT "game_result_loser_user_id_user_ulid_fk" FOREIGN KEY ("loser_user_id") REFERENCES "user"("ulid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_result" ADD CONSTRAINT "game_result_rating_type_id_rating_type_ulid_fk" FOREIGN KEY ("rating_type_id") REFERENCES "rating_type"("ulid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_result" ADD CONSTRAINT "game_result_winner_user_id_user_ulid_fk" FOREIGN KEY ("winner_user_id") REFERENCES "user"("ulid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating_type" ADD CONSTRAINT "rating_type_guild_id_guild_ulid_fk" FOREIGN KEY ("guild_id") REFERENCES "guild"("ulid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_guild_id_guild_ulid_fk" FOREIGN KEY ("guild_id") REFERENCES "guild"("ulid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_rating_type_id_rating_type_ulid_fk" FOREIGN KEY ("rating_type_id") REFERENCES "rating_type"("ulid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_user_id_user_ulid_fk" FOREIGN KEY ("user_id") REFERENCES "user"("ulid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating_history" ADD CONSTRAINT "user_rating_history_game_result_id_game_result_ulid_fk" FOREIGN KEY ("game_result_id") REFERENCES "game_result"("ulid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_rating_history" ADD CONSTRAINT "user_rating_history_user_rating_id_user_ulid_fk" FOREIGN KEY ("user_rating_id") REFERENCES "user"("ulid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
