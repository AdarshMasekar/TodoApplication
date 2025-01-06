const cron = require("node-cron");
const Todo = require("../models/Todo");

// Schedule a task to run daily at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    await Todo.updateMany(
      { dueDate: { $lt: new Date() }, status: "pending" },
      { $set: { status: "expired" } }
    );
    console.log("Expired tasks updated successfully.");
  } catch (error) {
    console.error("Error updating expired tasks:", error);
  }
});
