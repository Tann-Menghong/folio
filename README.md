# Portfolio — GitHub + Netlify

This portfolio uses a free Git-based CMS. The public site is static; edits made at `/admin` are committed to GitHub and Netlify republishes the site automatically.

## Deploy (one-time)

1. Create a new **public GitHub repository** named `folio` and upload this folder.
2. Sign in at [Netlify](https://app.netlify.com/) using the same GitHub account. Choose **Add new site → Import an existing project**, select `folio`, and deploy with the default settings.
3. In Netlify: **Project configuration → Identity**, click **Enable Identity**. Under Registration preferences select **Invite only**.
4. Still under Identity, open **Services → Git Gateway** and click **Enable Git Gateway**.
5. Under Identity, use **Invite users** to invite your own email address. Open the email invite and set your password.
6. Open `https://your-site.netlify.app/admin/` and sign in. Edit your studio details, add projects, and upload images.

The first version uses example content. Change it from `/admin` after deploying.
