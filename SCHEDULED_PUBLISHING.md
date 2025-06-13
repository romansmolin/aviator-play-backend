# Scheduled Publishing System

This document explains the custom scheduled publishing system implemented as a replacement for the incompatible `strapi-plugin-publisher` in Strapi v5.

## Overview

The system allows you to schedule Casino and Bonus content for automatic publishing at a specific date and time using:

- Custom `publishAt` datetime fields in content types
- CRON jobs for automated publishing
- Lifecycle hooks for validation and logging

## Features

### 1. **Scheduled Publishing**
- Add a `publishAt` field to any Casino or Bonus draft content
- Content will automatically be published when the scheduled time is reached
- Runs every minute to check for content ready to publish

### 2. **Automatic Cleanup**
- Daily cleanup job removes `publishAt` field from already published content
- Keeps the database clean and optimized
- Runs every day at 2:00 AM UTC

### 3. **Validation & Logging**
- Warns when `publishAt` date is set in the past
- Logs scheduling confirmations
- Detailed logging of publishing operations

## How to Use

### 1. **Schedule Content for Publishing**

1. Create or edit a Casino or Bonus entry
2. Keep it in **Draft** status
3. Set the `publishAt` field to your desired publishing date/time
4. Save the entry

The content will automatically be published when the scheduled time arrives.

### 2. **Monitor Publishing**

Check the Strapi console logs for:
- Scheduled publishing confirmations
- Publishing success/failure messages
- Daily cleanup operations

### 3. **Manual Publishing**

You can still manually publish content at any time:
- Use the standard "Publish" button in the admin panel
- The `publishAt` field will be cleared during the next cleanup cycle

## Technical Details

### Content Type Changes

Both `Casino` and `Bonus` content types now include:

```json
{
  "publishAt": {
    "type": "datetime",
    "pluginOptions": {
      "i18n": {
        "localized": false
      }
    }
  }
}
```

### CRON Jobs

#### Scheduled Publishing Job
- **Schedule**: Every minute (`"0 * * * * *"`)
- **Function**: Finds draft content with `publishAt <= now` and publishes it
- **Timezone**: UTC

#### Cleanup Job
- **Schedule**: Daily at 2:00 AM UTC (`"0 0 2 * * *"`)
- **Function**: Removes `publishAt` field from published content
- **Timezone**: UTC

### Files Modified/Created

```
config/
├── server.js                     # Enabled CRON jobs
├── cron-tasks.js                 # CRON job definitions
src/api/
├── casino/content-types/casino/
│   ├── schema.json               # Added publishAt field
│   └── lifecycles.js             # Added validation hooks
└── bonus/content-types/bonus/
    ├── schema.json               # Added publishAt field
    └── lifecycles.js             # Added validation hooks
```

## Usage Examples

### Example 1: Schedule a Casino for Tomorrow
```javascript
// Via API
POST /api/casinos
{
  "data": {
    "name": "New Casino",
    "publishAt": "2024-01-15T10:00:00.000Z",
    // ... other fields
  }
}
```

### Example 2: Reschedule Publishing
```javascript
// Via API - Update the publishAt field
PUT /api/casinos/:documentId
{
  "data": {
    "publishAt": "2024-01-16T15:30:00.000Z"
  }
}
```

### Example 3: Cancel Scheduled Publishing
```javascript
// Set publishAt to null to cancel scheduling
PUT /api/casinos/:documentId
{
  "data": {
    "publishAt": null
  }
}
```

## Monitoring & Troubleshooting

### Log Messages

**Publishing Operations:**
```
✅ Published casino: Casino Name (ID: xyz123)
✅ Published bonus: Bonus Name (ID: abc456)
🎉 Successfully published 2 items
```

**No Content Ready:**
```
ℹ️ No items ready for publishing at this time
```

**Errors:**
```
❌ Failed to publish casino Casino Name: Error message
❌ Error in scheduled publishing job: Detailed error
```

**Cleanup Operations:**
```
🧹 Cleaned up publishAt field from 5 published items
```

### Common Issues

1. **Content not publishing?**
   - Check that content is in Draft status
   - Verify `publishAt` date is not in the future
   - Check console logs for errors

2. **CRON jobs not running?**
   - Ensure `cron.enabled: true` in `config/server.js`
   - Check that Strapi is running continuously
   - Verify `config/cron-tasks.js` is properly imported

3. **Timezone issues?**
   - All times are in UTC
   - Convert local times to UTC when setting `publishAt`

## Performance Considerations

- The publishing job runs every minute but only processes items ready for publishing
- Database queries are optimized with proper filters
- Cleanup job runs daily to prevent database bloat
- Consider increasing the interval if you have thousands of scheduled items

## Migration Notes

This system replaces the incompatible `strapi-plugin-publisher` and provides:
- ✅ Strapi v5 compatibility
- ✅ Better performance
- ✅ More reliable scheduling
- ✅ Easier maintenance
- ✅ Custom validation logic

The `publishAt` field is **not localized** because publication timing should be consistent across all locales of the same content. 