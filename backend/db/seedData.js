// db/seedData.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mysql = require("mysql2/promise");

const racesData = [
  {
    race_name: "Eldorians",
    kingdom: "Kingdom of Eldoria",
    description:
      "Graceful and wise forest dwellers, renowned for their architectural beauty and deep connection to nature. They are inspired by Calliope, goddess of crafts and nature's growth.",
    bonus: {
      culture: "+10 to Artistry and Architecture",
      economy: "+5% resource yield from forests and gardens",
      defense: "+10% resistance to corruption and decay",
    },
    starting_units: ["Forest Wardens", "Artisan Builders"],
    divine_patron: "Calliope",
  },
  {
    race_name: "Solarians",
    kingdom: "Empire of Solis",
    description:
      "Ambitious and passionate sun-born people empowered by Helios, god of the sun. They are builders of radiant cities and fervent warriors of light.",
    bonus: {
      military: "+5% combat strength during daytime",
      culture: "+10 to Religious Unity",
      economy: "+10% production from solar energy structures",
    },
    starting_units: ["Sunblade Legionnaires", "Lightbound Priests"],
    divine_patron: "Helios",
  },
  {
    race_name: "Masons",
    kingdom: "Stonehelm",
    description:
      "Stalwart mountainfolk known for their master craftsmanship and indomitable fortresses. Guided by Aegis, god of protection.",
    bonus: {
      defense: "+10% wall durability",
      production: "+5% forging speed for armor and weapons",
      loyalty: "+10 to Civic Order",
    },
    starting_units: ["Shieldbearers", "Stoneforge Engineers"],
    divine_patron: "Aegis",
  },
  {
    race_name: "Maritans",
    kingdom: "Coastal Isles of Meridia",
    description:
      "Seafaring merchants and pirates blessed by Elysia, goddess of the sea and dreams. Their charm and cunning rule the waves.",
    bonus: {
      naval: "+10% ship speed and cargo capacity",
      diplomacy: "+10 to Trade and Influence",
      espionage: "+10 to Concealment and Counter-intelligence",
    },
    starting_units: ["Sea Blades", "Charmcasters"],
    divine_patron: "Elysia",
  },
  {
    race_name: "Zephyrians",
    kingdom: "Tribes of Zephyria",
    description:
      "Nomadic windrunners of the open plains, swift and agile, guided by Zephyrus, god of messengers and travelers.",
    bonus: {
      mobility: "+5% movement speed for all units",
      scouting: "+10% visibility range",
      logistics: "+10% faster construction of outposts",
    },
    starting_units: ["Skyrunners", "Windshapers"],
    divine_patron: "Zephyrus",
  },
];

async function seedRaces() {
  let pool;
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log("Seeding races...");

    for (const race of racesData) {
      const {
        race_name,
        kingdom,
        description,
        bonus,
        starting_units,
        divine_patron,
      } = race;

      // The ON DUPLICATE KEY UPDATE part prevents creating duplicate entries if you run the script again
      const query = `
        INSERT INTO races (race_name, kingdom, description, bonus, starting_units, divine_patron)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          kingdom = VALUES(kingdom),
          description = VALUES(description),
          bonus = VALUES(bonus),
          starting_units = VALUES(starting_units),
          divine_patron = VALUES(divine_patron);
      `;

      await pool.query(query, [
        race_name,
        kingdom,
        description,
        JSON.stringify(bonus),
        JSON.stringify(starting_units),
        divine_patron,
      ]);
      console.log(`- ${race_name} seeded.`);
    }

    console.log("Race data seeding complete.");
  } catch (error) {
    console.error("Error seeding race data:", error);
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}

seedRaces();
