

**AI_MOCKER_INTERVIEW**

**Project Description**

AI_MOCKER_INTERVIEW is a web application designed to simulate job interviews using artificial intelligence. It provides a platform for users to practice answering interview questions based on their chosen role, job description, years of experience, and skills. 

**Features**

* **Personalized Interview:** Tailors questions based on user input.
* **Speech-to-Text Recording:** Captures interview responses through voice input.
* **Drizzle ORM Integration:** Stores interview data in a Neon database using Drizzle ORM.
* **AI Feedback and Rating:** Analyzes recorded responses and provides feedback with a rating.
* **Correct Approach Guidance:** Offers insights into the best way to approach each question.
* **Next.js 14 Framework:** Built using Next.js 14 for a modern and performant web application.
* **Clerk Authentication:** Secures user accounts with Clerk for robust authentication.
* **Tailwind CSS Styling:** Employs Tailwind CSS for a clean and responsive user interface.

**Getting Started**

1. **Prerequisites**
   * Node.js and npm (or yarn) installed on your system.
   * A Neon database instance.

2. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/AI-MOCKER-Interview.git
   ```

3. **Install Dependencies**

   ```bash
   cd AI_MOCKER_INTERVIEW
   npm install
   ```

4. **Environment Variables**

   Create a `.env.local` file in the project root and add the following environment variables, replacing placeholders with your actual values:

   ```
   NEXT_PUBLIC_CLERK_FRONTEND_API=YOUR_CLERK_FRONTEND_API_KEY
   NEXT_PUBLIC_NEON_DATABASE_URL=YOUR_NEON_DATABASE_URL
   ```

   * You can obtain your Clerk Frontend API key from the Clerk dashboard.
   * Set the Neon database URL according to your Neon setup.

5. **Start the Development Server**

   ```bash
   npm run dev
   ```

   This will start the Next.js development server at http://localhost:3000 by default.

**Deployment**

This README assumes a deployment using Vercel or a similar platform. The specific deployment steps will vary depending on your chosen platform. However, here are some general guidelines:

1. **Configure Deployment Environment Variables**
   Set the same environment variables you used locally in your deployment environment (e.g., Vercel secrets).

2. **Build for Production**

   ```bash
   npm run build
   ```

3. **Deploy to Platform**

   Follow the deployment instructions for your chosen platform.

**Usage**

1. **Create an Account** (if using Clerk)
   Sign up for an account to use the AI_MOCKER_INTERVIEW application.

2. **Select Interview Parameters**
   Choose your desired role, job description, years of experience, and skills. This will personalize the interview questions.

3. **Answer Interview Questions**
   The AI will ask you a series of questions based on your selections. Use your microphone to record your answers.

4. **Receive Feedback and Rating**
   After completing the interview, the AI will analyze your recorded responses and provide feedback along with a rating. You'll also receive insights into the best way to approach each question.

**Tech Stack**

* Frontend: Next.js 14
* Authentication: Clerk
* Database: Neon (with Drizzle ORM)
* Styling: Tailwind CSS

**Contributing**

We welcome contributions to this project! Please refer to the CONTRIBUTING.md file (if you choose to create one) for guidelines on how to contribute.

**License**

This project is licensed under the MIT License (see LICENSE.md for details).

**Disclaimer**

This AI interview simulation is intended for practice and learning purposes only. It should not be solely relied upon for actual job interview preparation.
