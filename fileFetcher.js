// fileFetcher.js
//
// Downloads files from the repository so GitBot can inspect or modify them.

async function fetchFile(context, path) {
  const { owner, repo } = context.repo();

  try {
    const res = await context.octokit.repos.getContent({
      owner,
      repo,
      path
    });

    // File content is base64 encoded
    const content = Buffer.from(res.data.content, "base64").toString("utf8");

    return {
      path,
      content
    };
  } catch (err) {
    context.log.error(`GitBot could not fetch file: ${path}`);
    return null;
  }
}

module.exports = { fetchFile };