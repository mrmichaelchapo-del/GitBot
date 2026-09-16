module.exports = (app) => {
  // GitBot is alive
  app.log.info("🤖 GitBot is online and ready!");

  // When an issue is opened
  app.on("issues.opened", async (context) => {
    const issue = context.payload.issue;

    // GitBot reads the issue
    await context.octokit.issues.createComment({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      issue_number: issue.number,
      body: "👀 GitBot has received your issue and is analyzing it..."
    });

    // TODO: call your issue parser + PR generator
  });

  // When an issue is edited
  app.on("issues.edited", async (context) => {
    const issue = context.payload.issue;

    await context.octokit.issues.createComment({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      issue_number: issue.number,
      body: "📝 GitBot noticed your update and is recalculating the fix..."
    });

    // TODO: update GitBot’s plan
  });

  // When someone comments on an issue
  app.on("issue_comment.created", async (context) => {
    const comment = context.payload.comment.body;

    if (comment.startsWith("/gitbot")) {
      await context.octokit.issues.createComment({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: context.payload.issue.number,
        body: "⚡ GitBot command received — preparing action..."
      });

      // TODO: trigger PR creation or other commands
    }
  });
};