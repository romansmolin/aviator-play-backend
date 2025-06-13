module.exports = {
  /**
   * Scheduled publishing job - runs every minute to check for content ready to publish
   * Checks for Casino and Bonus entries that have a publishAt date <= current time
   * and are still in draft status, then publishes them
   */
  scheduledPublishing: {
    task: async ({ strapi }) => {
      const now = new Date();
      console.log(`[${now.toISOString()}] Running scheduled publishing check...`);

      try {
        // Find draft casinos that should be published
        const draftCasinos = await strapi.documents("api::casino.casino").findMany({
          status: 'draft',
          filters: {
            publishAt: {
              $lte: now.toISOString(),
              $notNull: true,
            },
          },
        });

        // Find draft bonuses that should be published
        const draftBonuses = await strapi.documents("api::bonus.bonus").findMany({
          status: 'draft',
          filters: {
            publishAt: {
              $lte: now.toISOString(),
              $notNull: true,
            },
          },
        });

        let publishedCount = 0;

        // Publish casinos
        for (const casino of draftCasinos) {
          try {
            await strapi.documents("api::casino.casino").publish({
              documentId: casino.documentId,
            });
            console.log(`✅ Published casino: ${casino.name} (ID: ${casino.documentId})`);
            publishedCount++;
          } catch (error) {
            console.error(`❌ Failed to publish casino ${casino.name}:`, error.message);
          }
        }

        // Publish bonuses
        for (const bonus of draftBonuses) {
          try {
            await strapi.documents("api::bonus.bonus").publish({
              documentId: bonus.documentId,
            });
            console.log(`✅ Published bonus: ${bonus.name} (ID: ${bonus.documentId})`);
            publishedCount++;
          } catch (error) {
            console.error(`❌ Failed to publish bonus ${bonus.name}:`, error.message);
          }
        }

        if (publishedCount > 0) {
          console.log(`🎉 Successfully published ${publishedCount} items`);
        } else {
          console.log(`ℹ️  No items ready for publishing at this time`);
        }

      } catch (error) {
        console.error('❌ Error in scheduled publishing job:', error);
      }
    },
    options: {
      rule: "0 * * * * *", // Run every minute (at second 0 of every minute)
      tz: "UTC", // Use UTC timezone
    },
  },

  /**
   * Daily cleanup job - runs at 2 AM UTC every day
   * Clears publishAt field from published content to keep the database clean
   */
  cleanupPublishedContent: {
    task: async ({ strapi }) => {
      const now = new Date();
      console.log(`[${now.toISOString()}] Running daily cleanup of published content...`);

      try {
        // Clean up published casinos
        const publishedCasinos = await strapi.documents("api::casino.casino").findMany({
          status: 'published',
          filters: {
            publishAt: {
              $notNull: true,
            },
          },
        });

        for (const casino of publishedCasinos) {
          await strapi.documents("api::casino.casino").update({
            documentId: casino.documentId,
            data: {
              publishAt: null,
            },
          });
        }

        // Clean up published bonuses
        const publishedBonuses = await strapi.documents("api::bonus.bonus").findMany({
          status: 'published',
          filters: {
            publishAt: {
              $notNull: true,
            },
          },
        });

        for (const bonus of publishedBonuses) {
          await strapi.documents("api::bonus.bonus").update({
            documentId: bonus.documentId,
            data: {
              publishAt: null,
            },
          });
        }

        const totalCleaned = publishedCasinos.length + publishedBonuses.length;
        console.log(`🧹 Cleaned up publishAt field from ${totalCleaned} published items`);

      } catch (error) {
        console.error('❌ Error in cleanup job:', error);
      }
    },
    options: {
      rule: "0 0 2 * * *", // Run daily at 2:00 AM UTC
      tz: "UTC",
    },
  },
}; 