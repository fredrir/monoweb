import { createMigrator } from "@dotkomonline/db/src/migrator"
import { getLogger } from "@dotkomonline/logger"
import { Argument, program } from "commander"
import type { MigrationResultSet } from "kysely"
import { db } from "./db"

export const logger = getLogger("migrator")

program
  .name("migrator")
  .description("CLI to migrate OW database")
  .addArgument(
    new Argument("<action>", "Up, down or latest")
      .choices(["up", "down", "down-all", "latest"])
      .default("latest")
      .argOptional()
  )
  .option("-s, --with-seed", "Seed the database with fake data", false)
  .option("-f, --with-fixtures", "Add predictable data to the database", false)
  .option("-d, --sample-data", "Import sample data from OW4")
  .action(async (name: "down-all" | "down" | "latest" | "up", option) => {
    const migrator = createMigrator(db)
    let res: MigrationResultSet

    let handlesItself = false
    switch (name) {
      case "up": {
        res = await migrator.migrateUp()
        break
      }
      case "down": {
        res = await migrator.migrateDown()
        break
      }
      case "down-all": {
        handlesItself = true

        do {
          res = await migrator.migrateDown()
          if (res.results && !res.error) {
            for (const r of res.results) {
              logger.info(`${r.direction} ${r.migrationName}: ${r.status}`)
            }
          } else {
            break
          }
        } while (res.results.length > 0 && !res.results[0].migrationName.startsWith("0001"))

        if (res.error) {
          logger.error(`Failed to down all in migration "${res.results?.[0].migrationName}": ${res.error}`)
        }
        break
      }
      case "latest": {
        res = await migrator.migrateToLatest()
        break
      }
    }
    if (!handlesItself) {
      if (res.results) {
        const errorFmt = res.error ? `: '${res.error}'` : ""
        logger.info(
          `Migrating...\n${res.results
            .map((r, i) => `${i + 1}. ${r.direction} ${r.migrationName}: ${r.status}${errorFmt}`)
            .join("\n")}`
        )
      } else {
        logger.warn("%O", res)
      }
    }

    console.log(option)

    if (option.withSeed) {
      const { seed } = await import("./seed")
      await seed()
    }

    if (res.error) {
      console.dir(res.error, { depth: null })
      logger.warn("Error while running migrations:")
      logger.warn("%O", JSON.stringify(res.error))
      process.exit(1)
    }

    if (option.withFixtures) {
      const { runFixtures } = await import("./fixture")
      await runFixtures()
      logger.info("Successfully inserted fixtures")
    }

    if (option.sampleData) {
      const { runSampleData } = await import("./sample-data")

      await runSampleData()

      logger.info("Successfully inserted sample data")
    }

    process.exit()
  })

program.parse()
