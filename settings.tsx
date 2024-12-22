const Settings = {
  revalidate: process.env.VERCEL_ENV === "production" ? 30 : 5,
};

export default Settings;
