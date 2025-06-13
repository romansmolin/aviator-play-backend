module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    
    // If publishAt is set and it's in the past, log a warning
    if (data.publishAt && new Date(data.publishAt) <= new Date()) {
      console.log(`⚠️ Casino "${data.name}" has publishAt date in the past, it will be published immediately on next CRON run`);
    }
  },

  beforeUpdate(event) {
    const { data } = event.params;
    
    // If publishAt is set and it's in the past, log a warning
    if (data.publishAt && new Date(data.publishAt) <= new Date()) {
      console.log(`⚠️ Casino has publishAt date in the past, it will be published immediately on next CRON run`);
    }
  },

  afterCreate(event) {
    const { result } = event;
    
    if (result.publishAt) {
      console.log(`📅 Casino "${result.name}" scheduled for publishing at ${result.publishAt}`);
    }
  },

  afterUpdate(event) {
    const { result } = event;
    
    if (result.publishAt) {
      console.log(`📅 Casino "${result.name}" rescheduled for publishing at ${result.publishAt}`);
    }
  },
}; 