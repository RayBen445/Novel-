# Novel Weaver - Deployment to Vercel

Hello Professor! Follow these simple steps to get your Novel Weaver application live on Vercel.

## Step 1: Set Up Your Project on Your Computer

1.  **Create a Project Folder:** Make a new folder on your computer named `novel-weaver`.

2.  **Save the Files:**
    * Save the code for `index.html` directly inside the `novel-weaver` folder.
    * Save the code for `package.json` directly inside the `novel-weaver` folder.
    * Create a **new folder** called `api` inside `novel-weaver`.
    * Save the code for `gemini.js` inside this new `api` folder.

3.  **Install Dependencies and Build CSS:**
    ```bash
    npm install
    npm run build-css
    ```

4.  **Check Your Structure:** Your project folder should look like this:
    ```
    novel-weaver/
    ├── api/
    │   └── gemini.js
    ├── dist/
    │   └── output.css
    ├── src/
    │   └── input.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── favicon.ico
    ```

5.  **IMPORTANT: Add Firebase Config:** Open the `index.html` file you just saved. Find the `firebaseConfig` object near the top of the `<script type="module">` section. Replace the placeholder values with your **actual** Firebase project configuration keys.

## Step 2: Push Your Code to GitHub

1.  Create a new, empty repository on your GitHub account.
2.  Upload the entire `novel-weaver` folder and all its contents to this new repository. (You can do this using the GitHub website's "Add file" -> "Upload files" feature or via the command line with `git`).

## Step 3: Deploy on Vercel

1.  **Log in** to your [Vercel](https://vercel.com) account.
2.  From your Vercel dashboard, click **"Add New..."** -> **"Project"**.
3.  **Import** the GitHub repository you just created. Vercel should automatically detect the project settings.
4.  Before the final step, expand the **"Environment Variables"** section. This is crucial for keeping your AI key secret.
5.  Add a new variable:
    * **Name:** `GEMINI_API_KEY`
    * **Value:** Paste your **actual Gemini API key** here.
6.  Click the **"Deploy"** button.

That's all, Professor! Vercel will build and deploy your application. In just a few moments, you'll have a live URL for your personal Novel Weaver app, ready to start writing "The Last Banana" or any other masterpiece you envision.

## Development Notes

This application is now production-ready with:
- **Local Tailwind CSS**: No longer uses CDN, CSS is compiled locally for better performance and offline capability
- **Production Vue.js Build**: Uses optimized production build instead of development version
- **Favicon**: Includes proper favicon.ico to eliminate browser 404 errors

### Build Commands
- `npm run build-css` - Compile Tailwind CSS for production
- `npm run watch-css` - Watch for changes and recompile CSS automatically during development
